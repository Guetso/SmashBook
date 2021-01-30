<template>
  <div id="connectPage">
    <v-form v-model="valid">
      <v-container>
        <v-row>
          <v-text-field
            v-model="form.name"
            :rules="nameRules"
            label="Nom du joueur"
            required
          ></v-text-field
        ></v-row>
        <v-row>
          <v-text-field
            v-model="form.password"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[passRules.required]"
            :type="show ? 'text' : 'password'"
            label="Mot de passe"
            @click:append="show = !show"
          ></v-text-field
        ></v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {
  layout: 'intro',
  data() {
    return {
      valid: false,
      form: { name: '', password: '' },
      nameRules: [(v) => !!v || 'Faut marquer ton pseudo gros'],
      passRules: {
        required: (value) => !!value || 'T\'as bien un mot de passe ?'
      },
      show: false,
      errorMessage: null
    }
  },
  methods: {
    loginMe() {
      this.$nuxt.$loading.start()
      this.$store.dispatch('auth/login', this.form).then(
        () => {
          this.$nuxt.$loading.finish()
          console.log('Vous êtes connecté')
        },
        (error) => {
          if (error.response) {
            this.$nuxt.$loading.finish()
            this.errorMessage = error.response.data.message
          } else {
            this.$nuxt.$loading.finish()
            this.errorMessage = error
          }
        }
      )
    }
  }
}
</script>

<style lang="scss">
h1 {
  margin-top: 0;
  font-family: 'roboto';
}
</style>
