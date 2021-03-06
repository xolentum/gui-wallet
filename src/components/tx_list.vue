<template>
  <div class="tx-list">
    <template v-if="tx_list_paged.length === 0">
      <p class="q-pa-md q-mb-none">
        {{ $t("strings.noTransactionsFound") }}
      </p>
    </template>

    <template v-else>
      <q-infinite-scroll ref="scroller" :handler="loadMore">
        <q-list link no-border :dark="theme == 'dark'" class="xolentum-list tx-list">
          <q-item
            v-for="tx in tx_list_paged"
            :key="`${tx.txid}-${tx.type}`"
            class="xolentum-list-item transaction"
            :class="'tx-' + tx.type"
            @click.native="details(tx)"
          >
            <q-item-side class="type">
              <div>{{ tx.type | typeToString }}</div>
            </q-item-side>
            <q-item-main class="main">
              <q-item-tile class="amount" label>
                <FormatXolentum :amount="tx.amount" />
              </q-item-tile>
              <q-item-tile sublabel>{{ tx.txid }}</q-item-tile>
            </q-item-main>
            <q-item-side class="meta">
              <q-item-tile label>
                <timeago :datetime="tx.timestamp * 1000" :auto-update="60" :locale="$i18n.locale" />
              </q-item-tile>
              <q-item-tile sublabel>{{ formatHeight(tx) }}</q-item-tile>
            </q-item-side>

            <q-context-menu>
              <q-list link separator style="min-width: 150px; max-height: 300px;">
                <q-item v-close-overlay @click.native="details(tx)">
                  <q-item-main :label="$t('menuItems.showDetails')" />
                </q-item>

                <q-item v-close-overlay @click.native="copyTxid(tx.txid, $event)">
                  <q-item-main :label="$t('menuItems.copyTransactionId')" />
                </q-item>

                <q-item v-close-overlay @click.native="openExplorer(tx.txid)">
                  <q-item-main :label="$t('menuItems.viewOnExplorer')" />
                </q-item>
              </q-list>
            </q-context-menu>
          </q-item>
          <QSpinnerDots slot="message" :size="40"></QSpinnerDots>
        </q-list>
      </q-infinite-scroll>
    </template>

    <TxDetails ref="txDetails" />
  </div>
</template>

<script>
const { clipboard } = require("electron");
import { mapState } from "vuex";
import { QSpinnerDots } from "quasar";
import TxDetails from "components/tx_details";
import FormatXolentum from "components/format_xolentum";
import { i18n } from "plugins/i18n";

export default {
  name: "TxList",
  filters: {
    typeToString: function(value) {
      switch (value) {
        case "in":
          return i18n.t("strings.transactions.received");
        case "out":
          return i18n.t("strings.transactions.sent");
        case "failed":
          return i18n.t("strings.transactions.types.failed");
        case "pending":
        case "pool":
          return i18n.t("strings.transactions.types.pending");
        case "miner":
          return i18n.t("strings.transactions.types.miner");
        case "gov":
          return i18n.t("strings.transactions.types.governance");
        default:
          return "-";
      }
    }
  },
  components: {
    QSpinnerDots,
    TxDetails,
    FormatXolentum
  },
  props: {
    limit: {
      type: Number,
      required: false,
      default: -1
    },
    type: {
      type: String,
      required: false,
      default: "all"
    },
    filter: {
      type: String,
      required: false,
      default: ""
    },
    toOutgoingAddress: {
      type: String,
      required: false,
      default: ""
    },
    toIncomingAddressIndex: {
      type: Number,
      required: false,
      default: -1
    }
  },
  data() {
    return {
      page: 0,
      tx_list_filtered: [],
      tx_list_paged: []
    };
  },
  computed: mapState({
    theme: state => state.gateway.app.config.appearance.theme,
    current_height: state => state.gateway.daemon.info.height,
    wallet_height: state => state.gateway.wallet.info.height,
    tx_list: state => state.gateway.wallet.transactions.tx_list,
    address_book: state => state.gateway.wallet.address_list.address_book
  }),
  watch: {
    wallet_height: {
      handler(val, old) {
        if (val == old) return;
        this.filterTxList();
        this.pageTxList();
      }
    },
    tx_list: {
      handler(val, old) {
        // Check if anything changed in the tx list
        if (val.length == old.length) {
          const changed = val.filter((v, i) => v.note !== old[i].note);
          if (changed.length === 0) return;
        }
        this.filterTxList();
        this.pageTxList();
      }
    },
    type: {
      handler(val, old) {
        if (val == old) return;
        if (this.$refs.scroller) {
          this.$refs.scroller.stop();
          this.page = 0;
          this.$refs.scroller.reset();
          this.$refs.scroller.resume();
        }
        this.filterTxList();
        this.pageTxList();
      }
    },
    filter: {
      handler(val, old) {
        if (val == old) return;
        if (this.$refs.scroller) {
          this.$refs.scroller.stop();
          this.page = 0;
          this.$refs.scroller.reset();
          this.$refs.scroller.resume();
        }
        this.filterTxList();
        this.pageTxList();
      }
    }
  },
  created() {
    this.filterTxList();
    this.pageTxList();
  },
  methods: {
    filterTxList() {
      const all_in = ["in", "pool", "miner", "snode", "gov"];
      const all_out = ["out", "pending", "stake"];
      const all_pending = ["pending", "pool"];
      this.tx_list_filtered = this.tx_list.filter(tx => {
        let valid = true;

        if (this.type === "all_in" && !all_in.includes(tx.type)) {
          return false;
        }

        if (this.type === "all_out" && !all_out.includes(tx.type)) {
          return false;
        }

        if (this.type === "all_pending" && !all_pending.includes(tx.type)) {
          return false;
        }

        if (!this.type.startsWith("all") && this.type !== tx.type) {
          valid = false;
          return valid;
        }

        if (this.filter !== "") {
          valid = this.txContains(tx, this.filter);
          return valid;
        }

        if (this.toOutgoingAddress !== "") {
          if (tx.hasOwnProperty("destinations")) {
            valid = tx.destinations.filter(destination => {
              return destination.address === this.toOutgoingAddress;
            }).length;
          } else {
            valid = false;
          }
          return valid;
        }

        if (this.toIncomingAddressIndex !== -1) {
          valid = tx.hasOwnProperty("subaddr_index") && tx.subaddr_index.minor == this.toIncomingAddressIndex;
          return valid;
        }

        return valid;
      });
    },
    txContains(tx, value) {
      // The tx can be searchable using:
      // id, address, notes, amount, recipient name
      const fields = [tx.txid, tx.note];

      const formattedAmount = tx.amount / 1e12;
      fields.push(String(formattedAmount));

      // Get all addresses and names and add them on
      const destinations = (tx.destinations || []).map(d => d.address);
      const addresses = [tx.address, ...destinations];
      const contacts = addresses
        .map(this.getContact)
        .filter(c => !!c)
        .map(c => c.name);
      fields.push(...addresses, ...contacts);

      return !!fields.find(f => f.toLowerCase().includes(value.toLowerCase()));
    },
    getContact(address) {
      return this.address_book.find(book => book.address === address);
    },
    pageTxList() {
      this.tx_list_paged = this.tx_list_filtered.slice(0, this.limit !== -1 ? this.limit : this.page * 24 + 24);
    },
    loadMore: function(index, done) {
      this.page = index;
      if (this.limit !== -1 || this.tx_list_filtered.length < this.page * 24 + 24) {
        this.$refs.scroller.stop();
      }
      this.pageTxList();
      this.$nextTick(() => {
        done();
      });
    },
    details(tx) {
      this.$refs.txDetails.tx = tx;
      this.$refs.txDetails.txNotes = tx.note;
      this.$refs.txDetails.isVisible = true;
    },
    formatHeight(tx) {
      let height = tx.height;
      let confirms = Math.max(0, this.wallet_height - height);
      if (height == 0) return this.$t("strings.transactions.types.pending");
      if (confirms < Math.max(10, tx.unlock_time - height))
        return this.$t("strings.blockHeight") + `: ${height} (${confirms} confirm${confirms == 1 ? "" : "s"})`;
      else return this.$t("strings.blockHeight") + `: ${height} (${this.$t("strings.transactionConfirmed")})`;
    },
    copyTxid(txid, event) {
      event.stopPropagation();
      for (let i = 0; i < event.path.length; i++) {
        if (event.path[i].tagName == "BUTTON") {
          event.path[i].blur();
          break;
        }
      }
      clipboard.writeText(txid);
      this.$q.notify({
        type: "positive",
        timeout: 1000,
        message: this.$t("notification.positive.copied", {
          item: "Txid"
        })
      });
    },
    openExplorer(txid) {
      this.$gateway.send("core", "open_explorer", {
        type: "tx",
        id: txid
      });
    }
  }
};
</script>

<style lang="scss">
.tx-list {
  .xolentum-list-item {
    padding-top: 0;
    padding-bottom: 0;
  }
  .transaction {
    .main {
      margin: 0;
      padding: 8px 10px;
      div {
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .type {
      div {
        min-width: 100px;
        margin-right: 8px;
      }
    }
  }
}
</style>
