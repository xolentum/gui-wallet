module.exports = {
    root: true,
    parserOptions: {
        parser: "babel-eslint",
    },
    env: {
        node: true,
        browser: true
    },
    extends: [
        "plugin:vue/recommended",
        "eslint:recommended",
        "prettier/vue",
        "plugin:prettier/recommended"
    ],
    // required to lint *.vue files
    plugins: [
        "vue"
    ],
    globals: {
        "ga": true, // Google Analytics
        "cordova": true,
        "__statics": true
    },
    // add your custom rules here
    "rules": {
        // allow debugger during development
        "vue/component-name-in-template-casing": ["error", "PascalCase"],
        "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
        "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
    }
}
