<template>
  <div>
    <v-row>
      <v-col>
        <v-text-field
          v-model="deal.name"
          label="Name"
          :rules="nameRules"
          required
        />
        <v-textarea v-model="deal.description" label="Description" />
        <v-btn block color="primary" @click="onClickNewDeal">
          {{ deal._id ? "save" : "create" }}
        </v-btn>
        <v-btn
          v-if="deal._id"
          block
          color="error"
          class="mt-2"
          @click="onClickDeleteDeal"
        >
          delete
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      deal: {
        name: "",
        description: ""
      },
      nameRules: [v => !!v || "Name is required"]
    };
  },
  async mounted() {
    let id = this.$route.params.id;
    if (id) {
      let p = await this.$api.get(`/api/deals/id/${id}`);
      this.deal = p.data;
    }
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
    },
    async onClickDeleteDeal() {
      let p = await this.$api.delete(`/api/deals/id/${this.deal._id}`);
      this.$router.push("/stores");
    }
  }
};
</script>

<style scoped>
</style>
