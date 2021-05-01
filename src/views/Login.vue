<template>
  <div class="d-flex justify-content-center h-100">
    <b-card
      border-variant="primary"
      class="align-self-center"
      :img-src="LoginBanner"
      img-alt="Card image"
      img-top
    >
      <b-form @submit.prevent="$complete(form)">
        <b-form-group :label="__('User')">
          <b-form-input
            v-model="form.username"
            :placeholder="__('Usuario')"
            required
            autofocus
          ></b-form-input>
        </b-form-group>

        <b-form-group :label="__('Password')">
          <b-form-input
            v-model="form.password"
            :placeholder="__('Password')"
            type="password"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group>
          <b-form-checkbox v-model="form.remember">{{ __('Remember me') }}</b-form-checkbox>
        </b-form-group>

        <div class="text-center">
          <b-button type="submit" variant="primary">{{ __('Login') }}</b-button>
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import LoginBanner from "../assets/login-banner.jpg";

export default {
  name: "Login",
  data() {
    return {
      LoginBanner,
      form: {
        username: "",
        password: "",
        remember: false,
      },
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
