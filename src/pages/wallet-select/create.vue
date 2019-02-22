<template>
<q-page class="create-wallet">
    <div class="fields q-mx-md q-mt-md">
        <LokiField label="Wallet name" :error="$v.wallet.name.$error">
            <q-input
                v-model="wallet.name"
                @blur="$v.wallet.name.$touch"
                :dark="theme=='dark'"
                placeholder="A name for your wallet"
                hide-underline
            />
        </LokiField>

        <LokiField label="Seed Language">
            <q-select
                v-model="wallet.language"
                :options="languageOptions"
                :dark="theme=='dark'"
                hide-underline
            />
        </LokiField>

        <LokiField label="Password" optional>
            <q-input
                v-model="wallet.password"
                type="password"
                :dark="theme=='dark'"
                placeholder="An optional password for the wallet"
                hide-underline
            />
        </LokiField>

        <LokiField label="Confirm Password">
            <q-input
                v-model="wallet.password_confirm"
                type="password"
                :dark="theme=='dark'"
                hide-underline
            />
        </LokiField>

        <q-field>
            <q-btn color="primary" @click="create" label="Create wallet" />
        </q-field>

    </div>
</q-page>
</template>

<script>
import { required } from "vuelidate/lib/validators"
import { mapState } from "vuex"
import LokiField from "components/loki_field"
export default {
    data () {
        return {
            wallet: {
                name: "",
                language: "English",
                password: "",
                password_confirm: ""
            },

            languageOptions: [

                {label: "English", value: "English"},
                {label: "Deutsch", value: "Deutsch"},
                {label: "Español", value: "Español"},
                {label: "Français", value: "Français"},
                {label: "Italiano", value: "Italiano"},
                {label: "Nederlands", value: "Nederlands"},
                {label: "Português", value: "Português"},
                {label: "Русский", value: "Русский"},
                {label: "日本語", value: "日本語"},
                {label: "简体中文 (中国)", value: "简体中文 (中国)"},
                {label: "Esperanto", value: "Esperanto"},
                {label: "Lojban", value: "Lojban"}

            ]
        }
    },
    computed: mapState({
        theme: state => state.gateway.app.config.appearance.theme,
        status: state => state.gateway.wallet.status,
    }),
    watch: {
        status: {
            handler(val, old){
                if(val.code == old.code) return
                switch(this.status.code) {
                    case 1:
                        break;
                    case 0:
                        this.$q.loading.hide()
                        this.$router.replace({ path: "/wallet-select/created" });
                        break;
                    default:
                        this.$q.loading.hide()
                        this.$q.notify({
                            type: "negative",
                            timeout: 1000,
                            message: this.status.message
                        })
                        break;
                }
            },
            deep: true
        }
    },
    validations: {
        wallet: {
            name: { required }
        }
    },
    methods: {
        create() {
            this.$v.wallet.$touch()

            if (this.$v.wallet.$error) {
                this.$q.notify({
                    type: "negative",
                    timeout: 1000,
                    message: "Enter a wallet name"
                })
                return
            }
            if(this.wallet.password != this.wallet.password_confirm) {
                this.$q.notify({
                    type: "negative",
                    timeout: 1000,
                    message: "Passwords do not match"
                })
                return
            }

            this.$q.loading.show({
                delay: 0
            })

            this.$gateway.send("wallet", "create_wallet", this.wallet);
        },
        cancel() {
            this.$router.replace({ path: "/wallet-select" });
        }
    },
    components: {
        LokiField
    }
}
</script>

<style lang="scss">
.create-wallet {
    .fields {
        > * {
            margin-bottom: 16px;
        }
    }
}
</style>
