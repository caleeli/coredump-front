<template>
  <div class="home">
    <app-header />
    <div class="m-2 card-deck">
      <process-card bpmn="cartera.bpmn" process-id="PROCESS_1" open-latest />

      <b-card header="Default" class="text-center">
        <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
      </b-card>

      <b-card header="Default" class="text-center">
        <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
      </b-card>

      <b-card header="Default" class="text-center">
        <b-card-text>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text>
      </b-card>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
}
</script>
