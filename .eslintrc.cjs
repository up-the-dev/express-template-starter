/* eslint-env node */
module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended-type-checked",
        "prettier",
    ],
    rules: {
        // Throws an error when console methods are used (like console.log)
        "no-console": "error",
        "@typescript-eslint/no-misused-promises": "off",

        // Requires usage of triple equals (===), and throws an error for double equals (==)
        eqeqeq: "error",
    },

    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    root: true,
    parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
    },
};
