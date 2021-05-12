<template>
  <div id="app">
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
import './app.css';

export default {
  mounted() {
    this.$listen("router", ({path}) => {
      if (this.$router.currentRoute.path !== path) {
        this.$router.push(path)
      }
    })
  },
}
</script>
