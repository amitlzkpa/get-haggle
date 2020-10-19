<template>
  <div>
    <v-row dense>
      <v-col
        v-for="proj in projs"
        :key="proj.id"
        cols="12"
        lg="3"
        md="4"
        sm="6"
        xs="12"
      >
        <ProjectCard
          :project="proj"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ProjectCard from '@/components/ProjectCard.vue';

export default {
  components: {
    ProjectCard
  },
  props: {
    projects: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      projs: []
    }
  },
  watch: {
    projects: function(newVal) {
      this.projs = newVal
    }
  },
  async mounted() {

    if (this.projects) {
      this.projs = this.projects;
      return;
    }

    while(this.$auth.loading) {
      await this.wait(100);
    }

    let ps = await this.$api.get("/api/projects/all");
    this.projs = ps.data;
  }
}
</script>

<style scoped>

</style>