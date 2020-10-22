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
            :to="`/profile/view/${$auth.dbUser._id}`"
          >
            view
          </v-btn>
          <v-btn
            text
            @click="update"
          >
            update
          </v-btn>
        </v-toolbar>
        <form>
          <v-text-field
            v-model="name"
            :error-messages="nameErrors"
            label="Name"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          />
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            label="E-mail"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';

export default {
  mixins: [validationMixin],
  validations: {
    name: { required },
    email: { required, email }
  },
  data: () => ({
    name: '',
    email: ''
  }),
  computed: {
    nameErrors () {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push('Name is required.');
      return errors;
    },
    emailErrors () {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push('Must be valid e-mail');
      !this.$v.email.required && errors.push('E-mail is required');
      return errors;
    },
  },
  mounted() {
    this.name = this.$auth.dbUser.name;
    this.email = this.$auth.dbUser.email;
  },
  methods: {
    async update () {
      this.$v.$touch();
      let postData = {
        name: this.name,
        email: this.email
      };
      let res = await this.$api.put("/api/users", postData);
      this.$auth.dbUser = res.data;
    }
  }
}
</script>

<style scoped>

</style>