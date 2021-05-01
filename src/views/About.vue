<template>
  <div>
    <div>
      <b-navbar toggleable="md" type="dark" variant="info">
        <b-navbar-brand>Cartera</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">

            <b-nav-item-dropdown text="Accounts" right>
              <b-dropdown-item href="#">Edit Account Titles</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown text="Transactions" right>
              <b-dropdown-item href="#">1. --------------------</b-dropdown-item>
              <b-dropdown-item href="#">2. --------------------</b-dropdown-item>
              <b-dropdown-item href="#">3. --------------------</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown text="Reports" right>
              <b-dropdown-item href="#">1. Net Worth Report</b-dropdown-item>
              <b-dropdown-item href="#">2. --------------------</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
  </div>
</template>
