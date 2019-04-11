<template>
<div class="language-select column items-center justify-center">
    <h6 class="q-my-md" style="font-weight: 300">{{ $t("strings.selectLanguage") }}:</h6>
    <div class="row justify-center">
        <q-btn
            class="row justify-center items-center"
            v-for="option in options"
            :key="option.value"
            :color="lang === option.value ? 'primary' : 'secondary'"
            @click="setLanguage(option.value)"
            size="md"
        >
            <span :class="`flag-icon flag-icon-${option.flag}`" />
            <span>{{ option.label }}</span>
        </q-btn>
    </div>
</div>
</template>

<script>
export default {
    name: "LanguageSelect",
    data () {
        return {
            options: [
                { label: "English", value: "en-us", flag: "us" },
            ]
        }
    },
    computed: {
        lang () {
            return this.$i18n.locale
        }
    },
    methods: {
        setLanguage(lang) {
            this.$gateway.send("core", "set_language", { lang })
            this.$emit('select', lang)
        }
    },
}
</script>

<style lang="scss">
.language-select {
    .q-btn {
        margin: 2px;
    }

    .flag-icon {
        margin-right: 4px;
    }
}
</style>
