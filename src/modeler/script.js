import { scriptTask } from '@processmaker/modeler';
import ScriptButton from './ScriptButton.vue';

window.ProcessMaker.EventBus.$on('modeler-init', ({ registerInspectorExtension }) => {

  /* Add custom properties to inspector */
  registerInspectorExtension(scriptTask, {
    id: 'script-type',
    component: 'FormSelect',
    config: {
      name: 'scriptFormat',
      label: 'Script type',
      helper: 'Script type format',
      options: [
        { value: 'application/x-php', content: 'php' },
      ],
    },
  });
  registerInspectorExtension(scriptTask, {
    id: 'script-code',
    component: ScriptButton,
    config: {
      name: 'script',
    },
  });
});
