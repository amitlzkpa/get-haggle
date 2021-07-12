<template>
  <div class="d-flex py-4">
    <a
      v-if="!hasSquareLinked"
      :href="`https://connect.squareupsandbox.com/oauth2/authorize?client_id=${env.SQUARE_CLIENT_ID}&scope=MERCHANT_PROFILE_READ+ONLINE_STORE_SITE_READ+ONLINE_STORE_SNIPPETS_READ+ONLINE_STORE_SNIPPETS_WRITE%state=foo`"
      target="_blank"
    >
      <v-img
        max-height="200"
        max-width="400"
        class="ma-2"
        src="/imgs/img.png"
      />
    </a>

    <div class="flex-grow-1 pt-4 ml-4">
      <div v-if="!hasSquareLinked">
        <h4>Connect with Square to sync your stores</h4>
        <p>Click on the logo to get started.</p>
      </div>
      <div v-else>
        <h4 class="mb-4">Square account connected!</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    hasSquareLinked() {
      return false;
    }
  },
  async mounted() {
    if (this.$route.query.state !== "foo") return;
    let postData = {
      authCode: this.$route.query.code,
      redirectUri: `https://get-haggle.herokuapp.com/oauth-redirect`
    };
    let res = await this.$api.post("/api/users/connect-square", postData);
    // this.$auth.dbUser = res.data;
    console.log(res.data);
    // window.history.replaceState(null, null, window.location.pathname);
  }
};
</script>

<style>
</style>