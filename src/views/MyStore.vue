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
                <v-tooltip left>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      v-bind="attrs"
                      v-on="on"
                      large
                      :color="
                        storeInfo.siteDetails.isLinkedToHaggle
                          ? 'grey'
                          : '#eb5600'
                      "
                    >
                      {{
                        storeInfo.siteDetails.isLinkedToHaggle
                          ? "mdi-check"
                          : "mdi-plus-thick"
                      }}
                    </v-icon>
                  </template>
                  <p
                    class="text-center pt-4"
                    v-if="storeInfo.siteDetails.isLinkedToHaggle"
                  >
                    Pool discounts currently enabled!
                    <br />
                    Click to turn off
                  </p>
                  <p class="text-center pt-4" v-else>
                    Pool discounts have been disabled.
                    <br />
                    Click to turn on
                  </p>
                </v-tooltip>
              </div>
            </div>
          </v-card>

          <v-divider class="my-8" />

          <v-row>
            <v-col lg="8">
              <div class="d-flex">
                <div>
                  <h2 class="primary--text">Deals</h2>
                </div>
                <v-spacer />
                <div>
                  <v-tabs v-model="activeTab" right color="primary">
                    <v-tab href="#tab-live">Live</v-tab>
                    <v-tab href="#tab-past">Past</v-tab>
                  </v-tabs>
                </div>
              </div>
              <div>
                <v-tabs-items v-model="activeTab">
                  <v-tab-item value="tab-live">
                    <v-card
                      class="d-flex align-center pa-4"
                      height="240"
                      outlined
                    >
                      <div
                        class="
                          d-flex
                          flex-column
                          justify-center
                          align-center
                          px-12
                        "
                      >
                        <v-progress-circular
                          color="primary"
                          size="160"
                          width="4"
                          rotate="270"
                          :value="60"
                        >
                          <v-progress-circular
                            color="secondary"
                            size="200"
                            width="8"
                            rotate="270"
                            :value="40"
                          >
                            <div
                              class="
                                d-flex
                                flex-column
                                justify-center
                                align-center
                              "
                            >
                              <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                  <v-card
                                    flat
                                    class="d-flex align-end"
                                    v-bind="attrs"
                                    v-on="on"
                                  >
                                    <h2
                                      class="primary--text"
                                      style="font-size: 2.2em"
                                    >
                                      34
                                    </h2>
                                    <h4 class="mb-2">/60</h4>
                                  </v-card>
                                </template>
                                <span>34 people in current pool</span>
                              </v-tooltip>
                              <v-tooltip bottom>
                                <template v-slot:activator="{ on, attrs }">
                                  <v-card
                                    flat
                                    class="grey--text"
                                    v-bind="attrs"
                                    v-on="on"
                                  >
                                    4/10
                                  </v-card>
                                </template>
                                <span>4 pools filled</span>
                              </v-tooltip>
                            </div>
                          </v-progress-circular>
                        </v-progress-circular>
                      </div>
                      <div class="flex-grow-1">
                        <div class="d-flex flex-column justify-center">
                          <h2 class="primary--text">Thanksgiving Groups</h2>
                          <p class="secondary--text">
                            Coupon: 30% off
                            <br />
                            Ends: 1st December, 2021
                          </p>
                        </div>
                      </div>
                    </v-card>
                  </v-tab-item>
                  <v-tab-item value="tab-past"> Past </v-tab-item>
                </v-tabs-items>
              </div>
            </v-col>

            <v-col lg="4">
              <div class="d-flex">
                <v-divider vertical class="mx-8" />
                <div style="width: 100%">
                  <h2 class="primary--text">Items</h2>

                  <v-container fluid grid-list-md>
                    <v-layout row wrap>
                      <v-flex
                        lg12
                        xl6
                        v-for="storeItem of storeInfo.storeItems"
                        :key="storeItem.id"
                      >
                        <v-card outlined>
                          <v-img
                            :src="storeItem.item_data.ecom_image_uris[0]"
                            class="white--text align-end"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            aspect-ratio="1"
                          >
                            <v-card-title
                              v-text="storeItem.item_data.name"
                            ></v-card-title>
                          </v-img>

                          <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn
                              icon
                              :href="storeItem.item_data.ecom_uri"
                              target="_blank"
                            >
                              <v-icon>mdi-open-in-new</v-icon>
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
let storeInfoSample = {
  siteDetails: {
    id: "site_942725068125726254",
    site_title: "Cupcake Foundry",
    domain: "cupcake-foundry.square.site",
    is_published: true,
    created_at: "2021-07-13T02:25:22.000000Z",
    updated_at: "2021-09-23T18:53:37.000000Z"
  },
  storeItems: [
    {
      type: "ITEM",
      id: "LY3KYDY44KAIB4YAG4P3UEAF",
      updated_at: "2021-07-13T02:27:20.902Z",
      created_at: "1970-01-19T19:42:22.968Z",
      version: 1626143240902,
      is_deleted: false,
      present_at_all_locations: true,
      image_id: "DJIXZNEM5MDTU6V5SY4N7I7I",
      item_data: {
        name: "Green Cupcakes",
        variations: [
          {
            type: "ITEM_VARIATION",
            id: "BGBGY3YZVEDE3TTR4W2IICEK",
            updated_at: "2021-07-13T02:23:08.509Z",
            created_at: "1970-01-19T19:42:22.968Z",
            version: 1626142988509,
            is_deleted: false,
            present_at_all_locations: true,
            item_variation_data: {
              item_id: "LY3KYDY44KAIB4YAG4P3UEAF",
              name: "Regular",
              ordinal: 0,
              pricing_type: "FIXED_PRICING",
              price_money: {
                amount: 3000,
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
        ecom_uri:
          "https://cupcake-foundry.square.site/product/green-cupcakes/3",
        ecom_image_uris: [
          "https://cupcake-foundry.square.site/uploads/2/6/3/6/26366173/s911168244534723229_p3_i1_w547.jpeg"
        ],
        ecom_available: true,
        ecom_visibility: "VISIBLE"
      }
    },
    {
      type: "ITEM",
      id: "LGDMPENYPUAWK5Y75I7Z2TN7",
      updated_at: "2021-07-13T02:28:05.779Z",
      created_at: "1970-01-19T19:42:23.026Z",
      version: 1626143285779,
      is_deleted: false,
      present_at_all_locations: true,
      image_id: "JS47M2O5FTHOH6TPPHNPZAM5",
      item_data: {
        name: "Blue Cupcake",
        variations: [
          {
            type: "ITEM_VARIATION",
            id: "ODURO75BXJVZBP5I6L4U5YB5",
            updated_at: "2021-07-13T02:23:56.055Z",
            created_at: "1970-01-19T19:42:23.026Z",
            version: 1626143036055,
            is_deleted: false,
            present_at_all_locations: true,
            item_variation_data: {
              item_id: "LGDMPENYPUAWK5Y75I7Z2TN7",
              name: "Regular",
              ordinal: 0,
              pricing_type: "FIXED_PRICING",
              price_money: {
                amount: 2000,
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
        ecom_uri: "https://cupcake-foundry.square.site/product/blue-cupcake/4",
        ecom_image_uris: [
          "https://cupcake-foundry.square.site/uploads/2/6/3/6/26366173/s911168244534723229_p4_i1_w691.jpeg"
        ],
        ecom_available: true,
        ecom_visibility: "VISIBLE"
      }
    },
    {
      type: "ITEM",
      id: "QGMQ2D3DHFVB37MSJIWSGJCG",
      updated_at: "2021-07-13T02:27:35.652Z",
      created_at: "1970-01-19T19:42:23.08Z",
      version: 1626143255652,
      is_deleted: false,
      present_at_all_locations: true,
      image_id: "GWEAD4OLOKBYI6DR6SQH6XNY",
      item_data: {
        name: "Yellow Cupcake",
        variations: [
          {
            type: "ITEM_VARIATION",
            id: "QDXE4D4NBGD6PUCLWBULMC65",
            updated_at: "2021-07-13T02:24:57.448Z",
            created_at: "1970-01-19T19:42:23.08Z",
            version: 1626143097448,
            is_deleted: false,
            present_at_all_locations: true,
            item_variation_data: {
              item_id: "QGMQ2D3DHFVB37MSJIWSGJCG",
              name: "Regular",
              ordinal: 0,
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
        ecom_uri:
          "https://cupcake-foundry.square.site/product/yellow-cupcake/5",
        ecom_image_uris: [
          "https://cupcake-foundry.square.site/uploads/2/6/3/6/26366173/s911168244534723229_p5_i1_w860.jpeg"
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
      activeTab: null,
      storeInfo: storeInfoSample
    };
  },
  async mounted() {
    // let postBody = {
    //   storeDomain: this.$route.params.storeDomain
    // };
    // let res = await this.$api.post(`/api/square/get-store-details`, postBody);
    // this.storeInfo = res.data;
  }
};
</script>

<style scoped>
</style>
