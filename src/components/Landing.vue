<template>
  <div>

    <v-row>
      <v-col>
        
        <h1 class="display-2 font-weight-bold">
          Bill and Mat
        </h1>
        
        <v-img
          src="/imgs/img.png"
          class="my-3"
          contain
          height="200"
        />
        
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        
        <h2>Local Value</h2>
        <v-btn @click="onDecrLcl">-</v-btn>
        <span class="mx-3">{{ num }}</span>
        <v-btn @click="onIncrLcl">+</v-btn>
        
      </v-col>
    </v-row>

    <v-row>
      <v-col>

        <h2>Vuex Value</h2>
        <v-btn @click="onDecrVuex">-</v-btn>
        <span class="mx-3">{{ $store.state.count }}</span>
        <v-btn @click="onIncrVuex">+</v-btn>
        
      </v-col>
    </v-row>

    <v-row>
      <v-col>

        <h2>Test Routes</h2>
        <v-btn @click="onTestRoute" class="ma-2">Test public API route</v-btn>
        <span>{{ publicRouteMsg }}</span>

        <br />
        
        <v-btn @click="onTestUserRoute" class="ma-2">Test protected User API route</v-btn>
        <span>{{ protectedRouteMsg }}</span>

        <br />
        
        <v-btn @click="onClearMsgs" class="ma-2">Clear messages</v-btn>
        
      </v-col>
    </v-row>

  </div>
</template>

<script>

export default {
  data() {
    return {
      num: 0,
      publicRouteMsg: null,
      protectedRouteMsg: null
    }
  },
  methods: {
    async onIncrLcl() {
      this.num++;
    },
    async onDecrLcl() {
      this.num--;
    },
    async onIncrVuex() {
      this.$store.commit('increment');
    },
    async onDecrVuex() {
      this.$store.commit('decrement');
    },
    async onTestRoute() {
      let res = await this.$api.get('/api/test');
      console.log(res.data);
      this.publicRouteMsg = res.data;
    },
    async onTestUserRoute() {
      try {
        let res = await this.$api.get('/api/users/test');
        console.log(res.data);
        this.protectedRouteMsg = res.data;
      } catch(err) {
        console.log(err.message);
        this.protectedRouteMsg = err.message;
      }
    },
    async onClearMsgs() {
      this.publicRouteMsg = null;
      this.protectedRouteMsg = null;
    }
  }
}
</script>

<style scoped>

</style>
