<template>
  <div class="home">
    <app-header />
    <run-process bpmn="cartera.bpmn" process-id="PROCESS_1" open-latest/>
  </div>
</template>

<script>

export default {
  name: 'Home',
}
</script>
