import '../bootstrap'
import AppHeader from '../components/AppHeader';

export default {
  title: 'Example/Header',
  component: AppHeader,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AppHeader },
  template:
    '<app-header :menu="menu" />',
});

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  menu: [
    {
      name: "Accounts",
      icon: "account_balance",
      items: [
        {name:"Edit account titles"},
      ],
    },
    {
      name: "Transactions",
      icon: "receipt_long",
      items: [
        {name:"1. --------------"},
        {name:"2. --------------"},
        {name:"3. --------------"},
      ],
    },
    {
      name: "Reports",
      icon: "print",
      items: [
        {name:"Net Worth Report"},
        {name:"1. --------------"},
        {name:"2. --------------"},
        {name:"3. --------------"},
      ],
    },
  ],
};
