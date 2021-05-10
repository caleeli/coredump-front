<template>
  <div>
    <app-grid v-model="cuadro" :rows="4" :cols="5" />
    <input >
  </div>
</template>

<script>
export default {
  data() {
    return {
      cuadro: [
        ["", "Tesla", "Volvo", "Toyota", "Ford"],
        ["2019", 10, 11, 12, 13],
        ["2020", 20, 11, 14, 13],
        ["2021", 30, 15, 12, 13],
      ],
    };
  },
};
</script>

<style>
</style>