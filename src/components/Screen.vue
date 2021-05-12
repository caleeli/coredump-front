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
      loadedScreen: "",
      content: null,
    };
  },
  methods: {
    parseScreen(screen) {
      if (screen && this.loadedScreen !== screen) {
        this.loadedScreen = screen;
        const parsed = compiler.parseComponent(screen);
        let component;
        eval("component=" + parsed.script.content.trim().substr(14));
        component.template = parsed.template.content;
        this.content = component;
      }
    },
    loadScreen() {
      if (this.instance.attributes.status === "COMPLETED") {
        this.$instanceScreen(this.instance.id)
          .then((screen) => {
            this.parseScreen(screen);
          })
          .catch(() => {
            this.content = "NoScreen";
          });
      } else {
        this.$tokens()
          .call(this.token.id, "getScreen", {})
          .then((screen) => {
            this.parseScreen(screen);
          })
          .catch((ee) => {
            console.log(ee);
            this.content = "NoScreen";
          });
      }
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