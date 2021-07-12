<template>
  <div>
    <v-app-bar color="primary" app dense dark>
      <router-link to="/">
        <v-toolbar-title class="white--text mr-2"> Haggle </v-toolbar-title>
      </router-link>

      <v-spacer />

      <span v-if="!$auth.loading">
        <v-btn v-if="!$auth.isAuthenticated" text @click="login">
          log in
        </v-btn>

        <v-menu v-else offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-avatar size="36">
              <img
                :src="$auth.auth0User.picture"
                :alt="$auth.auth0User.nickname"
                v-bind="attrs"
                v-on="on"
              />
            </v-avatar>
          </template>
          <v-list>
            <v-list-item :to="`/profile/edit/${$auth.dbUser._id}`">
              {{ $auth.dbUser.name }}
            </v-list-item>
            <v-list-item to="/dashboard">
              <v-list-item-title> Dashboard </v-list-item-title>
            </v-list-item>
            <v-list-item @click="logout">
              <v-list-item-title> Logout </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </span>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  methods: {
    login() {
      this.$auth.loginWithRedirect();
    },
    logout() {
      this.$auth.logout({
        returnTo: window.location.origin
      });
    }
  }
};
</script>

<style>
</style>