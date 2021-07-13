<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col>
          <div
            v-for="store of stores"
            :key="store.id"
            class="my-1"
            :href="`/my-store/${store.id}`"
          >
            <v-card outlined tile class="pa-8">
              <span class="display-1 font-weight-light">{{
                store.site_title
              }}</span>
              <br />
              <a
                target="_blank"
                :href="`https://${store.domain}`"
                class="text-decoration-none"
                style="font-family: Consolas"
                >{{ `https://${store.domain}` }}</a
              >
              <br />
              <span style="font-size: 12px" class="text--grey font-italic"
                >Created {{ moment(store.created_at).fromNow() }}</span
              >
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
let storesSample = [
  {
    id: "site_942725068125726254",
    site_title: "Cupcake Foundry",
    domain: "cupcake-foundry.square.site",
    is_published: true,
    created_at: "2021-07-13T02:25:22.000000Z",
    updated_at: "2021-07-13T02:26:47.000000Z"
  },
  {
    id: "site_829240995758856365",
    site_title: "Colourful Chocolates",
    domain: "colourful-chocolates.square.site",
    is_published: true,
    created_at: "2021-07-09T01:48:17.000000Z",
    updated_at: "2021-07-13T02:31:06.000000Z"
  }
];

export default {
  data() {
    return {
      stores: storesSample
    };
  },
  async mounted() {
    // let res = await this.$api.post(`/api/square/get-my-stores`);
    // console.log(res.data);
  }
};
</script>

<style scoped>
</style>
