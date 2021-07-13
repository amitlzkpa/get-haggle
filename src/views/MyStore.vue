<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col>
          <v-card outlined tile class="pa-8">
            <div class="d-flex">
              <div class="flex-grow-1">
                <span class="display-1 font-weight-light">{{
                  storeInfo.site_title
                }}</span>
                <br />
                <a
                  target="_blank"
                  :href="`https://${storeInfo.domain}`"
                  class="text-decoration-none"
                  style="font-family: Consolas"
                  >{{ `https://${storeInfo.domain}` }}</a
                >
                <br />
                <span style="font-size: 12px" class="text--grey font-italic"
                  >Created {{ moment(storeInfo.created_at).fromNow() }}</span
                >
              </div>
              <div class="pt-6" style="cursor: pointer">
                <v-icon
                  large
                  :color="storeInfo.isLinkedToHaggle ? 'grey' : '#eb5600'"
                >
                  {{
                    storeInfo.isLinkedToHaggle ? "mdi-check" : "mdi-plus-thick"
                  }}
                </v-icon>
                <v-icon
                  to="!#"
                  large
                  :color="storeInfo.isLinkedToHaggle ? 'grey' : '#eb5600'"
                >
                  mdi-account-group
                </v-icon>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
let storeInfoSample = {
  id: "site_829240995758856365",
  site_title: "Colourful Chocolates",
  domain: "colourful-chocolates.square.site",
  is_published: true,
  created_at: "2021-07-09T01:48:17.000000Z",
  updated_at: "2021-07-13T02:31:06.000000Z",
  isLinkedToHaggle: true
};

export default {
  data() {
    return {
      storeInfo: storeInfoSample
    };
  },
  async mounted() {
    console.log(this.$route.params.site_id);
    // let res = await this.$api.post(`/api/square/get-my-stores`);
    // console.log(res.data);
  }
};
</script>

<style scoped>
</style>
