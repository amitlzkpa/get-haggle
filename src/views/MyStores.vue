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
                    {{ store.site_title }}
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
                  <span style="font-size: 12px" class="text--grey font-italic">
                    Created {{ moment(store.created_at).fromNow() }}
                  </span>
                </div>
                <div class="pt-6">
                  <v-btn
                    @click="
                      store.linkedSnippet
                        ? removeSnippetFromStore(store)
                        : addSnippetToStore(store)
                    "
                    fab
                    text
                    large
                    class="pa-4"
                    :color="store.linkedSnippet ? 'grey' : '#eb5600'"
                  >
                    <v-icon large plain>
                      {{ store.linkedSnippet ? "mdi-check" : "mdi-plus-thick" }}
                    </v-icon>
                  </v-btn>
                  <v-btn
                    :to="`/my-store/${store.domain}`"
                    fab
                    text
                    large
                    class="pa-4"
                  >
                    <v-icon class="mx-4 grey--text" plain large>
                      mdi-settings
                    </v-icon>
                  </v-btn>
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
      stores: storesSample
      // stores: []
    };
  },
  async mounted() {
    let res;
    res = await this.$api.post(`/api/square/get-my-stores`);
    let ss = res.data.sites;
    for (let st of ss) {
      res = await this.$api.post(`/api/square/retrieve-snippet-for-store`, {
        siteId: st.id
      });
      st.linkedSnippet = res.data.snippet;
    }
    this.stores = ss;
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
    },
    async removeSnippetFromStore(store) {
      let postData = {
        siteId: store.id
      };
      let res = await this.$api.post(
        `/api/square/remove-snippet-from-store`,
        postData
      );
      store.linkedSnippet = res.data.snippet;
    }
  }
};
</script>

<style scoped>
</style>
