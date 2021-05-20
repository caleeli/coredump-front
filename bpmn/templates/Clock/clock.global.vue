<template>
  <div>
    <h4>
      {{ time }}
    </h4>
  </div>
</template>

<script>
export default {
  data() {
    return {
      interval: null,
      time: this.$dayjs().format("hh:mm:ss"),
    };
  },
  mounted() {
    this.interval = setInterval(() => {
      this.time = this.$dayjs().format("hh:mm:ss");
    }, 1000);
  },
  destroyed() {
    clearInterval(this.interval);
  },
};
</script>
