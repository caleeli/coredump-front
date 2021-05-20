<template>
  <b-card>
    <b-card-body v-if="runInCard && runProps.instanceId">
      <run-process v-bind="runProps" />
    </b-card-body>
    <b-card-body v-else>
      <b-link @click="callProcess" class="d-flex align-items-end process-link">
        <i class="material-icons process-icon">{{ icon }}</i>
        <span>{{ name }}</span>
      </b-link>
      <small v-if="description" class="process-align d-inline-block">
        <div>{{ description }}</div>
      </small>
      <screen v-if="screenContent" :screen-content="screenContent" />
    </b-card-body>
  </b-card>
</template>

<script>
import RunProcess from "./RunProcess.vue";
import Screen from './Screen.vue';

export default {
  components: { RunProcess, Screen },
  props: {
    bpmn: String,
    instanceId: Number,
    processId: String,
    openLatest: Boolean,
    runInCard: Boolean,
    icon: { type: String, default: "play_circle" },
    name: String,
    description: String,
    screenContent: String,
  },
  data() {
    return {
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
};
</script>

<style>
.material-icons {
  font-size: inherit;
}
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
.process-align {
  margin-left: 0pt;
}
</style>
