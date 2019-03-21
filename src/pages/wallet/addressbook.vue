<template>
<q-page class="address-book">

    <div class="row q-pt-sm q-mx-md q-mb-none items-center non-selectable" style="height: 44px;">
            Address book
    </div>

    <template v-if="address_book_combined.length">
        <q-list link no-border :dark="theme=='dark'" class="loki-list">
            <q-item class="loki-list-item" v-for="(entry, index) in address_book_combined" @click.native="details(entry)" :key="entry.address">
                <q-item-main>
                    <q-item-tile sublabel>{{ entry.name }}</q-item-tile>
                    <q-item-tile class="ellipsis" label>{{ entry.address }}</q-item-tile>
                </q-item-main>
                <q-item-side>
                    <q-btn
                        color="primary" style="width:25px; margin-right: 10px;"
                        size="sm" icon="call_made"
                        :disabled="view_only"
                        @click="sendToAddress(entry, $event)">
                        <q-tooltip anchor="center left" self="center right" :offset="[5, 10]">
                            Send coins
                        </q-tooltip>
                    </q-btn>
                    <q-icon size="24px" :name="entry.starred ? 'star' : 'star_border'" />
                </q-item-side>

                <q-context-menu>
                    <q-list link separator style="min-width: 150px; max-height: 300px;">
                        <q-item v-close-overlay
                                @click.native="details(entry)">
                            <q-item-main label="Show details" />
                        </q-item>

                        <q-item v-close-overlay
                                @click.native="sendToAddress(entry, $event)">
                            <q-item-main label="Send to this address" />
                        </q-item>

                        <q-item v-close-overlay
                                @click.native="copyAddress(entry, $event)">
                            <q-item-main label="Copy address" />
                        </q-item>
                    </q-list>
                </q-context-menu>

            </q-item>
        </q-list>
    </template>
    <template v-else>
        <p class="q-ma-md">Address book is empty</p>
    </template>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn
            :disable="!is_ready"
            round
            color="primary"
            @click="addEntry"
            icon="add"
            />
    </q-page-sticky>
    <AddressBookDetails ref="addressBookDetails" />

</q-page>
</template>

<script>
const { clipboard } = require("electron")
import { mapState } from "vuex"
import Identicon from "components/identicon"
import AddressBookDetails from "components/address_book_details"
export default {
    computed: mapState({
        theme: state => state.gateway.app.config.appearance.theme,
        view_only: state => state.gateway.wallet.info.view_only,
        address_book: state => state.gateway.wallet.address_list.address_book,
        address_book_starred: state => state.gateway.wallet.address_list.address_book_starred,
        is_ready (state) {
            return this.$store.getters["gateway/isReady"]
        },
        address_book_combined (state) {
            const starred = this.address_book_starred.map(a => ({ ...a, starred: true }));
            return [
                ...starred,
                ...this.address_book
            ]
        }
    }),
    methods: {
        details: function (entry) {
            this.$refs.addressBookDetails.entry = entry
            this.$refs.addressBookDetails.mode = "view"
            this.$refs.addressBookDetails.isVisible = true
        },
        addEntry: function () {
            this.$refs.addressBookDetails.entry = null
            this.$refs.addressBookDetails.mode = "new"
            this.$refs.addressBookDetails.isVisible = true
        },
        sendToAddress (address, event) {
            event.stopPropagation()
            for(let i = 0; i < event.path.length; i++) {
                if(event.path[i].tagName == "BUTTON") {
                    event.path[i].blur()
                    break
                }
            }
            this.$router.replace({ path: "send", query: {address: address.address, payment_id: address.payment_id} });
        },
        copyAddress (entry, event) {
            event.stopPropagation()
            for(let i = 0; i < event.path.length; i++) {
                if(event.path[i].tagName == "BUTTON") {
                    event.path[i].blur()
                    break
                }
            }
            clipboard.writeText(entry.address)
            if(entry.payment_id) {
                this.$q.dialog({
                    title: "Copy address",
                    message: "There is a payment id associated with this address.\nBe sure to copy the payment id separately.",
                    ok: {
                        label: "OK"
                    },
                }).then(password => {
                    this.$q.notify({
                        type: "positive",
                        timeout: 1000,
                        message: "Address copied to clipboard"
                    })
                }).catch(() => {
                    this.$q.notify({
                        type: "positive",
                        timeout: 1000,
                        message: "Address copied to clipboard"
                    })
                })
            } else {
                this.$q.notify({
                    type: "positive",
                    timeout: 1000,
                    message: "Address copied to clipboard"
                })
            }
        }

    },
    components: {
        Identicon,
        AddressBookDetails
    }
}
</script>

<style lang="scss">
.address-book {
    .q-item-label {
        font-weight: 400;
    }

    .q-item-sublabel, .q-list-header {
        font-size: 14px;
        margin-top: 0px;
    }
}
</style>
