<template>
  <div>
    <v-row>
      <v-col>
        <h1 style="font-size: 72px" class="font-weight-light">Haggle</h1>
        <p>Get together and get discounts</p>
      </v-col>
    </v-row>

    <v-row>
      <v-col> </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
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
