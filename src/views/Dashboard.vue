<template>
  <div>
    <v-btn
      class="primary"
      block
      to="/project/new"
    >
      Create New Project
    </v-btn>

    <ProjectList
      :projects="projects"
    />
  </div>
</template>

<script>
import ProjectList from '@/components/ProjectList.vue';

export default {
  components: {
    ProjectList
  },
  data() {
    return {
      projects: []
    };
  },
  async mounted() {
    let res = await this.$api.get("/api/projects/current-user");
    this.projects = res.data;
  }
}
</script>

<style scoped>

</style>