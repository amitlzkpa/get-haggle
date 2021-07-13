<template>
  <div class="d-flex py-4">
    <a
      v-if="!hasSquareLinked"
      :href="`https://connect.squareup.com/oauth2/authorize?client_id=${env.SQUARE_CLIENT_ID}&scope=MERCHANT_PROFILE_READ+ONLINE_STORE_SITE_READ+ITEMS_READ+ITEMS_WRITE+ITEMS_WRITE+INVENTORY_READ+INVENTORY_WRITE+ONLINE_STORE_SNIPPETS_READ+ONLINE_STORE_SNIPPETS_WRITE&state=${randomStateCode}`"
      target="_blank"
    >
      <v-img height="60" width="240" class="ma-2" src="/imgs/square-logo.svg" />
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
function genRandStr() {
  return (
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15)
  );
}

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    let date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

export default {
  computed: {
    hasSquareLinked() {
      return (
        !!this.$auth.dbUser &&
        !!this.$auth.dbUser.squareToken &&
        JSON.stringify(this.$auth.dbUser.squareToken, null, 2) !== "{}"
      );
    },
    randomStateCode() {
      let state = genRandStr();
      setCookie("Auth_State", state, 1);
      return state;
    }
  },
  async mounted() {
    if (!this.$route.query.code) return;
    let postData = {
      authCode: this.$route.query.code
    };
    let res = await this.$api.post("/api/users/connect-square", postData);
    this.$auth.dbUser = res.data;
    window.history.replaceState(null, null, window.location.pathname);
  }
};
</script>

<style>
</style>