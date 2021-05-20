import { task } from '@processmaker/modeler';

window.ProcessMaker.EventBus.$on('modeler-init', ({ registerInspectorExtension }) => {
  task.definition = (moddle, $t) => {
    return moddle.create('bpmn:UserTask', {
      name: $t("Tarea"),
    });
  };
  /* Add custom properties to inspector */
  registerInspectorExtension(task, {
    id: 'screen-implementation',
    component: 'FormInput',
    config: {
      label: 'Screen Implementation',
      name: 'implementation',
      //placeholder: './screen.vue',
      helper: 'Enter the screen file used in this task',
    },
  });
});

