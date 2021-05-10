import '../bootstrap'

export default {
  title: 'Example/Grid',
  component: 'AppGrid',
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<app-grid v-model="data" />',
  data() {
    return {
      data: [],
    };
  },
});

export const Simple = Template.bind({});
Simple.args = {
};
