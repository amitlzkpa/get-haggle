<template>
  <div>
    <v-row>
      <v-col>
        <h1 class="display-2 font-weight-bold">
          Vuestarter
        </h1>
      </v-col>
    </v-row>
    
    <v-row>
      <v-col
        cols="12"
        sm="8"
        xs="12"
      >
        <v-text-field
          v-model="newProjectName"
          label="Project Name"
          :rules="nameRules"
          required
        />
      </v-col>
      <v-col
        cols="12"
        sm="4"
        xs="12"
      >
        <v-btn
          block
          color="primary"
          @click="onClickNewProject"
        >
          create
        </v-btn>
      </v-col>
    </v-row>
    
    <v-row>
      <v-col>
        <v-text-field
          v-model="newProjectDesc"
          label="Project Description"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  data() {
    return {
      newProjectName: "",
      newProjectDesc: "",
      nameRules: [
        v => !!v || "Name is required"
      ],
    }
  },
  methods: {
    async onClickNewProject() {
      let postData = {
        name: this.newProjectName,
        description: this.newProjectDesc
      };
      console.log(postData);
      let p = await this.$api.post("/api/projects/", postData);
      console.log(p.data);
    }
  }
}
</script>

<style scoped>

</style>
