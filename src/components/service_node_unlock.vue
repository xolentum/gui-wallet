<template>
<div class="service-node-unlock">
    <div class="q-pa-md">
        <q-list class="service-node-list" no-border v-if="service_nodes.length > 0">
            <q-item v-for="node in service_nodes" :key="node.key">
                <q-item-main>
                    <q-item-tile class="ellipsis" label>{{ node.key }}</q-item-tile>
                    <q-item-tile sublabel class="non-selectable">Contribution: <FormatLoki :amount="node.amount" /></q-item-tile>
                </q-item-main>
                <q-item-side>
                    <q-btn
                        color="primary"
                        size="md"
                        label="Unlock"
                        :disabled="!is_ready || unlock_status.sending"
                        @click="unlockWarning(node.key)"
                    />
                </q-item-side>
            </q-item>
        </q-list>
        <div v-else>
            You have not contributed to any service nodes.
        </div>
    </div>

    <q-inner-loading :visible="unlock_status.sending" :dark="theme=='dark'">
        <q-spinner color="primary" :size="30" />
    </q-inner-loading>
</div>
</template>

<script>
const objectAssignDeep = require("object-assign-deep");
import { mapState } from "vuex"
import { required } from "vuelidate/lib/validators"
import { service_node_key } from "src/validators/common"
import LokiField from "components/loki_field"
import WalletPassword from "src/mixins/wallet_password"
import FormatLoki from "components/format_loki"

export default {
    name: "ServiceNodeUnlock",
    computed: mapState({
        theme: state => state.gateway.app.config.appearance.theme,
        unlock_status: state => state.gateway.service_node_status.unlock,
        our_address: state => state.gateway.wallet.address_list.primary[0].address,
        is_ready (state) {
            return this.$store.getters["gateway/isReady"]
        },
        service_nodes (state) {
            const nodes = state.gateway.daemon.service_nodes
            const getContribution = node => node.contributors.find(c => c.address === this.our_address)
            // Only show nodes that we contributed to
            return nodes.filter(getContribution).map(n => {
                const ourContribution = getContribution(n)
                return { 
                    key: n.service_node_pubkey,
                    amount: ourContribution.amount
                }
            })
        }
    }),
    validations: {
        node_key: { required, service_node_key }
    },
    watch: {
        unlock_status: {
            handler(val, old){
                if(val.code == old.code) return
                switch(this.unlock_status.code) {
                    case 0:
                        this.key = null
                        this.password = null

                        this.$q.notify({
                            type: "positive",
                            timeout: 1000,
                            message: this.unlock_status.message
                        })
                        this.$v.$reset();
                        break;
                    case 1:
                        // Tell the user to confirm
                         this.$q.dialog({
                            title: this.$t("dialog.unlockServiceNode.confirmTitle"),
                            message: this.unlock_status.message,
                            ok: {
                                label: this.$t("dialog.unlockServiceNode.ok")
                            },
                            cancel: {
                                flat: true,
                                label: this.$t("dialog.buttons.cancel"),
                                color: this.theme=="dark"?"white":"dark"
                            }
                        }).then(() => {
                            this.gatewayUnlock(this.password, this.key, true);
                        }).catch(() => {
                        })
                        break;
                    case -1:
                        this.key = null
                        this.password = null

                        this.$q.notify({
                            type: "negative",
                            timeout: 1000,
                            message: this.unlock_status.message
                        })
                        break;
                    default: break;
                }
            },
            deep: true
        },
    },
    methods: {
        unlockWarning: function (key) {
            this.$q.dialog({
                title: this.$t("dialog.unlockServiceNodeWarning.title"),
                message: this.$t("dialog.unlockServiceNodeWarning.message"),
                ok: {
                    label: this.$t("dialog.unlockServiceNodeWarning.ok")
                },
                cancel: {
                    flat: true,
                    label: this.$t("dialog.buttons.cancel"),
                    color: this.theme === "dark" ? "white" : "dark"
                }
            }).then(() => {
                this.unlock(key)
            }).catch(() => {})
        },
        unlock: function (key) {
            // We store this as it could change between the 2 step process
            this.key = key

            this.showPasswordConfirmation({
                title: this.$t("dialog.unlockServiceNode.title"),
                noPasswordMessage: this.$t("dialog.unlockServiceNode.message"),
                ok: {
                    label: this.$t("dialog.unlockServiceNode.ok")
                },
            }).then(password => {
                this.password = password
                this.gatewayUnlock(this.password, this.key, false);
            }).catch(() => {
            })
        },
        gatewayUnlock: function (password, key, confirmed = false) {
            this.$store.commit("gateway/set_snode_status", {
                unlock: {
                    code: 2, // Code 1 is reserved for can_unlock
                    message: "Unlocking...",
                    sending: true
                }
            })
            this.$gateway.send("wallet", "unlock_stake", {
                password,
                service_node_key: key,
                confirmed
            })
        },
    },

    mixins: [WalletPassword],
    components: {
        LokiField,
        FormatLoki
    }
}
</script>

<style lang="scss">
.service-node-unlock {
    .q-item-sublabel, .q-list-header {
        font-size: 14px;
    }
}
</style>
