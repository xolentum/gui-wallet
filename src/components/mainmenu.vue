<template>
  <div>
    <q-btn class="menu" icon="menu" size="md" flat>
      <q-popover>
        <q-list separator link>
          <q-item v-if="!disableSwitchWallet" v-close-overlay @click.native="switchWallet">
            <q-item-main>
              <q-item-tile label>{{ $t("menuItems.switchWallet") }}</q-item-tile>
            </q-item-main>
          </q-item>
          <q-item v-close-overlay @click.native="openSettings">
            <q-item-main>
              <q-item-tile label>{{ $t("menuItems.settings") }}</q-item-tile>
            </q-item-main>
          </q-item>
          <q-item v-close-overlay @click.native="showAbout(true)">
            <q-item-main>
              <q-item-tile label>{{ $t("menuItems.about") }}</q-item-tile>
            </q-item-main>
          </q-item>
          <q-item v-close-overlay @click.native="exit">
            <q-item-main>
              <q-item-tile label>{{ $t("menuItems.exit") }}</q-item-tile>
            </q-item-main>
          </q-item>
        </q-list>
      </q-popover>
    </q-btn>
    <SettingsModal ref="settingsModal" />
    <q-modal ref="aboutModal" minimized>
      <div class="about-modal">
        <img class="q-mb-md" src="statics/xolentum.png" height="42" />

        <p class="q-my-sm">Wallet Version: v{{ version }}</p>
        <p class="q-my-sm">Daemon Version: v{{ daemonVersion }}</p>
        <p class="q-my-sm">Copyright (c) 2020, The Xolentum Project</p>
        <p class="q-my-sm">All rights reserved.</p>

        <div class="q-mt-md q-mb-lg external-links">
          <p>
            <a href="#" @click="openExternal('https://xolentum.org/')">https://xolentum.org/</a>
          </p>
          <p>
            <a href="#" @click="openExternal('https://facebook.com/xolentum/')">Facebook</a>
            -
            <a href="#" @click="openExternal('https://twitter.com/@xolentum/')">Twitter</a>
            -
            <a href="#" @click="openExternal('https://chat.xolentum.org/')">Discord</a>
            -
            <a href="#" @click="openExternal('https://medium.com/@xolentum/')">Medium</a>
            -
            <a href="#" @click="openExternal('https://github.com/xolentum/gui-wallet/')">Github</a>
          </p>
        </div>

        <q-btn color="primary" label="Close" @click="showAbout(false)" />
      </div>
    </q-modal>
  </div>
</template>

<script>
import { version } from "../../package.json";
import { mapState } from "vuex";
import SettingsModal from "components/settings";
export default {
  name: "MainMenu",
  components: {
    SettingsModal
  },
  props: {
    disableSwitchWallet: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      version: ""
    };
  },
  computed: mapState({
    theme: state => state.gateway.app.config.appearance.theme,
    isRPCSyncing: state => state.gateway.wallet.isRPCSyncing,
    daemon: state => state.gateway.daemon,
    daemonVersion() {
      return this.daemon.info.version || "N/A";
    }
  }),
  mounted() {
    this.version = version;
  },
  methods: {
    openExternal(url) {
      this.$gateway.send("core", "open_url", { url });
    },
    showAbout(toggle) {
      if (toggle) this.$refs.aboutModal.show();
      else this.$refs.aboutModal.hide();
    },
    openSettings() {
      this.$refs.settingsModal.isVisible = true;
    },
    switchWallet() {
      // If the rpc is syncing then we want to tell the user to restart
      if (this.isRPCSyncing) {
        this.$gateway.confirmClose(this.$t("dialog.switchWallet.restartMessage"), true);
        return;
      }

      // TODO: Remove this in hardfork 16
      // This is a temporary work around for the issue where wallet rpc hangs after closing a wallet due to long polling still being active
      this.$gateway.confirmClose(this.$t("dialog.switchWallet.restartWalletMessage"), true);

      // Allow switching normally because rpc won't be blocked
      /*
      this.$q
        .dialog({
          title: this.$t("dialog.switchWallet.title"),
          message: this.$t("dialog.switchWallet.closeMessage"),
          ok: {
            label: this.$t("dialog.buttons.ok")
          },
          cancel: {
            flat: true,
            label: this.$t("dialog.buttons.cancel"),
            color: this.theme == "dark" ? "white" : "dark"
          }
        })
        .then(() => {
          this.$router.replace({ path: "/wallet-select" });
          this.$gateway.send("wallet", "close_wallet");
          setTimeout(() => {
            // short delay to prevent wallet data reaching the
            // websocket moments after we close and reset data
            this.$store.dispatch("gateway/resetWalletData");
          }, 250);
        })
        .catch(() => {});
       */
    },
    exit() {
      this.$gateway.confirmClose(this.$t("dialog.exit.message"));
    }
  }
};
</script>

<style lang="scss">
.about-modal {
  padding: 25px;

  .external-links {
    a {
      color: #497dc6;
      text-decoration: none;

      &:hover,
      &:active,
      &:visited {
        text-decoration: underline;
      }
    }
  }
}
</style>
