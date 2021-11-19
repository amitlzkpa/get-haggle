<template>
  <div>
    <v-row>
      <v-col>
        <v-card flat class="ma-4">
          <a
            target="_blank"
            :href="`https://${storeInfo.siteDetails.domain}`"
            class="text-decoration-none"
            style="font-family: Consolas"
            >{{ `https://${storeInfo.siteDetails.domain}` }}</a
          >
        </v-card>

        <v-card flat class="ma-4">
          <v-text-field
            v-model="deal.name"
            label="Name"
            :rules="nameRules"
            required
          />
        </v-card>

        <v-card flat class="ma-4">
          <v-textarea v-model="deal.description" label="Description" />
        </v-card>

        <v-row>
          <v-col cols="12" lg="6" sm="6" md="6">
            <v-card flat class="d-flex flex-column">
              <v-card flat class="d-flex ma-4">
                <v-card
                  flat
                  class="d-flex flex-grow-1 flex-column align-center ma-4"
                >
                  <h2 class="primary--text">Pool target</h2>
                  <v-slider
                    v-model.number="deal.poolSize"
                    vertical
                    thumb-label
                    hint="Pool target"
                    min="10"
                    max="300"
                  >
                  </v-slider>
                  <v-icon size="100">mdi-account-group</v-icon>
                  <div class="d-flex m2-2">
                    <h1 class="secondary--text font-weight-bold">
                      {{ deal.poolSize }}
                    </h1>
                    <h2 class="secondary--text mt-2 ml-1">customers</h2>
                  </div>
                </v-card>

                <v-card
                  flat
                  class="d-flex flex-grow-1 flex-column align-center ma-4"
                >
                  <h2 class="primary--text">Discount</h2>
                  <v-slider
                    v-model.number="deal.percentageDiscount"
                    vertical
                    thumb-label
                    hint="Pool target"
                    min="1"
                    max="100"
                  >
                  </v-slider>
                  <v-icon size="80">mdi-sale</v-icon>
                  <div class="d-flex m2-2">
                    <h1 class="secondary--text font-weight-bold">
                      {{ deal.percentageDiscount }}%
                    </h1>
                    <h2 class="secondary--text mt-2 ml-1">off</h2>
                  </div>
                </v-card>
              </v-card>

              <v-card flat outlined class="d-flex flex-column ma-4">
                <v-card flat class="ma-4">
                  <h2 class="primary--text">Deadline</h2>
                  <v-date-picker
                    v-model="deal.endsAt"
                    landscape
                  ></v-date-picker>
                </v-card>

                <v-card flat class="ma-4">
                  <h2 class="primary--text">No. of days to redeem</h2>
                  <v-card flat class="d-flex">
                    <v-slider
                      v-model.number="deal.redeemDays"
                      class="mt-3"
                      hint="Number of days after the deadline"
                      min="1"
                      max="90"
                    >
                    </v-slider>
                    <div class="d-flex ml-2">
                      <h1 class="secondary--text font-weight-bold">
                        {{ deal.redeemDays }}
                      </h1>
                      <h2 class="secondary--text mt-2 ml-1">
                        {{ deal.redeemDays === 1 ? "day" : "days" }}
                      </h2>
                    </div>
                  </v-card>
                </v-card>
              </v-card>
            </v-card>
          </v-col>

          <v-col cols="12" lg="6" sm="6" md="6">
            <v-card flat outlined class="pa-4">
              <h2 class="primary--text mt-3">Items</h2>
              <v-card flat class="d-flex">
                <v-card flat color="grey lighten-3" class="mt-4">
                  <div class="pa-4" style="width: 200px">Boo</div>
                </v-card>
                <v-container
                  style="
                    max-height: 900px;
                    overflow-y: auto;
                    overflow-x: hidden;
                  "
                  fluid
                  grid-list-md
                >
                  <v-layout row wrap>
                    <v-flex
                      lg12
                      xl6
                      class="my-1"
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
              </v-card>
            </v-card>
          </v-col>
        </v-row>

        <v-card flat class="ma-4">
          <v-btn block color="primary" @click="onClickNewDeal">
            {{ deal._id ? "save" : "create" }}
          </v-btn>
        </v-card>
      </v-col>
    </v-row>
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
      storeInfo: storeInfoSample,
      deal: {
        name: "",
        description: "",
        storeDomain: "",
        endsAt: "",
        redeemDays: 1,
        poolSize: 10,
        percentageDiscount: 10
      },
      nameRules: [v => !!v || "Name is required"]
    };
  },
  async mounted() {
    this.deal.storeDomain = this.$route.params.storeDomain;
    let dealId = this.$route.params.dealId;
    if (dealId) {
      let p = await this.$api.get(`/api/deals/id/${dealId}`);
      this.deal = p.data;
    }

    if (process.env.NODE_ENV === "development") return;
    let postBody = {
      storeDomain: this.$route.params.storeDomain
    };
    let res = await this.$api.post(`/api/square/get-store-details`, postBody);
    this.storeInfo = res.data;
  },
  methods: {
    async onClickNewDeal() {
      let p;
      if (!this.deal._id) {
        p = await this.$api.post("/api/deals/", this.deal);
      } else {
        p = await this.$api.put("/api/deals/", this.deal);
      }
      console.log(p.data);
    }
  }
};
</script>

<style scoped>
</style>
