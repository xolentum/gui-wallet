<template>
<div class="check-transaction">
    <div class="q-pa-md">
        <div class="q-mb-lg">
            {{ $t('strings.checkTransactionDescription') }}
        </div>
        <LokiField :label="$t('fieldLabels.transactionId')" :error="$v.transactionId.$error">
            <q-input v-model="transactionId"
                :dark="theme=='dark'"
                :placeholder="$t('placeholders.pasteTransactionId')"
                @blur="$v.transactionId.$touch"
                hide-underline
            />
        </LokiField>
        <LokiField class="q-mt-md" :label="$t('fieldLabels.address')" :error="$v.address.$error" optional>
            <q-input v-model="address"
                :dark="theme=='dark'"
                :placeholder="$t('placeholders.recipientWalletAddress')"
                @blur="$v.address.$touch"
                hide-underline
            />
        </LokiField>
        <LokiField class="q-mt-md" :label="$t('fieldLabels.message')" optional>
            <q-input v-model="message"
                :dark="theme=='dark'"
                :placeholder="$t('placeholders.proveOptionalMessage')"
                hide-underline
            />
        </LokiField>
        <LokiField class="q-mt-md" :label="$t('fieldLabels.signature')" :error="$v.signature.$error">
            <q-input v-model="signature"
                :dark="theme=='dark'"
                :placeholder="$t('placeholders.pasteTransactionProof')"
                hide-underline
            />
        </LokiField>
        <q-field class="buttons q-pt-sm">
            <q-btn color="primary" @click="check" :label="$t('buttons.check')" />
            <q-btn color="secondary" @click="clear" :label="$t('buttons.clear')" v-if="canClear"/>
        </q-field>
    </div>
</div>
</template>

<script>
import { mapState } from "vuex"
import { required } from "vuelidate/lib/validators"
import { address } from "src/validators/common"
import LokiField from "components/loki_field"

export default {
    name: "CheckTransaction",
    computed: mapState({
        theme: state => state.gateway.app.config.appearance.theme,
        canClear () {
            return this.transactionId !== "" || this.address !== "" || this.message !== "" || this.signature != ""
        }
    }),
    data() {
        return {
            transactionId: "",
            address: "",
            message: "",
            signature: ""
        }
    },
    validations: {
        transactionId: { required },
        address: {
            isAddress(value) {
                    if (value === '') return true

                    return new Promise(resolve => {
                        address(value, this.$gateway)
                            .then(() => resolve(true))
                            .catch(e => resolve(false))
                    });
                }
        },
        signature: { required }
    },
    methods: {
        check() {
            this.$v.transactionId.$touch()
            this.$v.address.$touch()
            this.$v.signature.$touch()

            if (this.$v.transactionId.$error) {
                this.$q.notify({
                    type: "negative",
                    timeout: 1000,
                    message: this.$t("notification.errors.enterTransactionId")
                })
                return
            }

            if (this.$v.signature.$error) {
                this.$q.notify({
                    type: "negative",
                    timeout: 1000,
                    message: this.$t("notification.errors.enterTransactionProof")
                })
                return
            } 

            if (this.$v.address.$error) {
                this.$q.notify({
                    type: "negative",
                    timeout: 1000,
                    message: this.$t("notification.errors.invalidAddress")
                })
                return
            }

            
        },
        clear() {
            this.transactionId = ""
            this.address = ""
            this.message = ""
            this.signature = ""
            this.$v.$reset();
        }
    },
    components: {
        LokiField
    }
}
</script>


<style lang="scss">
.check-transaction {
    .buttons {
        .q-btn:not(:first-child) {
            margin-left: 8px;
        }
    }
}
</style>
