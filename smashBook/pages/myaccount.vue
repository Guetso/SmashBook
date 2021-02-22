<template>
  <div>
    <v-container>
      <v-row :justify="'center'" class="ma-2">
        <h1 class="account__title">Mon compte joueur</h1>
      </v-row>
      <v-row :justify="'center'">
        <v-col class="overlay" :sm="8" :md="6" :lg="4">
          <v-form class="form" ref="form" v-model="valid">
            <v-row>
              <v-text-field
                v-model="form.name"
                :rules="nameRules"
                :counter="20"
                :placeholder="me.name"
                label="Modifier le nom de joueur"
                required
              ></v-text-field
            ></v-row>
            <v-row>
              <v-text-field
                v-model="form.email"
                :rules="emailRules"
                :placeholder="me.email"
                label="Modifier le mail"
                required
              ></v-text-field
            ></v-row>
            <!--             <v-row>
              <v-text-field
                v-model="form.password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="passRules"
                :type="show ? 'text' : 'password'"
                label="Choisis un mot de passe"
                @click:append="show = !show"
                required
              ></v-text-field
            ></v-row> -->
            <v-row
              ><v-file-input
                v-model="form.imageUrl"
                truncate-length="15"
                label="Changer d'avatar ?"
                prepend-icon="mdi-account-circle"
              ></v-file-input>
            </v-row>
            <v-row>
              <v-checkbox
                v-model="checkbox"
                :label="`Supprimer l'avatar actuel ?`"
              ></v-checkbox
            ></v-row>
            <v-row class="mt-7" justify="center">
              <v-btn :style="style" color="pink" @click="validate">
                Modifier
              </v-btn>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import multer from '../helpers/multer.js'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      valid: false,
      nameRules: [
        (value) => !!value || 'Faut indiquer un pseudo, mich',
        (v) => (v && v.length <= 20) || "C'est trop long ton pseudo là",
      ],
      /*  passRules: [(value) => !!value || 'Y te faut un mot de passe'], */
      emailRules: [
        (v) => !!v || 'Y te faut un email',
        (v) => /.+@.+\..+/.test(v) || "T'es sûr que t'as bien écrit ?",
      ],
      checkbox: false,
      show: false,
      style: 'font-size:1.3rem',
    }
  },
  computed: {
    ...mapGetters({ me: 'player/data' }),
    form() {
      return { name: this.me.name, email: this.me.email, imageUrl: null }
    },
  },
  methods: {
    validate() {
      this.$refs.form.validate()
      if (this.valid) {
        this.updateAccount()
      }
    },
    updateAccount() {
      this.$nuxt.$loading.start()
      let data
      if (this.form.imageUrl) {
        // Dans le cas ou un fichier doit être envoyé, utiliser le helper multer
        data = { id: this.me.id, form: multer(this.form) }
      } else if (this.checkbox) {
        // Si l'avatar doit être supprimé, le renvoyer vide
        data = {
          id: this.me.id,
          form: this.form,
        }
      } else {
        // Sinon prendre le formulaire sans opération particulière, mais on ne renvoie pas l'avatar pour ne pas écraser le précédent
        data = {
          id: this.me.id,
          form: { name: this.form.name, email: this.form.email },
        }
      }

      this.$store.dispatch('player/update', data).then(
        (response) => {
          this.$nuxt.$loading.finish()
          this.$notifier.showMessage({
            content: response.message,
            color: 'green',
          })
          console.log('Modifications des informations du joueur')
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
    },
  },
}
</script>

<style lang="scss" scoped>
.account__title {
  margin: auto;
}
</style>
