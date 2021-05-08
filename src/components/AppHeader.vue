<template>
  <b-navbar toggleable="md" type="dark" variant="info">
    <b-navbar-brand>Cartera</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown
          v-for="(item, index) in menu"
          :key="`item-${index}`"
          no-caret
          menu-class="bg-info nav-dropdown"
          right
        >
          <template #button-content>
            <div class="d-flex align-items-center">
              <span v-if="item.icon" class="material-icons">{{ item.icon }}</span>
              {{ item.name }}
            </div>
          </template>
          <b-dropdown-item
            v-for="(submenu, i) in item.items"
            :key="`submenu-${i}`"
          >
            <div class="d-flex align-items-center">
              <span v-if="submenu.icon" class="material-icons">{{ submenu.icon }}</span>
              {{ submenu.name }}
            </div>
          </b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown
          menu-class="bg-info nav-dropdown"
          no-caret
          right
        >
          <template #button-content>
            <b-avatar variant="info" src="https://placekitten.com/300/300" class="mt-n2"></b-avatar>
          </template>
          <b-dropdown-item @click="$callProcess('EditAccount')">
            <div class="d-flex align-items-center">
              <span class="material-icons">edit</span> {{__('Edit account')}}
            </div>
          </b-dropdown-item>
          <b-dropdown-item @click="$complete($sessionToken, {})">
            <div class="d-flex align-items-center">
              <span class="material-icons">logout</span> {{__('Logout')}}
            </div>
          </b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  props: {
    menu: Array,
  }
};
</script>

<style>
.nav-link {
  color: white!important;
}
.nav-dropdown {
  border: none!important;
}
.nav-dropdown .dropdown-item {
  color: white!important;
}
.nav-dropdown .dropdown-item:hover {
  color: black!important;
}
</style>
