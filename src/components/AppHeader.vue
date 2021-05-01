<template>
  <b-navbar toggleable="md" type="dark" variant="info">
    <b-navbar-brand>Cartera</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown
          v-for="(item, index) in menu"
          :key="`item-${index}`"
          menu-class="bg-info nav-dropdown"
          right
        >
          <template #button-content>
            <span v-if="item.icon" class="material-icons">{{ item.icon }}</span>
            {{ item.name }}
          </template>
          <b-dropdown-item
            v-for="(submenu, i) in item.items"
            :key="`submenu-${i}`"
          >
            <span v-if="submenu.icon" class="material-icons">{{ submenu.icon }}</span>
            {{ submenu.name }}
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
