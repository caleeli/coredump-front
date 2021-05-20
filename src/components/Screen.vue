<template>
  <div>
    <component
      :id="uuid"
      :is="content"
      :token="token"
      :instance="instance"
      :data="instance && instance.attributes.data"
      v-bind="instance && instance.attributes.data"
    />
  </div>
</template>

<script>
const { v4: uuidv4 } = require("uuid");
const compiler = require("vue-template-compiler");

export default {
  props: {
    instance: Object,
    token: Object,
    screenContent: String,
  },
  data() {
    return {
      uuid: uuidv4(),
      loadedScreen: "",
      content: null,
    };
  },
  methods: {
    addStyles(styles) {
      const actual = this.$el.getElementsByTagName("style");
      while (actual.length > 0) {
        actual.item(0).parentNode.removeChild(actual.item(0));
      }
      styles.forEach((style) => {
        const element = this.$el.ownerDocument.createElement("style");
        Object.keys(style.attrs).forEach((attr) => {
          element.setAttribute(attr, style.attrs[attr]);
        });
        element.innerHTML = style.content;
        const id = this.uuid;
        this.$el.appendChild(element);
        if (style.attrs.scoped) {
          element.sheet.cssRules.forEach(
            (rule) => (rule.selectorText = `#${id} ${rule.selectorText}`)
          );
        }
      });
    },
    parseScreen(screen) {
      if (screen && this.loadedScreen !== screen) {
        this.loadedScreen = screen;
        const parsed = compiler.parseComponent(screen);
        let component;
        eval(parsed.script.content.replace("export default", "component = "));
        this.addStyles(parsed.styles);
        component.template = parsed.template.content;
        this.content = component;
      }
    },
    loadScreen() {
      if (this.screenContent) {
        this.parseScreen(this.screenContent);
        return;
      }
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