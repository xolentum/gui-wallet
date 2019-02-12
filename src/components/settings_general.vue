<template>
<div class="settings-general">
    <div class="row justify-between q-mb-md">
        <div><q-radio v-model="config_daemon.type" val="local_remote" label="Local + Remote Daemon" /></div>
        <div><q-radio v-model="config_daemon.type" val="local" label="Local Daemon Only" /></div>
        <div><q-radio v-model="config_daemon.type" val="remote" label="Remote Daemon Only" /></div>
    </div>

    <p v-if="config_daemon.type == 'local_remote'">
        Get started quickly with this default option. Wallet will download the full blockchain, but use a remote node while syncing.
    </p>
    <p v-if="config_daemon.type == 'local'">
        Full security, wallet will download the full blockchain. You will not be able to transact until sync is completed.
    </p>
    <p v-if="config_daemon.type == 'remote'">
        Less security, wallet will connect to a remote node to make all transactions.
    </p>

    <q-field v-if="config_daemon.type != 'remote'">
        <div class="row gutter-sm">
            <div class="col-8">
                <q-input v-model="config_daemon.rpc_bind_ip" float-label="Local Daemon IP"
                         :dark="theme=='dark'" disable />
            </div>
            <div class="col-4">
                <q-input v-model="config_daemon.rpc_bind_port" float-label="Local Daemon Port (RPC)" type="number" :decimals="0" :step="1" min="1024" max="65535" :dark="theme=='dark'" />
            </div>
        </div>
    </q-field>

    <q-field v-if="config_daemon.type != 'local'">
        <div class="row gutter-sm">
            <div class="col-8">
                <q-input v-model="config_daemon.remote_host" float-label="Remote Node Host" :dark="theme=='dark'" />
            </div>
            <div class="col-4">
                <q-input v-model="config_daemon.remote_port" float-label="Remote Node Port" type="number" :decimals="0" :step="1" min="1024" max="65535" :dark="theme=='dark'" />
            </div>
        </div>

    </q-field>

    <q-field>
        <div class="row gutter-sm">
            <div class="col-8">
                <q-input v-model="config.app.data_dir" stack-label="Data Storage Path" disable :dark="theme=='dark'" />
                <input type="file" webkitdirectory directory id="dataPath" v-on:change="setDataPath" ref="fileInput" hidden />
            </div>
            <div class="col-4">
                <q-btn v-on:click="selectPath" :text-color="theme=='dark'?'white':'dark'">Select Location</q-btn>
            </div>
        </div>
    </q-field>

    <div v-if="(config_daemon.type !== 'local') && (config.app.net_type === 'main')">
        <hr>
        <div class="presets">
            <div class="q-body-1">Remote Node Presets</div>
            <q-field>
                <div class="row gutter-sm">
                    <div class="col-8">
                    <q-select
                        v-model="select"
                        :options="remoteOptions"
                        :dark="theme=='dark'"
                        />
                    </div>
                    <div class="col-4">
                        <q-btn v-on:click="loadPreset" :text-color="theme=='dark'?'white':'dark'">Load Preset</q-btn>
                    </div>
                </div>
            </q-field>
        </div>
    </div>

    <q-collapsible label="Advanced Options" header-class="non-selectable row reverse advanced-options-label">

        <q-field>
            <div class="row gutter-sm">
                <div class="col-6">
                    <q-input v-model="config_daemon.log_level" :disable="config_daemon.type == 'remote'" :dark="theme=='dark'"
                             float-label="Daemon Log Level" type="number" :decimals="0" :step="1" min="0" max="4" />
                </div>
                <div class="col-6">
                    <q-input v-model="config.wallet.log_level" :dark="theme=='dark'"
                             float-label="Wallet Log Level" type="number" :decimals="0" :step="1" min="0" max="4" />
                </div>
            </div>
        </q-field>

        <q-field>
            <div class="row gutter-sm">
                <div class="col-3">
                    <q-input v-model="config_daemon.in_peers" :disable="config_daemon.type == 'remote'" :dark="theme=='dark'"
                             float-label="Max Incoming Peers" type="number" :decimals="0" :step="1" min="-1" max="65535" />
                </div>
                <div class="col-3">
                    <q-input v-model="config_daemon.out_peers" :disable="config_daemon.type == 'remote'" :dark="theme=='dark'"
                             float-label="Max Outgoing Peers" type="number" :decimals="0" :step="1" min="-1" max="65535" />
                </div>
                <div class="col-3">
                    <q-input v-model="config_daemon.limit_rate_up" :disable="config_daemon.type == 'remote'" :dark="theme=='dark'"
                             float-label="Limit Upload Rate" type="number" suffix="Kb/s" :decimals="0" :step="1" min="-1" max="65535" />
                </div>
                <div class="col-3">
                    <q-input v-model="config_daemon.limit_rate_down" :disable="config_daemon.type == 'remote'" :dark="theme=='dark'"
                             float-label="Limit Download Rate" type="number" suffix="Kb/s" :decimals="0" :step="1" min="-1" max="65535" />
                </div>
            </div>
        </q-field>
        <q-field>
            <div class="row gutter-sm">
                <div class="col-3">
                    <q-input v-model="config_daemon.p2p_bind_port" :disable="config_daemon.type == 'remote'" :dark="theme=='dark'"
                             float-label="Daemon P2P Port" type="number" :decimals="0" :step="1" min="1024" max="65535" />
                </div>
                <div class="col-3">
                    <q-input v-model="config_daemon.zmq_rpc_bind_port" :disable="config_daemon.type == 'remote'" :dark="theme=='dark'"
                             float-label="Daemon ZMQ Port" type="number" :decimals="0" :step="1" min="1024" max="65535" />
                </div>
                <div class="col-3">
                    <q-input v-model="config.app.ws_bind_port" :dark="theme=='dark'"
                             float-label="Internal Wallet Port" type="number" :decimals="0" :step="1" min="1024" max="65535" />
                </div>
                <div class="col-3">
                    <q-input v-model="config.wallet.rpc_bind_port" :disable="config_daemon.type == 'remote'" :dark="theme=='dark'"
                             float-label="Wallet RPC Port" type="number" :decimals="0" :step="1" min="1024" max="65535" />
                </div>
            </div>
        </q-field>
         <q-field helper="Choose a network" label="Network" orientation="vertical">
             <q-option-group
                type="radio"
                v-model="config.app.net_type"
                :options="[
                { label: 'Main Net', value: 'main' },
                { label: 'Stage Net', value: 'staging' },
                { label: 'Test Net', value: 'test' }
                ]"
            />
        </q-field>

    </q-collapsible>
</div>
</template>

<script>
import { mapState } from "vuex"
export default {
    name: "SettingsGeneral",
    computed: mapState({
        theme: state => state.gateway.app.config.appearance.theme,
        remotes: state => state.gateway.app.remotes,
        remoteOptions (state) {
            return this.remotes.map((r, index) => ({
                label: `${r.host}:${r.port}`,
                value: index,
            }));
        },
        config: state => state.gateway.app.pending_config,
        config_daemon (state) {
            return this.config.daemons[this.config.app.net_type]
        },
    }),
    methods: {
        selectPath () {
            this.$refs.fileInput.click()
        },
        setDataPath (file) {
            this.config.app.data_dir = file.target.files[0].path
        },
        loadPreset () {
            if (!this.remotes || this.remotes.length === 0) return;

            const { host, port } = this.remotes[this.select];
            this.config_daemon.remote_host = host;
            this.config_daemon.remote_port = port;
        },
    },
    data () {
        return {
            select: 0,
        }
    },
}
</script>

<style lang="scss">
.settings-general {
    .q-field {
        margin: 20px 0
    }

    .q-if-disabled {
        cursor: default !important;
        .q-input-target {
            cursor: default !important;
        }
    }

    .q-item,
    .q-collapsible-sub-item {
        padding: 0;
    }

    .presets {
        margin-top: 20px;
    }
}
</style>
