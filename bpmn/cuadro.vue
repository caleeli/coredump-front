<template>
  <div>
    <app-grid v-model="cuadro" :rows="13" :cols="3" :cell-class="cellClass" />
    <b-button @click="$completeTask(token, {})">Completar</b-button>
  </div>
</template>

<script>
export default {
  props: {
    token: Object,
    prestamo: { default: 100 },
    modalidad_cuotas: { default: "" },
  },
  data() {
    const cuadro = [];
    let capital = this.prestamo;
    let mensual = capital * 0.07;
    cuadro.push(["", "Capital", "Mensual"]);
    //
    cuadro.push([
      "Enero",
      this.formatNumber(capital),
      this.formatNumber(mensual),
    ]);
    capital = capital + mensual;
    mensual = capital * 0.07;
    //
    cuadro.push([
      "Febrero",
      this.formatNumber(capital),
      this.formatNumber(mensual),
    ]);
    capital = capital + mensual;
    mensual = capital * 0.07;
    //
    cuadro.push([
      "Marzo",
      this.formatNumber(capital),
      this.formatNumber(mensual),
    ]);
    capital = capital + mensual;
    mensual = capital * 0.07;
    //
    cuadro.push([
      "Abril",
      this.formatNumber(capital),
      this.formatNumber(mensual),
    ]);
    capital = capital + mensual;
    mensual = capital * 0.07;
    //
    cuadro.push([
      "Mayo",
      this.formatNumber(capital),
      this.formatNumber(mensual),
    ]);
    capital = capital + mensual;
    mensual = capital * 0.07;
    //
    cuadro.push([
      "Junio",
      this.formatNumber(capital),
      this.formatNumber(mensual),
    ]);
    capital = capital + mensual;
    mensual = capital * 0.07;
    //
    cuadro.push([
      "Julio",
      this.formatNumber(capital),
      this.formatNumber(mensual),
    ]);
    capital = capital + mensual;
    mensual = capital * 0.07;
    //
    cuadro.push([
      "Agosto",
      this.formatNumber(capital),
      this.formatNumber(mensual),
    ]);
    capital = capital + mensual;
    mensual = capital * 0.07;
    //
    cuadro.push([
      "Septiembre",
      this.formatNumber(capital),
      this.formatNumber(mensual),
    ]);
    capital = capital + mensual;
    mensual = capital * 0.07;
    //
    cuadro.push([
      "Octubre",
      this.formatNumber(capital),
      this.formatNumber(mensual),
    ]);
    capital = capital + mensual;
    mensual = capital * 0.07;
    //
    cuadro.push([
      "Noviembre",
      this.formatNumber(capital),
      this.formatNumber(mensual),
    ]);
    capital = capital + mensual;
    mensual = capital * 0.07;
    //
    cuadro.push([
      "Diciembre",
      this.formatNumber(capital),
      this.formatNumber(mensual),
    ]);
    capital = capital + mensual;
    mensual = capital * 0.07;
    return {
      cuadro: cuadro,
      cellClass: {
        B: "text-right",
        C: "text-right",
        B1: "font-weight-bold",
        C1: "font-weight-bold",
      },
    };
  },
  methods: {
    formatNumber(number) {
      return number.toLocaleString(
        undefined,
        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
      );
    },
  },
};
</script>

<style>
</style>