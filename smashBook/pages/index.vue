<template>
  <div id="connectPage">
    <v-container>
      <v-row :justify="'center'">
        <v-col :sm="8" :md="6" :lg="4">
          <v-form class="form" ref="form" v-model="valid">
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
                :rules="passRules"
                :type="show ? 'text' : 'password'"
                label="Mot de passe"
                @click:append="show = !show"
                required
              ></v-text-field
            ></v-row>
            <v-row class="mt-7">
              <v-btn
                :style="style"
                color="success"
                class="test mr-4"
                @click="validate"
              >
                T'es le plus fort ?
              </v-btn>
            </v-row>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  layout: 'intro',
  data() {
    return {
      valid: false,
      form: { name: '', password: '' },
      nameRules: [(value) => !!value || 'Faut marquer ton pseudo, mich'],
      passRules: [
        (value) => !!value || 'Tu rentres pas sans mot de passe, mich'
      ],
      show: false,
      style: 'font-size:1.3rem'
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
            this.$notifier.showMessage({ content: error.response.data.message, color: 'red'})
          } else {
            this.$nuxt.$loading.finish()
            this.$notifier.showMessage({ content: error, color: 'pink'})
          }
        }
      )
    },
    validate() {
      this.$refs.form.validate()
      if (this.valid) {
        this.loginMe()
      }
    }
  }
}
</script>

<style lang="scss">
.form {
  margin: 3rem 2rem;
}
.test {
  font-size: 5rem;
}
</style>
