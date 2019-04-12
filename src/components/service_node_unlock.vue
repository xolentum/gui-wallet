<template>
<div class="service-node-unlock">
     <div class="q-pa-md">
        <LokiField :label="$t('fieldLabels.serviceNodeKey')" :error="$v.node_key.$error" :disabled="unlock_status.sending">
            <q-input
                v-model="node_key"
                :dark="theme=='dark'"
                @blur="$v.node_key.$touch"
                :placeholder="$t('placeholders.hexCharacters', { count: 64 })"
                :disabled="unlock_status.sending"
                hide-underline
            />
        </LokiField>
        <q-field class="q-pt-sm">
            <q-btn color="primary" @click="unlock()" :label="$t('buttons.unlockServiceNode')" :disabled="unlock_status.sending"/>
        </q-field>
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

export default {
    name: "ServiceNodeUnlock",
    computed: mapState({
        theme: state => state.gateway.app.config.appearance.theme,
        unlock_status: state => state.gateway.service_node_status.unlock,
    }),
    data () {
        return {
            node_key: "",
        }
    },
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
                        this.node_key = ""
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
                        }).catch(() => {})
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
        unlock: function () {
            this.$v.node_key.$touch()
            if (this.$v.node_key.$error) {
                this.$q.notify({
                    type: "negative",
                    timeout: 1000,
                    message: this.$t("notification.errors.invalidServiceNodeKey")
                })
                return
            }

            // We store this as it could change between the 2 step process
            this.key = this.node_key

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
        LokiField
    }
}
</script>

<style lang="scss">
</style>
