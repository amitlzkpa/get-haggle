<template>
  <div>
    <div class="d-flex justify-center">
      <div style="width: 320px" class="mr-8">
        <v-img src="/imgs/square-logo.svg" />
      </div>

      <div v-if="hasSquareLinked" class="d-flex flex-column justify-center">
        <h3>Connected!</h3>
        <span :class="tokenHasExpired ? 'red--text' : ''">
          {{ tokenHasExpired ? "Token expired:" : "Token expires:" }}
          {{
            moment($auth.dbUser.squareToken.expires_at).format("MMMM Do YYYY")
          }}
        </span>
        <a
          style="text-decoration: none"
          class="blue--text"
          :href="sqTokenOAuthURL"
          target="_blank"
        >
          Click here to renew
        </a>
      </div>

      <div v-else class="d-flex flex-column justify-center">
        <h3>Connect with Square to sync your stores!</h3>
        <a
          style="text-decoration: none"
          class="blue--text"
          :href="sqTokenOAuthURL"
          target="_blank"
        >
          Click here to connect
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    hasSquareLinked() {
      return (
        !!this.$auth.dbUser &&
        !!this.$auth.dbUser.squareToken &&
        JSON.stringify(this.$auth.dbUser.squareToken, null, 2) !== "{}"
      );
    },
    tokenHasExpired() {
      return this.moment(this.$auth.dbUser.squareToken.expires_at).isBefore();
    },
    sqTokenOAuthURL() {
      return `https://connect.${this.env.SQUARE_API_ENDPT}.com/oauth2/authorize?client_id=${this.env.SQUARE_CLIENT_ID}&scope=MERCHANT_PROFILE_READ+ONLINE_STORE_SITE_READ+ITEMS_READ+ITEMS_WRITE+ITEMS_WRITE+INVENTORY_READ+INVENTORY_WRITE+ONLINE_STORE_SNIPPETS_READ+ONLINE_STORE_SNIPPETS_WRITE`;
    }
  },
  async mounted() {
    if (!this.$route.query.code) return;
    let postData = {
      authCode: this.$route.query.code
    };
    let res = await this.$api.post("/api/square/connect", postData);
    this.$auth.dbUser = res.data;
    window.history.replaceState(null, null, window.location.pathname);
  }
};
</script>

<style>
</style>