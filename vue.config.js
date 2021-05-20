const MonacoEditorPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  publicPath: "/modules/coredump/frontend/",
  runtimeCompiler: true,
  configureWebpack: {
    devtool: "source-map",
    plugins: [
      new MonacoEditorPlugin({
        languages: ['javascript', 'css', 'html', 'typescript', 'php']
      })
    ]
  }
};
