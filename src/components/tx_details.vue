<template>
  <q-modal v-model="isVisible" maximized>
    <q-modal-layout>
      <q-toolbar slot="header" color="dark" inverted>
        <q-btn flat round dense icon="reply" @click="isVisible = false" />
        <q-toolbar-title>
          {{ $t("titles.transactionDetails") }}
        </q-toolbar-title>
        <q-btn flat class="q-mr-sm" :label="$t('buttons.showTxDetails')" @click="showTxDetails" />
        <q-btn v-if="can_open" color="primary" :label="$t('buttons.viewOnExplorer')" @click="openExplorer" />
      </q-toolbar>

      <div class="layout-padding">
        <div class="row items-center non-selectable">
          <div class="q-mr-sm">
            <TxTypeIcon :type="tx.type" :tooltip="false" />
          </div>

          <div v-if="tx.type == 'in'" :class="'tx-' + tx.type">
            {{
              $t("strings.transactions.description", {
                type: $t("strings.transactions.types.incoming")
              })
            }}
          </div>
          <div v-else-if="tx.type == 'out'" :class="'tx-' + tx.type">
            {{
              $t("strings.transactions.description", {
                type: $t("strings.transactions.types.outgoing")
              })
            }}
          </div>
          <div v-else-if="tx.type == 'pool'" :class="'tx-' + tx.type">
            {{
              $t("strings.transactions.description", {
                type: $t("strings.transactions.types.pendingIncoming")
              })
            }}
          </div>
          <div v-else-if="tx.type == 'pending'" :class="'tx-' + tx.type">
            {{
              $t("strings.transactions.description", {
                type: $t("strings.transactions.types.pendingOutgoing")
              })
            }}
          </div>
          <div v-else-if="tx.type == 'failed'" :class="'tx-' + tx.type">
            {{
              $t("strings.transactions.description", {
                type: $t("strings.transactions.types.failed")
              })
            }}
          </div>
        </div>

        <div class="row justify-between" style="max-width: 768px">
          <div class="infoBox">
            <div class="infoBoxContent">
              <div class="text">
                <span>{{ $t("strings.transactions.amount") }}</span>
              </div>
              <div class="value">
                <span><FormatXolentum :amount="tx.amount" raw-value/></span>
              </div>
            </div>
          </div>

          <div class="infoBox">
            <div class="infoBoxContent">
              <div class="text">
                <span>
                  {{ $t("strings.transactions.fee") }}
                  <template v-if="tx.type == 'in' || tx.type == 'pool'">
                    ({{ $t("strings.transactions.paidBySender") }})
                  </template>
                </span>
              </div>
              <div class="value">
                <span><FormatXolentum :amount="tx.fee" raw-value/></span>
              </div>
            </div>
          </div>

          <div class="infoBox">
            <div class="infoBoxContent">
              <div class="text">
                <span>{{ $t("strings.blockHeight") }}</span>
              </div>
              <div class="value">
                <span>{{ tx.height }}</span>
              </div>
            </div>
          </div>

          <div class="infoBox">
            <div class="infoBoxContent">
              <div class="text">
                <span>{{ $t("strings.transactions.timestamp") }}</span>
              </div>
              <div class="value">
                <span>{{ formatDate(tx.timestamp * 1000) }}</span>
              </div>
            </div>
          </div>
        </div>

        <h6 class="q-mt-xs q-mb-none text-weight-light">
          {{ $t("strings.transactionID") }}
        </h6>
        <p class="monospace break-all">{{ tx.txid }}</p>

        <h6 class="q-mt-xs q-mb-none text-weight-light">
          {{ $t("strings.paymentID") }}
        </h6>
        <p class="monospace break-all">
          {{ tx.payment_id ? tx.payment_id : "N/A" }}
        </p>

        <div v-if="tx.type == 'in' || tx.type == 'pool'">
          <q-list no-border>
            <q-list-header class="q-px-none">
              {{
                $t("strings.transactions.sentTo", {
                  type: $t("strings.transactions.types.incoming")
                })
              }}:
            </q-list-header>
            <q-item class="q-px-none">
              <q-item-main>
                <q-item-tile label class="non-selectable">{{ in_tx_address_used.address_index_text }}</q-item-tile>
                <q-item-tile class="monospace ellipsis" sublabel>{{ in_tx_address_used.address }}</q-item-tile>
              </q-item-main>

              <q-context-menu>
                <q-list link separator style="min-width: 150px; max-height: 300px;">
                  <q-item v-close-overlay @click.native="copyAddress(in_tx_address_used.address, $event)">
                    <q-item-main :label="$t('menuItems.copyAddress')" />
                  </q-item>
                </q-list>
              </q-context-menu>
            </q-item>
          </q-list>
        </div>

        <div v-else-if="tx.type == 'out' || tx.type == 'pending'">
          <q-list no-border>
            <q-list-header class="q-px-none">
              {{
                $t("strings.transactions.sentTo", {
                  type: $t("strings.transactions.types.outgoing")
                })
              }}:
            </q-list-header>
            <template v-if="out_destinations">
              <q-item v-for="destination in out_destinations" :key="destination.address" class="q-px-none">
                <q-item-main>
                  <q-item-tile label>{{ destination.name }}</q-item-tile>
                  <q-item-tile class="monospace ellipsis" sublabel>{{ destination.address }}</q-item-tile>
                  <q-item-tile sublabel><FormatXolentum :amount="destination.amount"/></q-item-tile>
                </q-item-main>
                <q-context-menu>
                  <q-list link separator style="min-width: 150px; max-height: 300px;">
                    <q-item v-close-overlay @click.native="copyAddress(destination.address, $event)">
                      <q-item-main :label="$t('menuItems.copyAddress')" />
                    </q-item>
                  </q-list>
                </q-context-menu>
              </q-item>
            </template>
            <template v-else>
              <q-item class="q-px-none">
                <q-item-main>
                  <q-item-tile label>{{ $t("strings.destinationUnknown") }}</q-item-tile>
                </q-item-main>
              </q-item>
            </template>
          </q-list>
        </div>

        <q-field class="q-mt-md">
          <q-input
            v-model="txNotes"
            :float-label="$t('fieldLabels.transactionNotes')"
            :dark="theme == 'dark'"
            type="textarea"
            rows="2"
          />
        </q-field>

        <q-field class="q-mt-sm">
          <q-btn
            :disable="!is_ready"
            :text-color="theme == 'dark' ? 'white' : 'dark'"
            :label="$t('buttons.saveTxNotes')"
            @click="saveTxNotes"
          />
        </q-field>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
const { clipboard } = require("electron");
import { mapState } from "vuex";
import { date } from "quasar";
import TxTypeIcon from "components/tx_type_icon";
import FormatXolentum from "components/format_xolentum";
export default {
  name: "TxDetails",
  components: {
    TxTypeIcon,
    FormatXolentum
  },
  data() {
    return {
      isVisible: false,
      txNotes: "",
      tx: {
        address: "",
        amount: 0,
        double_spend_seen: false,
        fee: 0,
        height: 0,
        note: "",
        payment_id: "",
        subaddr_index: { major: 0, minor: 0 },
        timestamp: 0,
        txid: "",
        type: "",
        unlock_time: 0
      }
    };
  },
  computed: mapState({
    theme: state => state.gateway.app.config.appearance.theme,
    can_open(state) {
      const { net_type } = state.gateway.app.config.app;
      return net_type !== "stagenet";
    },
    in_tx_address_used(state) {
      let i;
      let used_addresses = state.gateway.wallet.address_list.primary.concat(state.gateway.wallet.address_list.used);
      for (i = 0; i < used_addresses.length; i++) {
        if (used_addresses[i].address_index == this.tx.subaddr_index.minor) {
          let address_index_text = "";
          if (used_addresses[i].address_index === 0) {
            address_index_text = this.$t("strings.addresses.primaryAddress");
          } else {
            address_index_text =
              this.$t("strings.addresses.subAddress") +
              " (" +
              this.$t("strings.addresses.subAddressIndex", {
                index: used_addresses[i].address_index
              }) +
              ")";
          }
          return {
            address: used_addresses[i].address,
            address_index: used_addresses[i].address_index,
            address_index_text: address_index_text
          };
        }
      }
      return false;
    },
    out_destinations(state) {
      if (!this.tx.destinations) return false;
      let i, j;
      let destinations = [];
      let address_book = state.gateway.wallet.address_list.address_book;
      for (i = 0; i < this.tx.destinations.length; i++) {
        let destination = this.tx.destinations[i];
        destination.name = "";
        for (j = 0; j < address_book.length; j++) {
          if (destination.address == address_book[j].address) {
            const { name, description } = address_book[j];
            const separator = description === "" ? "" : " - ";
            destination.name = `${name}${separator}${description}`;
            break;
          }
        }
        destinations.push(destination);
      }
      return destinations;
    },
    is_ready() {
      return this.$store.getters["gateway/isReady"];
    }
  }),
  methods: {
    showTxDetails() {
      this.$q
        .dialog({
          title: this.$t("dialog.transactionDetails.title"),
          message: JSON.stringify(this.tx, null, 2),
          ok: {
            label: this.$t("dialog.transactionDetails.ok"),
            color: "primary"
          }
        })
        .then(() => {})
        .catch(() => {});
    },
    openExplorer() {
      this.$gateway.send("core", "open_explorer", {
        type: "tx",
        id: this.tx.txid
      });
    },
    saveTxNotes() {
      this.$q.notify({
        timeout: 1000,
        type: "positive",
        message: this.$t("notification.positive.transactionNotesSaved")
      });
      this.$gateway.send("wallet", "save_tx_notes", {
        txid: this.tx.txid,
        note: this.txNotes
      });
    },
    formatDate(timestamp) {
      return date.formatDate(timestamp, "YYYY-MM-DD hh:mm a");
    },
    copyAddress(address, event) {
      event.stopPropagation();
      for (let i = 0; i < event.path.length; i++) {
        if (event.path[i].tagName == "BUTTON") {
          event.path[i].blur();
          break;
        }
      }
      clipboard.writeText(address);
      this.$q.notify({
        type: "positive",
        timeout: 1000,
        message: this.$t("notification.positive.addressCopied")
      });
    }
  }
};
</script>

<style></style>
