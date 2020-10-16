<template>
  <div>

    <v-app-bar app color="primary" dense dark>
        
      <v-btn text to="/">Bill and Mat</v-btn>
      <v-btn text to="/about">About</v-btn>

      <v-spacer></v-spacer>

      <span v-if="!$auth.loading">
        <v-btn text to="/profile" v-if="$auth.isAuthenticated">Profile</v-btn>
        <v-btn text @click="login" v-if="!$auth.isAuthenticated">Log in</v-btn>
        <v-btn text @click="logout" v-if="$auth.isAuthenticated">Log out</v-btn>
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