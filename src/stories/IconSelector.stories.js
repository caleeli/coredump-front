import '../bootstrap'

export default {
  title: 'Example/IconSelector',
  component: 'IconSelector',
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: '<icon-selector v-model="value" :placeholder="placeholder" />',
});

export const Simple = Template.bind({});
Simple.args = {
  placeholder: "icon placeholder"
};


export const Selected = Template.bind({});
Selected.args = {
  value: "favorite",
};
