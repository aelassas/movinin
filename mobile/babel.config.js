module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          moduleName: '@env',
          path: '.env',
          blocklist: null,
          allowlist: null,
          safe: true,
          allowUndefined: false,
        },
      ],
      [
        "module-resolver",
        {
          "root": ['./'],
          "alias": {
            ":movinin-types": "../packages/movinin-types",
            ":movinin-helper": "../packages/movinin-helper",
            ":currency-converter": "../packages/currency-converter"
          }
        }
      ],
      'react-native-reanimated/plugin',
    ],
  }
}
