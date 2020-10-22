<template>
  <div>
    <div
      class="d-flex"
    >
      <v-img
        max-height="200"
        max-width="200"
        class="ma-2"
        :aspect-ratio="1"
        :src="$auth.auth0User.picture"
      />
      
      <div
        class="flex-grow-1"
      >
        <v-toolbar flat>
          <v-spacer />
          <v-btn
            text
            :to="`/profile/edit/${$auth.dbUser._id}`"
          >
            edit
          </v-btn>
        </v-toolbar>
        <h3>
          {{ $auth.dbUser.name }}
        </h3>
        <p>
          {{ $auth.dbUser.email }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>

</style>