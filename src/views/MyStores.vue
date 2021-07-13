<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col>
          <div v-for="store of stores" :key="store.id" class="my-1">
            <v-card outlined tile class="pa-8">
              <div class="d-flex">
                <div class="flex-grow-1">
                  <span class="display-1 font-weight-light">
                    <a
                      :href="`/my-store/${store.id}`"
                      class="text-decoration-none"
                    >
                      {{ store.site_title }}
                    </a>
                  </span>
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
                </div>
                <div class="pt-6">
                  <v-icon
                    large
                    :color="store.linkedSnippet ? 'grey' : '#eb5600'"
                  >
                    {{ store.linkedSnippet ? "mdi-check" : "mdi-plus-thick" }}
                  </v-icon>
                  <v-icon
                    @click="addSnippetToStore(store)"
                    large
                    :color="store.linkedSnippet ? 'grey' : '#eb5600'"
                  >
                    mdi-account-group
                  </v-icon>
                </div>
              </div>
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
    updated_at: "2021-07-13T02:26:47.000000Z",
    linkedSnippet: false
  },
  {
    id: "site_829240995758856365",
    site_title: "Colourful Chocolates",
    domain: "colourful-chocolates.square.site",
    is_published: true,
    created_at: "2021-07-09T01:48:17.000000Z",
    updated_at: "2021-07-13T02:31:06.000000Z",
    linkedSnippet: true
  }
];

export default {
  data() {
    return {
      // stores: storesSample
      allStores: []
    };
  },
  computed: {
    stores() {
      return this.allStores;
    }
  },
  async mounted() {
    let res;
    res = await this.$api.post(`/api/square/get-my-stores`);
    this.allStores = res.data.sites;
    for (let st of this.allStores) {
      res = await this.$api.post(`/api/square/retrieve-snippet-for-store`, {
        siteId: st.id
      });
      st.linkedSnippet = res.data.snippet;
    }
  },
  methods: {
    async addSnippetToStore(store) {
      let postData = {
        siteId: store.id
      };
      let res = await this.$api.post(
        `/api/square/add-snippet-to-store`,
        postData
      );
      store.linkedSnippet = res.data.snippet;
    }
  }
};
</script>

<style scoped>
</style>
