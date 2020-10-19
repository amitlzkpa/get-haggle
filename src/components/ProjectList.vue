<template>
  <div>
    <v-row dense>
      <v-col
        v-for="project in projects"
        :key="project.id"
        cols="12"
        lg="3"
        md="4"
        sm="6"
        xs="12"
      >
        <ProjectCard
          :project="project"
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
  }
}
</script>

<style scoped>

</style>