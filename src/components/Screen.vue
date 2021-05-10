<template>
  <div>
    <component
      :is="content"
      :token="token"
      :instance="instance"
      :data="instance.attributes.data"
    />
  </div>
</template>

<script>
const compiler = require("vue-template-compiler");

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
  methods: {
    loadScreen() {
      this.$tokens()
        .call(this.token.id, "getScreen", {})
        .then((screen) => {
          if (screen) {
            const parsed = compiler.parseComponent(screen);
            let component;
            eval("component=" + parsed.script.content.trim().substr(14));
            component.template = parsed.template.content;
            this.content = component;
          }
        })
        .catch(() => {
          this.content = "NoScreen";
        });
    },
  },
  mounted() {
    this.loadScreen();
  },
  watch: {
    token() {
      this.loadScreen();
    },
  },
};
</script>

<style>
</style>