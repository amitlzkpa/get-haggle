<template>
  <div>
    <v-row>
      <v-col>
        <p style="font-size: 96px; font-weight: 100">Haggle</p>
        <p>Get together and get discounts</p>
        <AnimLines />
      </v-col>
    </v-row>

    <v-row>
      <v-col />
    </v-row>
  </div>
</template>

<script>
import AnimLines from "@/components/AnimLines.vue";

export default {
  components: {
    AnimLines
  },
  data() {
    return {
      publicRouteMsg: null,
      protectedRouteMsg: null
    };
  },
  methods: {
    async onTestPublicRoute() {
      try {
        let res = await this.$api.get("/api/test");
        console.log(res.data);
        this.publicRouteMsg = res.data;
      } catch (err) {
        console.log(err.message);
        this.publicRouteMsg = err.message;
      }
    },
    async onTestProtectedRoute() {
      try {
        let res = await this.$api.get("/api/users/test");
        console.log(res.data);
        this.protectedRouteMsg = res.data;
      } catch (err) {
        console.log(err.message);
        this.protectedRouteMsg = err.message;
      }
    }
  }
};
</script>

<style scoped>
</style>
