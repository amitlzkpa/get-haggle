<template>
  <div>
    <v-row>
      <v-col>
        <div id="wrapper">
          <div class="content">
            <div
              style="
                display: flex;
                height: 100%;
                justify-content: center;
                align-items: center;
              "
            >
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  height: 100%;
                  justify-content: center;
                  align-items: center;
                  text-align: center;
                "
              >
                <p
                  style="
                    font-size: 92px;
                    font-weight: 100;
                    color: #9900ff;
                    text-shadow: 0px 0px 20px rgba(0, 0, 0, 0.8);
                  "
                >
                  Haggle
                </p>
                <h1 class="soft-shadow-text" style="font-weight: 300">
                  Get together and get discounts!
                </h1>
                <v-btn
                  class="ma-10"
                  text
                  href="https://youtu.be/E-tR7jIf4gI"
                  target="_blank"
                  >VIDEO</v-btn
                >
              </div>
            </div>
          </div>
          <div class="background">
            <div style="position: relative"></div>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <div style="height: 600px">
          <div
            style="
              display: flex;
              flex-direction: column;
              height: 100%;
              justify-content: center;
              align-items: center;
            "
          >
            <h1
              style="
                font-weight: 200;
                font-size: 48px;
                max-width: 800px;
                text-align: center;
              "
              class="soft-shadow-text"
            >
              Sellers announce discounts on group purchases
            </h1>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <div style="height: 600px">
          <div
            style="
              display: flex;
              flex-direction: column;
              height: 100%;
              justify-content: center;
              align-items: center;
            "
          >
            <h1
              style="
                font-weight: 200;
                font-size: 48px;
                max-width: 800px;
                text-align: center;
              "
              class="soft-shadow-text"
            >
              We help shoppers connect and pool together.
            </h1>
          </div>
        </div>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <div style="height: 600px">
          <div
            style="
              display: flex;
              flex-direction: column;
              height: 100%;
              justify-content: center;
              align-items: center;
            "
          >
            <h1
              style="
                font-weight: 200;
                font-size: 48px;
                max-width: 800px;
                text-align: center;
              "
              class="soft-shadow-text"
            >
              Add to your Square Store.
            </h1>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AnimLines from "@/components/AnimLines";

export default {
  components: {
    AnimLines
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
#wrapper {
  position: relative;
  width: 100%;
  height: 700px;
}

.content {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 100;
}

.background {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -100;
}
</style>
