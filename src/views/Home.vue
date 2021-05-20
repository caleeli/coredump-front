<template>
  <div class="home">
    <app-header />
    <div class="m-2 d-flex justify-content-center flex-wrap">
      <process-card
        v-for="(dashboard, index) in dashboards"
        :key="`dashboard-${index}`"
        class="m-1"
        :bpmn="dashboard.attributes.bpmn"
        :process-id="dashboard.attributes.process_id"
        :name="dashboard.attributes.name"
        :description="dashboard.attributes.description"
        :icon="dashboard.attributes.icon"
        :screen-content="dashboard.attributes.screen_content"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  mixins: [window.ResourceMixin],
  data() {
    return {
      dashboards: this.$api.dashboards.array(),
    };
  },
};
</script>
