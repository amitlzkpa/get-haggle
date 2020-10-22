<template>
  <div>    
    <v-row>
      <v-col>
        <v-toolbar flat>
          <v-spacer />
          <v-btn
            v-if="project.user === $auth.dbUser._id"
            :to="`/project/edit/${project._id}`"
            text
          >
            edit
          </v-btn>
        </v-toolbar>
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
