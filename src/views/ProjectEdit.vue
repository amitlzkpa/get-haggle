<template>
  <div>    
    <v-row>
      <v-col>
        <v-text-field
          v-model="project.name"
          label="Project Name"
          :rules="nameRules"
          required
        />
        <v-textarea
          v-model="project.description"
          label="Project Description"
        />
        <v-btn
          block
          color="primary"
          @click="onClickNewProject"
        >
          {{ (project._id) ? 'edit' : 'create' }}
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  data() {
    return {
      project: {
        name: "",
        description: ""
      },
      nameRules: [
        v => !!v || "Name is required"
      ],
    }
  },
  async mounted() {
    let id = this.$route.params.id;
    if (id) {
      let p = await this.$api.get(`/api/projects/id/${id}`)
      this.project = p.data;
    }
  },
  methods: {
    async onClickNewProject() {
      let p;
      if (!this.project._id) {
        p = await this.$api.post("/api/projects/", this.project);
      } else {
        p = await this.$api.put("/api/projects/", this.project);
      }
      console.log(p.data);
    }
  }
}
</script>

<style scoped>

</style>
