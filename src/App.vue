<template>
  <div id="app">
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
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

<style>
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  height: 100vh;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
}
input {
  filter: none;
}
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}
.fade-leave-to {
  width: 100%;
  height: 100%;
  position: absolute;
}
.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
