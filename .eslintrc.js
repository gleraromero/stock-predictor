module.exports = {
    env: {
        commonjs: true,
        es6: true,
        node: true,
    },
    extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
    plugins: ["testing-library", "@typescript-eslint", "unused-imports"],
    globals: {
        // these are things injected using webpack define plugin
        process: false,
        BUILD_PATH: false,
    },
    rules: {
        "testing-library/await-async-queries": "error",
        "testing-library/no-await-sync-queries": "error",
        "testing-library/no-debugging-utils": "warn",
        "testing-library/no-dom-import": "off",
        "testing-library/prefer-screen-queries": "error",
        "testing-library/consistent-data-testid": [
            "error",
            {
                testIdAttribute: ["data-testid"],
                testIdPattern: "[a-z]*(-[a-z]*)*__[a-z]*(-[a-z]*)*",
            },
        ],
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-empty-interface": "warn",

        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-non-null-assertion": "off",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["warn", { ignoreRestSiblings: true, argsIgnorePattern: "^_" }],
        "@typescript-eslint/no-use-before-define": ["warn", "nofunc"],
        "@typescript-eslint/no-var-requires": "warn",
        "no-console": "off", // We are using it, tell eslint to stop complaining
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "prettier/prettier": ["error"],
        "unused-imports/no-unused-imports": "error",
    },
    overrides: [
        {
            files: ["*.test.*"],
            rules: {
                // it is fine to turn off these rules for tests/stories
                "@typescript-eslint/no-explicit-any": "off",
            },
        },
    ],
};
