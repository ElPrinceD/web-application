const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

const appDirectory = fs.realpathSync(process.cwd())
const resolveApp = relativePath => path.resolve(appDirectory, relativePath)

//MARK::Add Web Blocks
const appIncludes = [
resolveApp('../blocks/pushnotifications/src/'),
resolveApp('../blocks/notifications/src/'),

resolveApp('../blocks/calendar/src/'),
resolveApp('../blocks/adminconsole/src/'),
resolveApp('../blocks/catalogue1/src/'),
resolveApp('../blocks/analytics1/src/'),
resolveApp('../blocks/payments/src/'),
resolveApp('../blocks/rolesandpermissions/src/'),
resolveApp('../blocks/settings/src/'),
resolveApp('../blocks/signuplogin/src/'),
resolveApp('../blocks/splashscreen1/src/'),
resolveApp('../blocks/termsandconditions/src/'),
resolveApp('../blocks/contentmanagement1/src/'),

resolveApp('../blocks/navigationmenu/src/'),
resolveApp('../blocks/core/src/'),
resolveApp('../blocks/location/src/'),
resolveApp('../blocks/analytics/src/'),
resolveApp('../blocks/knowyourcustomerkycverification/src/'),
resolveApp('../blocks/utilities/src/'),
resolveApp('../blocks/stripepayments/src/'),
resolveApp('../blocks/social-media-account-registration/src/'),
resolveApp('../blocks/social-media-account/src/'),
resolveApp('../blocks/email-account-login/src/'),
resolveApp('../blocks/email-account-registration/src/'),
resolveApp('../blocks/country-code-selector/src/'),
resolveApp('../blocks/forgot-password/src/'),
resolveApp('../blocks/otp-input-confirmation/src/'),
resolveApp('../blocks/social-media-account-login/src/'),
resolveApp('../blocks/cameraaccess/src/'),
resolveApp('../blocks/bulkuploading/src/'),
resolveApp('../blocks/geofence/src/'),
resolveApp('../blocks/termsconditions/src/'),
resolveApp('../blocks/documentopener/src/'),
resolveApp('../blocks/user-profile-basic/src/'),
resolveApp('../blocks/educational-user-profile/src/'),
resolveApp('../blocks/contentmanagement/src/'),
resolveApp('../blocks/docusignintegration/src/'),
resolveApp('../blocks/search/src/'),
resolveApp('../blocks/scheduling/src/'),
resolveApp('../blocks/landingpage/src/'),
resolveApp('../blocks/tasks/src/'),
resolveApp('../blocks/accountgroups/src/'),
resolveApp('../blocks/requestmanagement/src/'),
resolveApp('../blocks/collecttransactionfees/src/'),
resolveApp('../blocks/ordermanagement/src/'),
resolveApp('../blocks/catalogue/src/'),
resolveApp('../blocks/outlookintegration/src/'),
resolveApp('../blocks/splashscreen/src/'),
resolveApp('../blocks/googlecalendarsync/src/'),
resolveApp('../blocks/rolesandpermissions2/src/'),
resolveApp('../blocks/adminconsole2/src/'),
resolveApp('../blocks/settings2/src/'),
resolveApp('../blocks/cfzoomintegration92/src/'),
resolveApp('../blocks/emailnotifications2/src/'),
resolveApp('../blocks/quotemanagement2/src/'),
resolveApp('../blocks/dashboard/src/'),

  resolveApp('src'),
  resolveApp('../components/src'),
  resolveApp('../framework/src'),
  resolveApp('../../node_modules/radar_sdk_js'),
  resolveApp('../../node_modules/react-native-elements'),
  resolveApp('../../node_modules/react-native-vector-icons'),
  resolveApp('../../node_modules/react-native-ratings'),
  resolveApp('../../node_modules/react-native-image-picker'),
  resolveApp('../../node_modules/react-native-check-box'),
  resolveApp('../../node_modules/react-native-calendars'),
  resolveApp('../../node_modules/react-native-swipe-gestures'),
  resolveApp('../../node_modules/react-native-password-strength-meter'),
  resolveApp('../../node_modules/react-navigation-deprecated-tab-navigator'),
  resolveApp('../../node_modules/react-navigation-drawer'),
  resolveApp('../../node_modules/react-navigation-tabs'),
  resolveApp('../../node_modules/react-native-screens'),
  resolveApp('../../node_modules/react-navigation'),
  resolveApp('../../node_modules/react-native-fs'),
  resolveApp('../../node_modules/@zoom/videosdk-ui-toolkit'),
  resolveApp('../blocks/restClient/src'),
  resolveApp('../blocks/alert/src'),
  resolveApp('../blocks/adapters/src'),
  resolveApp('../blocks/info-page/src'),
  resolveApp('../blocks/chat/src')
]

const CompressionPlugin = require('compression-webpack-plugin'); //gzip
const BrotliPlugin = require('brotli-webpack-plugin'); //brotli

module.exports = function override(config, env) {
  // allow importing from outside of src folder
  config.resolve.plugins = config.resolve.plugins.filter(
    plugin => plugin.constructor.name !== 'ModuleScopePlugin'
  )
  
  // Disable TypeScript checking for build
  config.plugins = config.plugins.filter(plugin =>
    plugin.constructor.name !== 'ForkTsCheckerWebpackPlugin'
  )
  config.module.rules[0].include = appIncludes
  config.module.rules[1] = null
  config.module.rules[2].oneOf[1].include = appIncludes
  config.module.rules[2].oneOf[1].options.plugins = [
    require.resolve('babel-plugin-react-native-web'),
  ].concat(config.module.rules[2].oneOf[1].options.plugins)
  config.module.rules = config.module.rules.filter(Boolean)
  config.plugins.push(
    new webpack.DefinePlugin({ __DEV__: env !== 'production' }),
    //gzip
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      threshold: 8192,
      minRatio: 0.8
    }),
    //brotli plugin
    new BrotliPlugin({ 
      asset: '[path].br[query]',
      test: /\.(js|css|html|svg)$/,
      threshold: 10240,
      minRatio: 0.8
    }),
  )
  config.resolve.alias = {
    'react-native-maps': 'react-native-web-maps',
    'react-native': 'react-native-web',
    'react-native-web/dist/exports/MaskedViewIOS': 'react-native-web/dist/exports/View',
    'react-native-web/dist/exports/AsyncStorage': 'react-native-web/dist/exports/View'
  };
  return config
}