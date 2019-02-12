<template>
<q-page class="service-node-page">
    <template>

        <div class="row q-pt-sm q-mx-md q-mb-none items-center non-selectable" style="height: 44px;">

            <div class="col-8">
                <q-icon name="router" size="24px" /> Service Nodes
            </div>

            <div class="col-4">
            </div>

        </div>

        <div class="q-pa-md">

            <q-field>
                    <q-input v-model="serviceNode.key" float-label="Service Node Key"
                                :dark="theme=='dark'"
                                @blur="$v.serviceNode.key.$touch"
                                :error="$v.serviceNode.key.$error"
                                />
            </q-field>

            <q-item>
                <q-item-main>
                    <q-item-tile label class="recepient-address">Award Recepient's Address (yours)</q-item-tile>
                    <q-item-tile class="monospace break-all" label>{{ info.address }}</q-item-tile>
                </q-item-main>
                <q-item-side>
                    <q-btn
                        color="primary" style="width:25px;"
                        size="sm" icon="file_copy"
                        @click="copyAddress(info.address, $event)">
                        <q-tooltip anchor="center left" self="center right" :offset="[5, 10]">
                            Copy address
                        </q-tooltip>
                    </q-btn>
                </q-item-side>
            </q-item>

            <div class="row items-end gutter-md">
                <div class="col">
                     <q-field class="q-ma-none">
                        <q-input v-model="serviceNode.amount" float-label="Amount" :dark="theme=='dark'"
                                 type="number" min="0" :max="unlocked_balance / 1e9" />
                    </q-field>
                </div>

                <div>
                    <q-btn @click="serviceNode.amount = unlocked_balance / 1e9" :text-color="theme=='dark'?'white':'dark'">All coins</q-btn>
                </div>

            </div>

            <q-field class="q-pt-sm">
                <q-btn
                    :disable="!is_able_to_send"
                    color="primary" @click="stake()" label="Stake" />
            </q-field>

        </div>

        <!-- <q-inner-loading :visible="tx_status.sending" :dark="theme=='dark'">
            <q-spinner color="primary" :size="30" />
        </q-inner-loading> -->

    </template>

</q-page>
</template>

<script>
const { clipboard } = require("electron")
import { mapState } from "vuex"
import { required, decimal } from "vuelidate/lib/validators"
import { payment_id, service_node_key } from "src/validators/common"
import Identicon from "components/identicon"
const objectAssignDeep = require("object-assign-deep");
export default {
    computed: mapState({
        theme: state => state.gateway.app.config.appearance.theme,
        unlocked_balance: state => state.gateway.wallet.info.unlocked_balance,
        info: state => state.gateway.wallet.info,
        is_ready (state) {
            return this.$store.getters["gateway/isReady"]
        },
        is_able_to_send (state) {
            return this.$store.getters["gateway/isAbleToSend"]
        }
    }),
    data () {
        return {
            staking: false,
            serviceNode: {
                key: "",
                amount: 0,
            },
        }
    },
    validations: {
        serviceNode: {
            amount: {
                required,
                decimal
            },
            key: { required, service_node_key },
        }
    },
    methods: {
        copyAddress (address, event) {
            event.stopPropagation()
            for(let i = 0; i < event.path.length; i++) {
                if(event.path[i].tagName == "BUTTON") {
                    event.path[i].blur()
                    break
                }
            }
            clipboard.writeText(address)
            this.$q.notify({
                type: "positive",
                timeout: 1000,
                message: "Address copied to clipboard"
            })
        },
        stake: function () {

            this.$v.serviceNode.$touch()

            if(this.serviceNode.amount < 0) {
                this.$q.notify({
                    type: "negative",
                    timeout: 1000,
                    message: "Amount cannot be negative"
                })
                return
            } else if(this.serviceNode.amount == 0) {
                this.$q.notify({
                    type: "negative",
                    timeout: 1000,
                    message: "Amount must be greater than zero"
                })
                return
            } else if(this.serviceNode.amount > this.unlocked_balance / 1e9) {
                this.$q.notify({
                    type: "negative",
                    timeout: 1000,
                    message: "Not enough unlocked balance"
                })
                return
            } else if (this.$v.serviceNode.amount.$error) {
                this.$q.notify({
                    type: "negative",
                    timeout: 1000,
                    message: "Amount not valid"
                })
                return
            }

            if (this.$v.serviceNode.key.$error) {
                this.$q.notify({
                    type: "negative",
                    timeout: 1000,
                    message: "Service node key not valid"
                })
                return
            }

            this.$q.dialog({
                title: "Stake",
                message: "Enter wallet password to continue.",
                prompt: {
                    model: "",
                    type: "password"
                },
                ok: {
                    label: "STAKE"
                },
                cancel: {
                    flat: true,
                    label: "CANCEL",
                    color: this.theme=="dark"?"white":"dark"
                }
            }).then(password => {
                // this.$store.commit("gateway/set_tx_status", {
                //     code: 1,
                //     message: "Sending transaction",
                //     sending: true
                // })
                // let newTx = objectAssignDeep.noMutate(this.newTx, {password})
                // this.$gateway.send("wallet", "transfer", newTx)
            }).catch(() => {
            })
        }
    },
    components: {
        Identicon,
    }
}
</script>

<style lang="scss">
.service-node-page {

    .q-item {
        padding-left: 0;
        padding-right: 0;
    }

    .recepient-address  {
        margin-bottom: 8px;
        font-size: 1rem;
    }
}
</style>
