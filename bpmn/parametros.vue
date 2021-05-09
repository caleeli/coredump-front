<template>
  <b-form
    @submit.prevent="$completeTask(token, form)"
  >
    <b-form-group label="Prestamo:">
      <b-form-input
        v-model="form.prestamo"
        type="number"
        placeholder="0.00"
        required
      ></b-form-input>
    </b-form-group>

    <b-form-group label="Modalidad de cuotas:">
      <b-form-select
        v-model="form.modalidad_cuotas"
        required
        :options="['iguales/mensual']"
      ></b-form-select>
    </b-form-group>
    <b-button type="submit" variant="primary">Guardar</b-button>
  </b-form>
</template>

<script>
export default {
  props: {
    token: Object,
    prestamo: { default: 100 },
    modalidad_cuotas: { default: "" },
  },
  data() {
    return {
      form: {
        prestamo: this.prestamo,
        modalidad_cuotas: this.modalidad_cuotas,
      },
    };
  },
};
</script>
