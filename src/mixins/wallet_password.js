import { mapState } from "vuex"

export default {
    computed: mapState({
        theme: state => state.gateway.app.config.appearance.theme
    }),
    methods: {
        hasPassword () {
            // Validate the address
            return new Promise((resolve) => {
                this.$gateway.once("has_password", (data) => {
                    resolve(!!data)
                })
                this.$gateway.send("wallet", "has_password")
            })
        },

        showPasswordConfirmation (options) {
            const { noPasswordMessage, ...other } = options

            return this.hasPassword().then(hasPassword => {
                return this.$q.dialog({
                    cancel: {
                        flat: true,
                        label: "CANCEL",
                        color: this.theme === "dark" ? "white" : "dark"
                    },
                    ...other,
                    message: hasPassword ? "Enter wallet password to continue." : noPasswordMessage,
                    prompt: hasPassword ? {
                        model: "",
                        type: "password"
                    } : null
                })
            }).then(password => password || "")
        }
    }
}
