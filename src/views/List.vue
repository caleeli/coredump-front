<template>
  <div class="overflow-auto h-100">
    <app-header />
    <b-breadcrumb :items="breadcrumb"></b-breadcrumb>
    <b-button-toolbar
      key-nav
      aria-label="toolbar"
      class="bg-white p-3 border-bottom justify-content-end"
    >
      <b-button-group class="mx-1" size="sm">
        <b-button
          variant="light"
          @click="refresh"
        >
          <i class="fas fa-sync"></i>
          {{ __("Refresh") }}
        </b-button>
        <b-button variant="secondary" :to="{name:'home'}">{{
          __("Back")
        }}</b-button>
      </b-button-group>
    </b-button-toolbar>
    <b-table :items="items" :fields="fields">
      <template #cell(status)="{ item: instance }">
        <b-badge
          v-for="token in instance.relationships.active_tokens"
          :key="`status-${token.id}`"
        >
          {{ token.attributes.name }}
        </b-badge>
      </template>
      <template #cell(actions)="{ item: instance, index }">
        <b-link @click="openInstance(instance)">
          <i class="fas fa-folder-open"></i>
          {{ __("Open") }}
        </b-link>
        <b-link
          v-for="(action, actionIndex) in instance.relationships.actions"
          :key="`action-${index}-${actionIndex}`"
          class="mr-1"
          @click="doAction(instance, action)"
        >
          <i :class="actionIcon(action)"></i>
          {{ actionText(action) }}
        </b-link>
        <b-link @click="killInstance(instance)">
          <i class="fas fa-skull-crossbones"></i>
          {{ __("Kill") }}
        </b-link>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  mixins: [window.ResourceMixin],
  data() {
    const apiOptions = {
      filter: [
        "where,status,ACTIVE",
        `where,definitions,${this.$route.params.bpmn}`,
      ],
      include: "actions,active_tokens",
    };
    return {
      breadcrumb: [
        {
          text: this.__("Home"),
          to: { name: "home" },
        },
        {
          text: this.__(this.$route.params.bpmn),
          to: {
            name: "list",
            params: {
              bpmn: this.$route.params.bpmn,
            },
          },
        },
      ],
      apiOptions,
      items: this.$api.process_instance.array(apiOptions),
      fields: [
        {
          key: "attributes.name",
          label: this.__("Module"),
        },
        {
          key: "status",
          field: "relationships.active_tokens",
          label: this.__("Status"),
        },
        {
          key: "actions",
          field: "relationships.actions",
          label: this.__("Actions"),
        },
      ],
    };
  },
  methods: {
    killInstance(instance) {
      this.$cancelInstance(instance).then(() => {
        setTimeout(() => {
          this.refresh();
        }, 1000);
      });
    },
    openInstance(instance) {
      this.$router.push({
        name: "open",
        params: {
          bpmn: instance.attributes.definitions,
          processId: instance.attributes.process,
          instanceId: instance.id,
        },
      });
    },
    doAction(instance, action) {
      this.$sendMessage(
        instance,
        action.attributes.element,
        action.attributes.event,
        {}
      ).then(() => {
        setTimeout(() => {
          this.refresh();
        }, 1000);
      });
    },
    refresh() {
      this.items.splice(0);
      this.apiOptions.t = new Date().getTime();
      this.$api.process_instance.refresh(this.items, this.apiOptions);
    },
    actionIcon(action) {
      const match = action.attributes.name.match(/\(([^)]+)\)/);
      if (match[1]) {
        return match[1];
      }
      return "d-none";
    },
    actionText(action) {
      return action.attributes.name.replace(/\(([^)]+)\)/, "");
    },
  },
};
</script>

<style>
</style>
