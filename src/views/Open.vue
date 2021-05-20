<template>
  <div class="overflow-auto h-100">
    <app-header />
    <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
    <run-process v-bind="runProps" class="m-2" @loadToken="loadToken" @loadInstance="loadInstance" />
  </div>
</template>

<script>
import RunProcess from "../components/RunProcess.vue";
export default {
  components: { RunProcess },
  data() {
    return {
      breadcrumb: [
        {
          text: this.__("Home"),
          to: { name: "home" },
        },
        {
          text: "Open",
          to: {
            name: "open",
            params: {
              instanceId: parseInt(this.$route.params.instanceId),
            },
          },
        },
        {
          text: "...",
          to: {
            name: "open",
            params: {
              instanceId: parseInt(this.$route.params.instanceId),
              tokenId: parseInt(this.$route.params.tokenId),
            },
          },
        },
      ],
      runProps: {
        bpmn: this.$route.params.bpmn,
        processId: this.$route.params.processId,
        instanceId: parseInt(this.$route.params.instanceId),
        openLatest: this.$route.params.openLatest,
        runInCard: false,
      },
    };
  },
  methods: {
    loadInstance(instance) {
      this.breadcrumb[1].text = instance.attributes.name;
    },
    loadToken(token) {
      this.breadcrumb[2].text = token.attributes.name;
    },
  },
};
</script>

<style>
</style>
