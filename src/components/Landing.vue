<template>
  <div>
    <v-row>
      <v-col>
        <h1 class="display-2 font-weight-bold">
          Vue Starter
        </h1>
        <v-btn
          text
          to="/about"
        >
          about
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-img
          src="/imgs/img.png"
          class="my-3"
          contain
          height="200"
        />
        <v-btn
          class="primary"
          block
          @click="onTestPublicRoute"
        >
          Test public API route
        </v-btn>
        <span>{{ publicRouteMsg }}</span>
        <br>
        <v-btn
          class="primary"
          block
          @click="onTestProtectedRoute"
        >
          Test protected User API route
        </v-btn>
        <span>{{ protectedRouteMsg }}</span>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  data() {
    return {
      publicRouteMsg: null,
      protectedRouteMsg: null
    }
  },
  methods: {
    async onTestPublicRoute() {
      try {
        let res = await this.$api.get('/api/test');
        console.log(res.data);
        this.publicRouteMsg = res.data;
      } catch(err) {
        console.log(err.message);
        this.publicRouteMsg = err.message;
      }
    },
    async onTestProtectedRoute() {
      try {
        let res = await this.$api.get('/api/users/test');
        console.log(res.data);
        this.protectedRouteMsg = res.data;
      } catch(err) {
        console.log(err.message);
        this.protectedRouteMsg = err.message;
      }
    }
  }
}
</script>

<style scoped>

</style>
