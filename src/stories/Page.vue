<template>
  <article>

  </article>
</template>

<script>
import './page.css';

export default {
  name: 'my-page',

  components: { },

  props: {
    user: {
      type: Object,
    },
  },

  methods: {
    onLogin() {
      this.$emit('onLogin');
    },
    onLogout() {
      this.$emit('onLogout');
    },
    onCreateAccount() {
      this.$emit('onCreateAccount');
    },
  },
};
</script>
