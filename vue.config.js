const MonacoEditorPlugin = require('monaco-editor-webpack-plugin')
const path = require('path')

module.exports = {
  publicPath: "/modules/coredump/frontend/",
  runtimeCompiler: true,
  chainWebpack: config => {
    config.plugin('copy')
          .tap(args => {
            args[0].push({
              from: path.resolve(__dirname, 'node_modules/@processmaker/modeler/dist/img'),
              to: path.resolve(__dirname, 'dist/js/img'),
              toType: 'dir',
              ignore: ['.DS_Store']
            })
            return args
          })
  },
  configureWebpack: {
    devtool: "source-map",
    plugins: [
      new MonacoEditorPlugin({
        languages: ['javascript', 'css', 'html', 'typescript', 'php']
      })
    ]
  }
};
