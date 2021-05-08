const files = require.context("./", true, /\.vue$/i);
export default {
  install(Vue) {
    files.keys().map(key => {
      const name = key
        .split("/")
        .pop()
        .split(".")[0];
      Vue.component(
        name,
        files(key).default
      )
    }
    );
  }
};
