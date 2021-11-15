module.exports = {
  root: true,
  env: {
    // this section will be used to determine which APIs are available to us
    // (i.e are we running in a browser environment or a node.js env)
    node: true,
    browser: true,
  },
  parserOptions: {
    parser: "babel-eslint",
    // specifying a module sourcetype prevent eslint from marking import statements as errors
    sourceType: "module",
  },
  extends: [
    // use the recommended rule set for both plain javascript and vue
  ],
  rules: {
    // we should always disable console logs and debugging in production
    "no-console": "off",
    "no-debugger": "off",
    "no-unused-vars": "off",
    "no-empty": "off",
    "no-unreachable": "off",
    curly: "on",
    eqeqeq: "on",
    "no-process-env": "off",
    "no-mixed-requires": "off",
    "no-new-require": "off",
    "no-inline-comments": "off",
  },
};
