<template>
  <div>
    <v-row>
      <v-col>
        <v-toolbar flat>
          <v-spacer />
          <v-btn
            v-if="deal.user === $auth.dbUser._id"
            :to="`/deal/edit/${deal._id}`"
            text
          >
            edit
          </v-btn>
        </v-toolbar>
        <h1>{{ deal.name }}</h1>
        <p>{{ deal.description }}</p>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deal: {}
    };
  },
  async mounted() {
    let id = this.$route.params.id;
    let res = await this.$api.get(`/api/deals/id/${id}`);
    this.deal = res.data;
  }
};
</script>

<style scoped>
</style>
