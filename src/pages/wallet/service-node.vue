<template>
<q-page class="service-node-page">
    <div class="header row items-center justify-center q-pt-md">
        <q-btn-toggle
            v-model="screen"
            toggle-color="primary"
            color="secondary"
            :options="[
                {label: $t('titles.serviceNode.staking'), value: 'staking'},
                {label: $t('titles.serviceNode.registration'), value: 'registration'},
                {label: $t('titles.serviceNode.unlock'), value: 'unlock'}
            ]"
        />
    </div>
    <ServiceNodeStaking v-if="screen === 'staking'"/>
    <ServiceNodeRegistration v-if="screen === 'registration'" />
    <ServiceNodeUnlock v-if="screen === 'unlock'" />
</q-page>
</template>

<script>
import ServiceNodeStaking from "components/service_node_staking"
import ServiceNodeRegistration from "components/service_node_registration"
import ServiceNodeUnlock from "components/service_node_unlock"
export default {
    data () {
        return {
            screen: "staking",
        }
    },
    components: {
        ServiceNodeStaking,
        ServiceNodeRegistration,
        ServiceNodeUnlock
    }
}
</script>

<style lang="scss">
</style>
