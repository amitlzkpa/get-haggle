<template>
  <v-card>
    <v-img
      src="/imgs/img.png"
      height="200px"
    />

    <v-card-title>
      <div class="text-truncate">
        {{ project.name }}
      </div>
    </v-card-title>

    <v-card-subtitle>
      <div class="text-truncate">
        {{ project.description }}
      </div>
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