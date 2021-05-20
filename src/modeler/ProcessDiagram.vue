<template>
  <div style="width: 100%; min-height: 100%;">
    <modeler
      ref="modeler"
      :key="model"
      :owner="self"
      :decorations="decorations"
      @validate="validationErrors = $event"
      @warnings="warnings = $event"
      @saveBpmn="saveBpmn"
      @set-xml-manager="xmlManager = $event"
    />
  </div>
</template>

<script>
import { Modeler } from "@processmaker/modeler";

export default {
  components: { Modeler },
  props: {
    value: String,
  },
  data() {
    return {
      model: 0,
      self: this,
      decorations: {
        borderOutline: {},
      },
      process: window.ProcessMaker.modeler.process,
      validationErrors: {},
      warnings: [],
      xmlManager: null,
    };
  },
  methods: {
    loadBpmn(bpmn) {
      this.$refs.modeler.loadXML(bpmn);
    },
    saveBpmn({ xml, svg }) {
      // Fix width and height
      const g = this.$refs.modeler.$el.querySelector('svg[joint-selector] g');
      const size = g.getClientRects()[0];
      const width = size.width * 0.5 + 10;
      const height = size.height * 0.5 + 20;
      svg = svg.replace('width="100%" height="100%"', `width="${width}px" height="${height}px"`);
      this.$emit("saved", xml, svg);
    },
  },
  mounted() {
    window.ProcessMaker.$modeler = this.$refs.modeler;
    if (this.value) {
      this.loadBpmn(this.value);
    }
  },
};
</script>
