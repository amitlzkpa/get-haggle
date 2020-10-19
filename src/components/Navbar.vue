<template>
  <div>
    <v-app-bar
      color="primary"
      app
      dense
      dark
    >
      <router-link to="/">
        <v-toolbar-title class="white--text mr-2">
          Vue Starter
        </v-toolbar-title>
      </router-link>

      <v-spacer />

      <span v-if="!$auth.loading">
        <v-btn
          v-if="!$auth.isAuthenticated"
          text
          @click="login"
        >
          log in
        </v-btn>

        <v-menu
          v-else
          offset-y
        >
          <template v-slot:activator="{ on, attrs }">
            <v-avatar size="36">
              <img
                :src="$auth.auth0User.picture"
                :alt="$auth.auth0User.nickname"
                v-bind="attrs"
                v-on="on"
              >
            </v-avatar>
          </template>
          <v-list>
            <v-list-item>
              <v-btn
                text
                to="/dashboard"
              >
                dashboard
              </v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn
                text
                to="/profile"
              >
                profile
              </v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn
                text
                @click="logout"
              >
                log out
              </v-btn>
            </v-list-item>
          </v-list>
        </v-menu>

      </span>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
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
}
</script>

<style>

</style>