const {removeModuleScopePlugin, override, babelInclude, addWebpackAlias, addBabelPlugin,addExternalBabelPlugin} = require("customize-cra");
const path = require("path");
const babelTsTransformPlugin = require("babel-plugin-transform-typescript-metadata");

module.exports = override(
  addBabelPlugin(babelTsTransformPlugin),

);