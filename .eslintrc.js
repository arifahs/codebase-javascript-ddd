module.exports = {
    extends: "google",
    env: {
      es6: true,
      node: true,
    },
    plugins: ["import"],
    parserOptions: {
      sourceType: "module",
    },
    parser: "babel-eslint",
    rules: {
      semi: 0,
      "max-len": [2, 150, 4],
      "require-jsdoc": 0,
      "valid-jsdoc": 0
    }
};