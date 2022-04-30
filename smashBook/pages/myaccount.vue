<template>
  <div v-if="$fetchState.pending">
    <Loader />
  </div>
  <div v-else>
    <v-container>
      <v-row :justify="'center'" class="ma-2">
        <h1 class="account__title">Mon compte joueur</h1>
      </v-row>

      <v-row :justify="'center'">
        <v-col class="overlay pa-5" :sm="8" :md="6" :lg="4">
          <v-form class="form" ref="form" v-model="valid">
            <v-row>
              <v-text-field
                class="account__name"
                label="Modifier le nom de joueur"
                :placeholder="me.name"
                v-model="form.name"
                :rules="nameRules"
                :counter="20"
                required
              />
            </v-row>

            <v-row>
              <v-text-field
                class="account__email"
                label="Modifier le mail"
                :placeholder="me.email"
                v-model="form.email"
                :rules="emailRules"
                required
              />
              >
            </v-row>

            <v-row>
              <v-textarea
                class="account__bio"
                label="Modifier son nindo"
                v-model="form.bio"
                :counter="50"
                :rules="bioRules"
                :rows="2"
              />
            </v-row>

            <v-row>
              <v-col cols="7">
                <v-select
                  class="account__favChar"
                  label="Combattant favori"
                  v-model="form.favChar"
                  :items="characters"
                  item-value="id"
                  item-text="name"
                  prenpend-inner-icon
                  @click:clear="clearChar"
                />
              </v-col>

              <v-col cols="5">
                <v-avatar class="account__favChar__img" size="72">
                  <v-img :src="selectedCharacterImage">
                    <template v-slot:placeholder>
                      <v-img
                        :src="require('../assets/images/icons/iconsHeader.svg')"
                      />
                    </template>
                  </v-img>
                </v-avatar>

                <v-btn
                  class="account__favChar__clear"
                  icon
                  @click="clearChar"
                  color="red"
                >
                  <v-icon>
                    mdi-close-circle
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>

            <v-row>
              <v-file-input
                class="account__avatar"
                label="Changer d'avatar ?"
                v-model="form.imageUrl"
                truncate-length="15"
                prepend-icon="mdi-account-circle"
              />
            </v-row>

            <v-row>
              <v-checkbox
                class="account__avatar__delete"
                :label="`Supprimer l'avatar actuel ?`"
                v-model="checkbox"
              />
            </v-row>

            <v-row class="mt-7" justify="center">
              <v-btn
                class="account__apply"
                :style="btnStyle"
                color="pink"
                @click="validate"
              >
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
import formData from '../helpers/formDataHandler.js'
import { mapGetters } from 'vuex'
export default {
  async fetch() {
    await this.$store.dispatch('characters/getCharacters')
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        bio: '',
        favChar: '',
        imageUrl: null,
      },
      valid: false,
      nameRules: [
        (value) => !!value || 'Faut indiquer un pseudo, mich',
        (v) => (v && v.length <= 20) || "C'est trop long ton pseudo là",
      ],
      emailRules: [
        (v) => !!v || 'Y te faut un email',
        (v) => /.+@.+\..+/.test(v) || "T'es sûr que t'as bien écrit ?",
      ],
      bioRules: [(v) => v.length <= 50 || "C'est trop long ton nindo là"],
      checkbox: false,
      btnStyle: 'font-size:1.3rem',
    }
  },

  computed: {
    ...mapGetters({ me: 'player/myData' }), // Recupérer les infos du joueur de vuex, utiliser mapState est une possibilité si on ne modifie rien de l'état du store (filtre, tri...)
    ...mapGetters({ characters: 'characters/charactersList' }),
    selectedCharacterImage() {
      // Obtenir le personnage actuellement selectionné dans le formulaire
      const selectedCharacter = this.characters.find(
        (character) => character.id === this.form.favChar
      )
      return selectedCharacter ? selectedCharacter.imageUrl : null
    },
  },

  mounted() {
    // le formulaire est initialisé à néant, au mounted, y mettre les infos du joueur si elles existent
    this.form.name = this.me.name
    this.form.email = this.me.email
    this.form.bio = this.me.bio || ''
    this.form.favChar = this.me.favChar
  },

  methods: {
    clearChar() {
      // Method du bouton pour mettre le personnage favori à null
      this.form.favChar = null
    },
    validate() {
      // Méthod du bouton "Modifier"
      this.$refs.form.validate()
      if (this.valid) {
        this.updateAccount()
      }
    },
    updateAccount() {
      this.$nuxt.$loading.start()
      let data
      if (this.form.imageUrl) {
        // Dans le cas ou un avatar est transmis, utiliser le helper multer pour utiliser un objet formData
        if (this.form.favChar) {
          // Et qu'il existe un personnage favoris
          data = { id: this.me.id, form: formData(this.form) }
        } else {
          // Et qu'il n'existe pas de personnage favoris, on doit enlever cette propriété du formulaire
          let { favChar, ...form } = this.form
          data = { id: this.me.id, form: formData(form) }
        }
      } else if (this.checkbox) {
        // Si l'avatar doit être supprimé, le renvoyer vide
        data = {
          id: this.me.id,
          form: this.form,
        }
      } else {
        // Sinon prendre le formulaire sans opération particulière, mais on ne renvoie pas l'avatar pour ne pas écraser le précédent
        let { imageUrl, ...form } = this.form
        data = {
          id: this.me.id,
          form,
        }
      }

      this.$store.dispatch('player/update', data).then(
        (response) => {
          this.$nuxt.$loading.finish()
          this.$router.push({ path: '/home' })
          this.$notifier.showMessage({
            content: response.message,
            color: 'green',
          })
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
