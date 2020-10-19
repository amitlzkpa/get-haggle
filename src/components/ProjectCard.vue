<template>
  <v-card>
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px"
    />

    <v-card-title>
      {{ project.name }}
    </v-card-title>

    <v-card-subtitle
      text-truncate
    >
      {{ project.description }}
    </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  props: {
    project: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped>

</style>