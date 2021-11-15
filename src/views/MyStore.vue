<template>
  <div>
    <v-container fluid>
      <v-row>
        <v-col>
          <v-card outlined tile class="pa-8">
            <div class="d-flex">
              <div class="flex-grow-1">
                <span class="display-1 font-weight-light">{{
                  storeInfo.siteDetails.site_title
                }}</span>
                <br />
                <a
                  target="_blank"
                  :href="`https://${storeInfo.siteDetails.domain}`"
                  class="text-decoration-none"
                  style="font-family: Consolas"
                  >{{ `https://${storeInfo.siteDetails.domain}` }}</a
                >
                <br />
                <span style="font-size: 12px" class="text--grey font-italic"
                  >Created
                  {{ moment(storeInfo.siteDetails.created_at).fromNow() }}</span
                >
              </div>
              <div class="pt-6" style="cursor: pointer">
                <v-icon
                  large
                  :color="
                    storeInfo.siteDetails.isLinkedToHaggle ? 'grey' : '#eb5600'
                  "
                >
                  {{
                    storeInfo.siteDetails.isLinkedToHaggle
                      ? "mdi-check"
                      : "mdi-plus-thick"
                  }}
                </v-icon>
              </div>
            </div>
          </v-card>

          <hr />

          <div v-for="storeItem of storeInfo.storeItems" :key="storeItem.id">
            <a :href="storeItem.item_data.ecom_uri" target="_blank">{{
              storeItem.item_data.name
            }}</a>
            <v-img :src="storeItem.item_data.ecom_image_uris[0]" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
let storeInfoSample = {
  siteDetails: {
    id: "site_829240995758856365",
    site_title: "Colourful Chocolates",
    domain: "colourful-chocolates.square.site",
    is_published: true,
    created_at: "2021-07-09T01:48:17.000000Z",
    updated_at: "2021-07-13T02:31:06.000000Z",
    isLinkedToHaggle: true
  },
  storeItems: [
    {
      type: "ITEM",
      id: "G74B55BRRDZGYXN2YLFJM2L6",
      updated_at: "2021-07-13T05:04:04.3Z",
      created_at: "1970-01-19T19:36:35.089Z",
      version: 1626152644300,
      is_deleted: false,
      present_at_all_locations: true,
      image_id: "EEYJVORWBD3QLB2IDBQIH2SA",
      item_data: {
        name: "Red Chocolate",
        visibility: "PRIVATE",
        variations: [
          {
            type: "ITEM_VARIATION",
            id: "YARB3XG7HRSTVXVZ7RRQQU4S",
            updated_at: "2021-07-12T16:07:21.393Z",
            created_at: "1970-01-19T19:36:35.089Z",
            version: 1626106041393,
            is_deleted: false,
            present_at_all_locations: true,
            item_variation_data: {
              item_id: "G74B55BRRDZGYXN2YLFJM2L6",
              name: "Regular",
              ordinal: 1,
              pricing_type: "FIXED_PRICING",
              price_money: {
                amount: 4000,
                currency: "USD"
              },
              location_overrides: [
                {
                  location_id: "48CC71X2P981X",
                  track_inventory: true
                }
              ],
              track_inventory: false,
              sellable: true,
              stockable: true
            }
          }
        ],
        product_type: "REGULAR",
        skip_modifier_screen: false,
        ecom_uri:
          "https://colourful-chocolates.square.site/product/red-chocolate/1",
        ecom_image_uris: [
          "https://colourful-chocolates.square.site/uploads/2/6/3/6/26366173/s911168244534723229_p1_i1_w1000.jpeg"
        ],
        ecom_available: true,
        ecom_visibility: "VISIBLE"
      }
    },
    {
      type: "ITEM",
      id: "GHJW7KHIZJPKL334JRFCHN35",
      updated_at: "2021-07-12T16:07:05.751Z",
      created_at: "1970-01-19T19:36:35.173Z",
      version: 1626106025751,
      is_deleted: false,
      present_at_all_locations: true,
      image_id: "UMFZRZOHJ3QVXAE4CA3JCE2N",
      item_data: {
        name: "Blue Chocolate",
        visibility: "PRIVATE",
        variations: [
          {
            type: "ITEM_VARIATION",
            id: "YD37ZHMO5E2JC7IYD7GC3LTE",
            updated_at: "2021-07-12T16:07:05.751Z",
            created_at: "1970-01-19T19:36:35.173Z",
            version: 1626106025751,
            is_deleted: false,
            present_at_all_locations: true,
            item_variation_data: {
              item_id: "GHJW7KHIZJPKL334JRFCHN35",
              name: "Regular",
              ordinal: 1,
              pricing_type: "FIXED_PRICING",
              price_money: {
                amount: 6000,
                currency: "USD"
              },
              location_overrides: [
                {
                  location_id: "48CC71X2P981X",
                  track_inventory: true
                }
              ],
              track_inventory: false,
              sellable: true,
              stockable: true
            }
          }
        ],
        product_type: "REGULAR",
        skip_modifier_screen: false,
        ecom_uri:
          "https://colourful-chocolates.square.site/product/blue-chocolate/2",
        ecom_image_uris: [
          "https://colourful-chocolates.square.site/uploads/2/6/3/6/26366173/s911168244534723229_p2_i1_w426.jpeg"
        ],
        ecom_available: true,
        ecom_visibility: "VISIBLE"
      }
    }
  ]
};

export default {
  data() {
    return {
      storeInfo: storeInfoSample
    };
  },
  async mounted() {
    let postBody = {
      storeDomain: this.$route.params.storeDomain
    };
    let res = await this.$api.post(`/api/square/get-store-details`, postBody);
    console.log(res.data);
    this.storeInfo = res.data;
  }
};
</script>

<style scoped>
</style>
