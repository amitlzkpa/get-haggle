<template>
  <div>
    <v-app-bar app color="primary" dense dark>
      <v-btn text to="/">vuestarter</v-btn>
      <v-btn text to="/about">about</v-btn>

      <v-spacer></v-spacer>

      <span v-if="!$auth.loading">
        <v-btn text to="/project/new" v-if="$auth.isAuthenticated">new project</v-btn>
        <v-btn text to="/profile" v-if="$auth.isAuthenticated">profile</v-btn>
        <v-btn text @click="login" v-if="!$auth.isAuthenticated">log in</v-btn>
        <v-btn text @click="logout" v-if="$auth.isAuthenticated">log out</v-btn>
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