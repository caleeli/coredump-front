<template>
  <div>
    <b-button variant="primary" size="sm" @click="editScript">
      {{ $t("Edit Code") }}
    </b-button>
  </div>
</template>

<script>
export default {
  props: {
    value: null,
  },
  computed: {
    processDiagram() {
      let node = this;
      while (node.$options._componentTag !== "process-diagram") {
        node = node.$parent;
      }
      return node;
    },
  },
  methods: {
    editScript() {
      this.processDiagram.$emit("edit-script", this.value || "", this);
    },
    updateScript(code) {
      this.$emit("input", code);
    },
  },
};
</script>
