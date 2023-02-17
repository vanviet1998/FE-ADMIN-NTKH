const CracoLessPlugin = require('craco-less');
const CracoAlias = require('craco-alias')
const path = require("path");
const enableImportsFromExternalPaths = require("./enableImportsFromExternalPaths");
const sharedLibOne = path.resolve(__dirname, "./shared");

module.exports = {
  // plugins: [
  //   {
  //     plugin: CracoLessPlugin,
  //     options: {
  //       lessLoaderOptions: {
  //         lessOptions: {
  //           modifyVars: { '@primary-color': '#1DA57A' },
  //           javascriptEnabled: true,
  //         },
  //       },
  //     },
  //   },
  // ],
  webpack: {
    configure: webpackConfig => {

      // ts-loader is required to reference external typescript projects/files (non-transpiled)
      webpackConfig.module.rules.push({
        test: /\.ts?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true,
          configFile: 'tsconfig.json',
        },
      })
      
      return webpackConfig;
    }
  }
};