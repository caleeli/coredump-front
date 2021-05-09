<template>
  <b-card>
    <b-card-body>
      <h3>
        <b-link @click="callProcess">
          <span class="material-icons">play_circle</span>
          {{ process.name }}
        </b-link>
      </h3>
    </b-card-body>
    <b-card-body v-if="token">
      <screen :token="token" :instance="instance"></screen>
    </b-card-body>
  </b-card>
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
  },
  computed: {
    token() {
      return this.instance.relationships.active_tokens[0];
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
    callProcess() {
      this.$callProcess(this.bpmn, this.processId).then((instance) => {
        console.log(instance);
      });
    },
  },
  mounted() {
    if (this.instanceId) {
      this.$instance(this.instanceId, { include: "active_tokens" })
        .catch(() => {
          return this.$callProcess(this.bpmn, this.processId);
        })
        .then((instance) => {
          this.instance = instance;
        });
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
        this.instance = instances.data[0];
      });
    }
    if (this.bpmn && this.processId) {
      this.$process(this.bpmn, this.processId).then((process) => {
        this.process = process;
      });
    }
  },
};
</script>

<style>
</style>
