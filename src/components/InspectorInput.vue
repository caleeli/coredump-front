<template>
  <b-form-group :label="label" :description="helper" @change="change">
    <b-form-input v-model="local" type="text" />
  </b-form-group>
</template>

<script>
export default {
  props: {
    value: null,
    label: String,
    helper: String,
  },
  data() {
    return {
      local: this.value,
    };
  },
  methods: {
    change() {
      this.$emit("input", this.local);
    },
  },
};
</script>
