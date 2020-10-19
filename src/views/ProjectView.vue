<template>
  <div>    
    <v-row>
      <v-col>
        <h1>{{ project.name }}</h1>
        <p>{{ project.description }}</p>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  data() {
    return {
      project: {}
    }
  },
  async mounted() {
    let id = this.$route.params.id;
    let res = await this.$api.get(`/api/projects/id/${id}`);
    this.project = res.data;
  }
}
</script>

<style scoped>

</style>
