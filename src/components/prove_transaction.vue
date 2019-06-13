<template>
<div class="prove-transaction">
    <div class="q-pa-md">
        <div class="q-mb-lg">
            {{ $t('strings.proveTransactionDescription') }}
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
        <q-field class="buttons q-pt-sm">
            <q-btn color="primary" @click="generate" :label="$t('buttons.generate')" />
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
    name: "ProveTransaction",
    computed: mapState({
        theme: state => state.gateway.app.config.appearance.theme,
        canClear () {
            return this.transactionId !== "" || this.address !== "" || this.message !== ""
        }
    }),
    data() {
        return {
            transactionId: "",
            address: "",
            message: "",
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
        }
    },
    methods: {
        generate() {
            this.$v.transactionId.$touch()
            this.$v.address.$touch()

            if (this.$v.transactionId.$error) {
                this.$q.notify({
                    type: "negative",
                    timeout: 1000,
                    message: this.$t("notification.errors.enterTransactionId")
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
            this.$v.$reset();
        }
    },
    components: {
        LokiField
    }
}
</script>


<style lang="scss">
.prove-transaction {
    .buttons {
        .q-btn:not(:first-child) {
            margin-left: 8px;
        }
    }
}
</style>
