<template>
  <div>
    <component :is="content" :token="token" :instance="instance" :data="instance.attributes.data" />
  </div>
</template>

<script>
const compiler = require('vue-template-compiler');
//const { renderToString } = require('vue-server-renderer').createRenderer();

export default {
  props: {
    instance: Object,
    token: Object,
  },
  data() {
    return {
      content: null,
    };
  },
  mounted() {
    this.$tokens()
      .call(this.token.id, "getDocumentation", {})
      .then((doc) => {
        if (doc['text/plain']) {
          const parsed = compiler.parseComponent(doc['text/plain'][0]);
          let component;
          eval("component=" + parsed.script.content.trim().substr(14));
          const res = compiler.compileToFunctions(parsed.template.content);
          component.render = res.render;
          this.content = component;
        }
      });
  },
};
</script>

<style>
</style>