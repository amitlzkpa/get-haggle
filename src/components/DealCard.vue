<template>
  <v-card class="d-flex align-center pa-4" height="240" outlined>
    <div class="d-flex flex-column justify-center align-center px-12">
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
          <div class="d-flex flex-column justify-center align-center">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-card flat class="d-flex align-end" v-bind="attrs" v-on="on">
                  <h2 class="primary--text" style="font-size: 2.2em">34</h2>
                  <h4 class="mb-2">/60</h4>
                </v-card>
              </template>
              <span>34 people in current pool</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-card flat class="grey--text" v-bind="attrs" v-on="on">
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
</template>

<script>
export default {};
</script>