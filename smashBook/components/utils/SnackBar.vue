<template>
  <v-snackbar v-model="show" :color="color">
    {{ message }}
    <template v-slot:action="{ attrs }">
      <v-btn v-bind="attrs" color="white" text @click="show = false">
        <v-icon dark>
          mdi-close-circle
        </v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      message: '',
      color: ''
    }
  },
  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'snackbar/showMessage') {
        this.message = state.snackbar.content
        this.color = state.snackbar.color
        this.show = true
      }
    })
  }
}
</script>

<style lang="scss">
.v-snack__content {
  font-size: 1.5rem;
}

// Fix a rendering bug on Chome iOs & Safari mobile
.v-snack.v-snack--top {
  bottom: auto;
}
// Fix a rendering bug on Chome iOs & Safari mobile
.v-snack.v-snack--bottom {
  top: auto;
}
</style>
