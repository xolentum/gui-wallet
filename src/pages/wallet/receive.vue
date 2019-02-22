<template>
<q-page class="receive">
    <q-list link no-border :dark="theme=='dark'">

        <q-list-header>My primary address</q-list-header>
        <q-list class="item-group primary-address" no-border v-for="address in address_list.primary" :key="address.address" @click.native="details(address)">
            <q-item>
                <q-item-main>
                    <q-item-tile class="ellipsis" label>{{ address.address }}</q-item-tile>
                    <q-item-tile sublabel>Primary address</q-item-tile>
                </q-item-main>
                <q-item-side>
                    <q-btn
                        flat
                        style="width:25px;"
                        size="md" icon="file_copy"
                        @click="copyAddress(address.address, $event)">
                        <q-tooltip anchor="center left" self="center right" :offset="[5, 10]">
                            Copy address
                        </q-tooltip>
                    </q-btn>
                </q-item-side>
            </q-item>
            <q-item-separator />
            <q-item class="info">
                <q-item-main class="flex justify-between">
                    <div class="column">
                        <span>Balance</span>
                        <span class="value">{{address.balance | currency}}</span>
                    </div>
                    <div class="column">
                        <span>Unlocked balance</span>
                        <span class="value">{{ address.unlocked_balance | currency }}</span>
                    </div>
                    <div class="column">
                        <span>Unspent outputs</span>
                        <span class="value">{{ address.num_unspent_outputs | toString }}</span>
                    </div>
                </q-item-main>
            </q-item>
            <q-context-menu>
                <q-list link separator style="min-width: 150px; max-height: 300px;">
                    <q-item v-close-overlay
                            @click.native="details(address)">
                        <q-item-main label="Show details" />
                    </q-item>

                    <q-item v-close-overlay
                            @click.native="copyAddress(address.address, $event)">
                        <q-item-main label="Copy address" />
                    </q-item>
                </q-list>
            </q-context-menu>
        </q-list>

        <template v-if="address_list.used.length">
            <q-list-header>My used addresses</q-list-header>
            <q-list class="item-group" no-border v-for="address in address_list.used" @click.native="details(address)" :key="address.address">
                <q-item>
                    <q-item-main>
                        <q-item-tile class="ellipsis" label>{{ address.address }}</q-item-tile>
                        <q-item-tile sublabel>Sub-address (Index {{ address.address_index }})</q-item-tile>
                    </q-item-main>
                    <q-item-side>
                        <q-btn
                            flat
                            style="width:25px;"
                            size="md" icon="file_copy"
                            @click="copyAddress(address.address, $event)">
                            <q-tooltip anchor="center left" self="center right" :offset="[5, 10]">
                                Copy address
                            </q-tooltip>
                        </q-btn>
                    </q-item-side>
                </q-item>
                <q-item-separator />
                <q-item class="info">
                    <q-item-main class="flex justify-between">
                        <div class="column">
                            <span>Balance</span>
                            <span class="value">{{ address.balance | currency }}</span>
                        </div>
                        <div class="column">
                            <span>Unlocked balance</span>
                            <span class="value">{{ address.unlocked_balance | currency }}</span>
                        </div>
                        <div class="column">
                            <span>Unspent outputs</span>
                            <span class="value">{{ address.num_unspent_outputs | toString }}</span>
                        </div>
                    </q-item-main>
                </q-item>

                <q-context-menu>
                    <q-list link separator style="min-width: 150px; max-height: 300px;">
                        <q-item v-close-overlay
                                @click.native="details(address)">
                            <q-item-main label="Show details" />
                        </q-item>

                        <q-item v-close-overlay
                                @click.native="copyAddress(address.address, $event)">
                            <q-item-main label="Copy address" />
                        </q-item>
                    </q-list>
                </q-context-menu>
            </q-list>
        </template>


        <template v-if="address_list.unused.length">
            <q-list-header>My unused addresses</q-list-header>
            <q-list class="item-group" no-border v-for="address in address_list.unused" @click.native="details(address)" :key="address.address">
                <q-item>
                    <q-item-main>
                        <q-item-tile class="ellipsis" label>{{ address.address }}</q-item-tile>
                        <q-item-tile sublabel>Sub-address (Index {{ address.address_index }})</q-item-tile>
                    </q-item-main>
                    <q-item-side>
                        <q-btn
                            flat
                            style="width:25px;"
                            size="md" icon="file_copy"
                            @click="copyAddress(address.address, $event)">
                            <q-tooltip anchor="center left" self="center right" :offset="[5, 10]">
                                Copy address
                            </q-tooltip>
                        </q-btn>
                    </q-item-side>
                </q-item>

                <q-context-menu>
                    <q-list link separator style="min-width: 150px; max-height: 300px;">
                        <q-item v-close-overlay
                                @click.native="details(address)">
                            <q-item-main label="Show details" />
                        </q-item>

                        <q-item v-close-overlay
                                @click.native="copyAddress(address.address, $event)">
                            <q-item-main label="Copy address" />
                        </q-item>
                    </q-list>
                </q-context-menu>

           </q-list>
        </template>

    </q-list>
    <AddressDetails ref="addressDetails" />
</q-page>
</template>

<script>

const { clipboard } = require("electron")
import { mapState } from "vuex"
import Identicon from "components/identicon"
import AddressDetails from "components/address_details"
export default {
    computed: mapState({
        theme: state => state.gateway.app.config.appearance.theme,
        address_list: state => state.gateway.wallet.address_list
    }),
    filters: {
        toString: function (value) {
            if (typeof value !== "number") return "N/A";
            return String(value);
        },
        currency: function (value) {
            if (typeof value !== "number") return "N/A";

            const amount = value / 1e9
            return amount.toLocaleString()
        }
    },
    methods: {
        details (address) {
            this.$refs.addressDetails.address = address;
            this.$refs.addressDetails.isVisible = true;
        },
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
        }
    },
    components: {
        Identicon,
        AddressDetails,
    }
}
</script>

<style lang="scss">
.receive {
    .q-item-label {
        font-weight: 400;
    }

    .q-item-sublabel, .q-list-header {
        font-size: 13px;
    }

    .item-group {
        cursor: pointer;

        margin: 0 16px;
        // padding: 14px;
        border-radius: 3px;

        + .item-group {
            margin-top: 10px;
        }

        .q-item-side {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>
