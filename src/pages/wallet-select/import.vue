<template>
<q-page>
    <div class="q-mx-md import-wallet">

        <LokiField label="New wallet name" :error="$v.wallet.name.$error">
            <q-input
                v-model="wallet.name"
                placeholder="A name for your wallet"
                @blur="$v.wallet.name.$touch"
                :dark="theme=='dark'"
                hide-underline
                />
        </LokiField>

        <LokiField label="Wallet file" disable-hover>
            <q-input v-model="wallet.path" placeholder="Please select a file" disable :dark="theme=='dark'" hide-underline/>
            <input type="file" id="walletPath" v-on:change="setWalletPath" ref="fileInput" hidden />
            <q-btn color="secondary" v-on:click="selectFile" :text-color="theme=='dark'?'white':'dark'">Select wallet file</q-btn>
        </LokiField>

        <LokiField label="Password">
            <q-input v-model="wallet.password" placeholder="An optional password for the wallet" type="password" :dark="theme=='dark'" hide-underline />
        </LokiField>

        <LokiField label="Confirm Password">
            <q-input v-model="wallet.password_confirm" type="password" :dark="theme=='dark'" hide-underline />
        </LokiField>

        <q-field>
            <q-btn color="primary" @click="import_wallet" label="Import wallet" />
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
                path: "",
                password: "",
                password_confirm: ""
            },
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
        selectFile () {
            this.$refs.fileInput.click()
        },
        setWalletPath (file) {
            this.wallet.path = file.target.files[0].path
        },
        import_wallet() {
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

            this.$gateway.send("wallet", "import_wallet", this.wallet);
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
.import-wallet {
    .q-if-disabled {
        cursor: default !important;
        .q-input-target {
            cursor: default !important;
        }
    }

    .loki-field {
        margin-top: 16px;
    }
}
</style>
