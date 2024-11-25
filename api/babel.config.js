const babel = (api) => {
  const isTest = api.env('test')

  const plugins = [
    [
      'module-resolver',
      {
        alias: {
          ':movinin-types': '../packages/movinin-types',
        },
      },
    ],
  ]

  if (!isTest) {
    plugins.push('add-import-extension')
  }

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          targets: {
            node: 'current',
          },
        },
      ],
      '@babel/preset-typescript',
    ],
    plugins,
  }
}

export default babel
