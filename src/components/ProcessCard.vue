<template>
  <b-card>
    <b-card-body v-if="runInCard && runProps.instanceId">
      <run-process v-bind="runProps" />
    </b-card-body>
    <b-card-body v-else>
      <b-link @click="callProcess" class="d-flex align-items-end">
        <span
          class="material-icons"
          style="font-size: 191%; text-decoration: none !important"
          >play_circle</span
        >
        <span>{{ process.name }}</span>
      </b-link>
    </b-card-body>
  </b-card>
</template>

<script>
import RunProcess from "./RunProcess.vue";

export default {
  components: { RunProcess },
  props: {
    bpmn: String,
    instanceId: Number,
    processId: String,
    openLatest: Boolean,
    runInCard: Boolean,
  },
  data() {
    return {
      process: {
        name: "",
      },
      runProps: {
        bpmn: this.bpmn,
        processId: this.processId,
        instanceId: this.instanceId,
        openLatest: this.openLatest,
      },
    };
  },
  methods: {
    callProcess() {
      this.$callProcess(this.bpmn, this.processId).then((instance) => {
        if (!this.runInCard) {
          this.$router.push({
            name: "open",
            params: {
              bpmn: this.bpmn,
              processId: this.processId,
              instanceId: instance.id,
              openLatest: this.openLatest,
            },
          });
        } else {
          this.runProps.bpmn = this.bpmn;
          this.runProps.processId = this.processId;
          this.runProps.instanceId = instance.id;
          this.runProps.openLatest = this.openLatest;
        }
      });
    },
  },
  mounted() {
    this.$process(this.bpmn, this.processId).then((process) => {
      this.process = process;
    });
  },
};
</script>

<style>
</style>
