import globals from "globals";


export default [
    {files: ["**/*.js"], languageOptions: {sourceType: "commonjs"}},
    {languageOptions: { globals: globals.browser }},
    {
        rules: {
            semi: "error",
            "indent": ["error", 4],
            "comma-dangle": 0,
            "no-console": "warn",
            "eqeqeq": "warn",
            "no-invalid-this": "error",
            "no-return-assign": "error",
            "no-unused-expressions": ["error", { "allowTernary": true }],
            "no-useless-concat": "error",
            "no-useless-return": "error",
            "no-constant-condition": "warn",
            "no-unused-vars": ["warn", { "argsIgnorePattern": "req|res|next|__" }],
            "arrow-spacing": "error",
            "no-confusing-arrow": "error",
            "no-duplicate-imports": "error",
            "no-var": "error",
            "object-shorthand": "off",
            "prefer-const": "error",
            "prefer-template": "warn"
        }
    }
];
