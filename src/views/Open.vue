<template>
  <run-process v-bind="runProps" />
</template>

<script>
import RunProcess from "../components/RunProcess.vue";
export default {
  components: { RunProcess },
  data() {
    return {
      runProps: {
        bpmn: this.$route.params.bpmn,
        processId: this.$route.params.processId,
        instanceId: parseInt(this.$route.params.instanceId),
        openLatest: this.$route.params.openLatest,
      },
    };
  },
};
</script>

<style>
</style>
