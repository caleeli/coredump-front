<template>
  <screen v-if="token" :token="token" :instance="instance"></screen>
</template>

<script>
import Screen from "./Screen.vue";

export default {
  components: { Screen },
  props: {
    bpmn: String,
    instanceId: Number,
    processId: String,
    openLatest: Boolean,
    runInCard: Boolean,
  },
  computed: {
    token() {
      const token = this.instance.relationships.active_tokens[0];
      if(token && token.attributes) {
        this.$emit("loadToken", token);
      }
      return token;
    },
  },
  data() {
    return {
      process: {
        name: "",
      },
      instance: {
        id: null,
        data: {
          attributes: {
            data: {},
          },
        },
        relationships: {
          active_tokens: [],
        },
      },
    };
  },
  methods: {
    updateInstance() {
      this.loadInstance(this.instance.id);
    },
    completedInstance() {
      if (this.runInCard) {
        this.loadInstance(this.instance.id);
      } else {
        this.$router.push({ name: "home" });
      }
    },
    setInstance(instance) {
      this.$removeOwnerListeners(this);
      this.instance = instance;
      this.$listenInstanceEvent(
        instance,
        ".ActivityActivated",
        this,
        "updateInstance"
      );
      this.$listenInstanceEvent(
        instance,
        ".ProcessInstanceCompleted",
        this,
        "completedInstance"
      );
      this.$emit("loadInstance", this.instance);
    },
    callProcess() {
      this.$router.push({
        name: "open",
        params: { bpmn: this.bpmn, processId: this.processId },
      });
      this.$callProcess(this.bpmn, this.processId).then((instance) => {
        this.loadInstance(instance.id);
      });
    },
    loadInstance(instanceId) {
      this.$instance(instanceId, { include: "active_tokens" }).then(
        (instance) => {
          this.setInstance(instance);
        }
      );
    },
  },
  mounted() {
    if (this.instanceId) {
      this.loadInstance(this.instanceId);
    } else if (this.openLatest) {
      this.$findInstances({
        include: "active_tokens,active_tokens",
        filter: [
          "whereUserLogged",
          `where,definitions,${JSON.stringify(this.bpmn)}`,
        ],
        per_page: 1,
        sort: "-id",
      }).then((instances) => {
        if (instances.data.length > 0) {
          this.setInstance(instances.data[0]);
        }
      });
    }
    if (this.bpmn && this.processId) {
      this.$process(this.bpmn, this.processId).then((process) => {
        this.process = process;
      });
    }
  },
  destroyed() {
    this.$removeOwnerListeners(this);
  },
};
</script>

<style>
</style>
