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
          label="Nombre del módulo"
          label-for="name"
          description="Nombre del módulo"
        >
          <b-form-input
            id="name"
            v-model="form.name"
            type="text"
            required
            placeholder="nombre del módulo"
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
            placeholder="Descripción del módulo"
          />
        </b-form-group>
        <b-form-group
          id="group-icon"
          label="Icono"
          label-for="icon"
          description="Icono que se mostrará a la izquierda del nombre de módulo"
        >
          <icon-selector
            id="icon"
            v-model="form.icon"
            placeholder="icon name"
          />
        </b-form-group>
        <b-form-group
          id="group-name"
          label="Role"
          label-for="role"
          description="Elija un rol que defina los permisos de su módulo."
        >
          <b-form-input
            id="role"
            v-model="form.role"
            type="text"
            required
            placeholder="role"
            list="roles-datalist" 
          />
        <datalist id="roles-datalist">
          <option v-for="role in roles" :key="`role-${role}`">{{ role }}</option>
        </datalist>
        </b-form-group>
        <b-form-group label="Plantilla base">
          <div class="d-flex">
            <b-card
              v-for="(template, index) in templates"
              :key="`template-${index}`"
              class="mr-2"
              align="center"
              :bg-variant="form.template === template.main ? 'light' : ''"
            >
              <b-form-radio
                name="template"
                v-model="form.template"
                :value="template.main"
              >
                <img :src="template.svg" height="46px" /><br />
                {{ template.name }}
              </b-form-radio>
            </b-card>
          </div>
        </b-form-group>
        <div class="text-right">
          <b-button variant="secondary" @click="$cancelInstance(instance)">Cancelar</b-button>
          <b-button variant="primary" type="submit">Crear Módulo</b-button>
        </div>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
export default {
  mixins: [window.ResourceMixin],
  props: {
    instance: Object,
    token: Object,
    templates: Array,
  },
  data() {
    return {
      roles: ['admin', 'user'],
      form: {
        name: "",
        description: "",
        icon: "api",
        template: "Hello World/hello.global.vue",
        role: "user",
      },
    };
  },
};
</script>

<style>
</style>
