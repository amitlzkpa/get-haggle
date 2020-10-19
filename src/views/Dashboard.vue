<template>
  <div>
    <v-btn
      class="primary"
      block
      to="/project/new"
    >
      Create New Project
    </v-btn>

    <ProjectList />
  </div>
</template>

<script>
import ProjectList from '@/components/ProjectList.vue';

export default {
  components: {
    ProjectList
  }
}
</script>

<style scoped>

</style>