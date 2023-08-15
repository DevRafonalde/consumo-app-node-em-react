module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        "plugin:react/recommended",
        "airbnb",
        "plugin:prettier/recommended",
    ],
    parser: "@babel/eslint-parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        babelOptions: {
            presets: ["@babel/preset-react"],
        },
        ecmaVersion: "latest",
        requireConfigFile: false,
        sourceType: "module",
    },
    plugins: ["react", "prettier", "react-hooks"],
    rules: {
        "prettier/prettier": 2,
        "react/jsx-filename-extension": 0,
        "import/prefer-default-export": 0,
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "eol-last": 0,
        "linebreak-style": 0,
        "no-console": "off",
        quotes: ["error", "double"],
        "class-methods-use-this": 0,
        indent: ["error", 4, {ignoredNodes: ["SwitchCase"]}],
        "object-curly-spacing": ["error", "never"],
        "keyword-spacing": [
            "error",
            {
                overrides: {
                    if: {after: true},
                    for: {after: false},
                    while: {after: false},
                    static: {after: false},
                    as: {after: false},
                },
            },
        ],
        "template-curly-spacing": ["error", "never"],
        "import/no-extraneous-dependencies": 0,
        "no-unused-vars": 1,
        camelcase: 0,
    },
};
