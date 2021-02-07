<template>
  <div>
    <v-app-bar app>
      <v-toolbar-title class="header__title">Le Smash Book</v-toolbar-title>
      <img src="~/assets/images/icons/iconsHeader.svg" />
      <v-spacer></v-spacer>
      <v-btn
        class="mx-2 no-active d-md-none"
        x-large
        icon
        @click.stop="drawer = !drawer"
      >
        <v-icon color="yellow darken-1">
          mdi-controller-classic
        </v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      class="nav"
      v-model="drawer"
      color="secondary"
      mobile-breakpoint="960"
      right
      app
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img :src="me.imageUrl"></v-img>
        </v-list-item-avatar>

        <v-list-item-title class="nav__title">{{ me.name }}</v-list-item-title>

        <v-btn class="d-md-none" icon @click.stop="drawer = !drawer">
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.link"
          link
        >
          <v-list-item-icon>
            <v-icon :color="item.color">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item class="logout" @click="logMeOut">
          <v-list-item-icon class="logout__icon">
            <v-icon color="red">mdi-power-standby</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { fakePlayer } from '~/fakeData/fakePlayer.js'
export default {
  data() {
    return {
      fakePlayer,
      drawer: false,
      items: [
        {
          title: 'Accueil',
          icon: 'mdi-home',
          color: '',
          link: '/',
        },
        { title: 'Mon compte', icon: 'mdi-account' },
      ],
    }
  },
  computed: {
    ...mapGetters({ me: 'player/data' }),
  },
  methods: {
    breakPoint() {
      if (this.$vuetify.breakpoint.width < 960) {
        this.drawer = false
      } else {
        this.drawer = true
      }
    },
    logMeOut() {
      this.$store.dispatch('auth/logout').then(
        () => {
          console.log('Vous êtes déconnecté')
        },
        (error) => {
          console.log(error)
        }
      )
    },
  },
  mounted() {
    this.breakPoint()
  },
}
</script>

<style lang="scss" scoped>
.header {
  &__title {
    text-transform: uppercase;
    font-size: 3rem;
    font-family: $logo;
  }
}
.nav {
  &__title {
    font-family: $logo;
    font-size: 2.5rem !important;
  }
}
img {
  width: 5rem;
  margin: auto 1rem;
}
.logout {
  justify-content: center;
  margin: 2rem 10rem;
  border-radius: 10px;
  border: solid #f4433665 1px;
  transition: background-color 300ms;
  &:hover {
    background-color: #57444444;
  }
  cursor: pointer;
  &__icon {
    margin-right: 0 !important;
  }
}
.v-btn--active.no-active::before {
  opacity: 0 !important;
}

.v-list-item__title {
  font-size: initial;
}
</style>
