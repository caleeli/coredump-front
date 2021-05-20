import Vue from 'vue'
import ProcessDiagramA from './ProcessDiagram.vue';
import { registerNodes } from '@processmaker/modeler';
import ScreenBuilder from '@processmaker/screen-builder';

// Boot ScreenBuilder
Vue.use(ScreenBuilder);

Vue.mixin({
  beforeMount () {
    if (this.$options._componentTag === 'modeler') {
      this.nodes.splice(0);
    }
  },
});

// Boot ProcessMaker base
window.ProcessMaker = {
  navbar: {
    alerts: [],
  },
  EventBus: new Vue(),
  apiClient: window.axios,
  alert(msg, variant, showValue = 60, stayNextScreen = false) {
    if (showValue === 0) {
      showValue = true;
    }

    window.ProcessMaker.navbar.alerts.push({
      alertText: msg,
      alertShow: showValue,
      alertVariant: String(variant),
      stayNextScreen,
    });

    window.ProcessMaker.EventBus.$emit('alert', window.ProcessMaker.navbar.alerts);
  },
  modeler: {
    process: {
      id: 1,
    },
  },
};

// Init task inspector
require('./task.js');
require('./script.js');

window.ProcessMaker.EventBus.$on('modeler-init', registerNodes);
// window.ProcessMaker.EventBus.$on('modeler-start', ({ loadXML }) => {});

// EXPORT
export const ProcessDiagram = ProcessDiagramA;

export default {
  install(Vue) {
    Vue.component('ProcessDiagram', ProcessDiagram);
  },
}
