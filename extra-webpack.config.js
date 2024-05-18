const singleSpaAngularWebpack =
  require("single-spa-angular/lib/webpack").default;
module.exports = (config, options) => {
  config.externals = [
    "@fpt-is/workflow-service",
    new RegExp(/^@fpt-is\/sdk-common\/.*/),
    // new RegExp(/^@fpt-is\/sdk-form$/)
    // /^single-spa$/,
    // /^single-spa-angular$/,
    // /^single-spa-angular\/internals$/,
    // /^rxjs$/,
    // /^rxjs\/operators$/,
    // /^zone\.js$/,
    // /^@angular\/animations$/,
    // /^@angular\/animations\/browser$/,
    // /^@angular\/router$/,
    // /^@angular\/compiler$/,
    // /^@angular\/common$/,
    // /^@angular\/common\/http$/,
    // /^@angular\/core$/,
    // /^@angular\/forms$/,
    // /^@angular\/platform-browser$/,
    // /^@angular\/platform-browser\/animations$/,
    // /^@angular\/platform-browser-dynamic$/
  ];
  const singleSpaWebpackConfig = singleSpaAngularWebpack(config, options);

  // Feel free to modify this webpack config however you'd like to
  return singleSpaWebpackConfig;
};
