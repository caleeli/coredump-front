<template>
  <b-row>
    <b-col cols="*" lg="4">
      <process-card
        :name="form.name"
        :icon="form.icon"
        :description="form.description"
      />
    </b-col>
    <b-col cols="*" lg="8">
      <b-form @submit.prevent="$completeTask(token, form)">
        <b-form-group
          id="group-name"
          label="Nombre del proceso"
          label-for="name"
          description="Nombre del proceso"
        >
          <b-form-input
            id="name"
            v-model="form.name"
            type="text"
            required
            placeholder="nombre del proceso"
          />
        </b-form-group>
        <b-form-group
          id="group-description"
          label="Descripción"
          label-for="description"
          description="Descripción"
        >
          <b-form-textarea
            id="description"
            v-model="form.description"
            type="text"
            placeholder="Descripción del proceso"
          />
        </b-form-group>
        <b-form-group
          id="group-icon"
          label="Icono"
          label-for="icon"
          description="Icono que se mostrará a la izquierda del nombre de proceso"
        >
          <icon-selector
            id="icon"
            v-model="form.icon"
            placeholder="icon name"
          />
        </b-form-group>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        description: "",
        icon: "api",
      },
    };
  },
};
</script>

<style>
</style>
