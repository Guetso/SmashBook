<template>
  <v-container>
    <v-row :justify="'center'">
      <v-col class="overlay" :sm="8" :md="6" :lg="4">
        <v-form class="form" ref="form" v-model="valid">
          <v-row>
            <v-text-field
              v-model="form.name"
              :rules="nameRules"
              :counter="20"
              label="Choisis un pseudo de joueur"
              required
            ></v-text-field
          ></v-row>
          <v-row>
            <v-text-field
              v-model="form.email"
              :rules="emailRules"
              label="Indique ton mail"
              required
            ></v-text-field
          ></v-row>
          <v-row>
            <v-text-field
              v-model="form.password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passRules"
              :type="show ? 'text' : 'password'"
              label="Choisis un mot de passe"
              @click:append="show = !show"
              required
            ></v-text-field
          ></v-row>
          <v-row
            ><v-file-input
              v-model="form.imageUrl"
              truncate-length="15"
              label="Choisis un avatar"
              prepend-icon="mdi-account-circle"
            ></v-file-input
          ></v-row>
          <v-row class="mt-7" justify="center">
            <v-btn :style="style" color="pink" @click="validate">
              T'es le plus fort ?
            </v-btn>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import formData from '../helpers/formDataHandler.js'
export default {
  layout: 'intro',
  data() {
    return {
      valid: false,
      form: { name: '', password: '', email: '', imageUrl: null },
      nameRules: [
        (value) => !!value || 'Faut indiquer un pseudo, mich',
        (v) => (v && v.length <= 20) || "C'est trop long ton pseudo là",
      ],
      passRules: [(value) => !!value || 'Y te faut un mot de passe'],
      emailRules: [
        (v) => !!v || 'Y te faut un email',
        (v) => /.+@.+\..+/.test(v) || "T'es sûr que t'as bien écrit ?",
      ],
      show: false,
      style: 'font-size:1.3rem',
    }
  },
  methods: {
    signUp() {
      this.$nuxt.$loading.start()

      let data
      if (this.form.imageUrl) {
        // Dans le cas ou un fichier doit être envoyé, utiliser le helper multer
        data = formData(this.form)
      } else {
        // Sinon prendre le formulaire sans opération particulière
        data = this.form
      }

      this.$store
        .dispatch('auth/signup', data)
        .then(
          () => {
            console.log('Vous êtes connecté')
          },
          (error) => {
            if (error.response) {
              this.$nuxt.$loading.finish()
              this.$notifier.showMessage({
                content: error.response.data.message,
                color: 'red',
              })
            } else {
              this.$nuxt.$loading.finish()
              this.$notifier.showMessage({ content: error, color: 'red' })
            }
          }
        )
        .then(() => {
          this.$store.dispatch('characters/getCharacters')
          this.$nuxt.$loading.finish()
        })
    },
    validate() {
      this.$refs.form.validate()
      if (this.valid) {
        this.signUp()
      }
    },
  },
}
</script>

<style lang="scss">
.form {
  margin: auto 2rem;
}
</style>
