<template>
  <b-card>
    <b-card-body v-if="runInCard && runProps.instanceId">
      <run-process v-bind="runProps" />
    </b-card-body>
    <b-card-body v-else>
      <b-link @click="callProcess" class="d-flex align-items-end process-link">
        <i class="material-icons process-icon">{{ icon }}</i>
        <span>{{ name || process.name }}</span>
      </b-link>
      <small class="process-description">{{ description }}</small>
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
    icon: { type: String, default: "play_circle" },
    name: String,
    description: String,
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
        runInCard: this.runInCard,
      },
    };
  },
  methods: {
    callProcess() {
      if (this.bpmn && this.processId) {
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
      }
    },
  },
  mounted() {
    if (!this.name && this.bpmn) {
      this.$process(this.bpmn, this.processId).then((process) => {
        this.process = process;
      });
    }
  },
};
</script>

<style>
.process-link:hover {
  text-decoration: none !important;
}
.process-link:hover span {
  text-decoration: underline !important;
}
.process-icon {
  font-size: 191%;
  width: 28pt;
}
.process-description {
  margin-left: 28pt;
}
</style>
