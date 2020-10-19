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
      project: {
        name: 'foo',
        description: 'barr'
      }
    }
  }
}
</script>

<style scoped>

</style>
