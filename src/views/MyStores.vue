<template>
  <div>
    <v-row>
      <v-col> Boo </v-col>
    </v-row>
  </div>
</template>

<script>
let storesSample = [
  {
    id: "site_911168244534723229",
    site_title: "O-LAP",
    domain: "colourful-chocolates.square.site",
    is_published: true,
    created_at: "2021-07-09T01:48:17.000000Z",
    updated_at: "2021-07-09T01:59:23.000000Z"
  }
];

export default {
  data() {
    return {
      stores: storesSample
    };
  },
  async mounted() {
    let res = await this.$api.post(`/api/square/get-my-stores`);
    console.log(res.data);
  }
};
</script>

<style scoped>
</style>
