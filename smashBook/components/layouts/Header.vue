<template>
  <div id="header">
    <v-app-bar app short>
      <v-toolbar-title class="header__title">Le Smash Book</v-toolbar-title>
      <img class="header__logo" src="~/assets/images/icons/iconsHeader.svg" />
      <v-spacer></v-spacer>
      <v-btn
        class="header__toggleNav mx-2 no-active d-md-none"
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
      <v-list-item class="nav__avatar px-2">
        <v-list-item-avatar>
          <v-img :src="me.imageUrl">
            <template v-slot:placeholder>
              <v-img
                :src="require('../../assets/images/icons/iconsHeader.svg')"
              />
            </template>
          </v-img>
        </v-list-item-avatar>

        <v-list-item-title class="nav__title">{{ me.name }}</v-list-item-title>

        <v-btn
          class="nav__toggleNav d-md-none"
          icon
          @click.stop="drawer = !drawer"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list class="nav__list">
        <v-list-item
          class="nav__list__regular"
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

        <v-list-item
          class="nav__list__admin"
          to="/admin"
          link
          v-if="me.isAdmin"
        >
          <v-list-item-icon>
            <v-icon>mdi-police-badge</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Le coin Admin</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>
        <v-btn
          color="red darken-4"
          rounded
          class="nav__logout"
          @click="logMeOut"
        >
          <v-list-item-icon class="nav__logout__icon">
            <v-icon>mdi-power-standby</v-icon>
          </v-list-item-icon>
        </v-btn>
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
        { title: 'Mon compte', icon: 'mdi-account', link: '/myaccount' },
        {
          title: 'Nouveau Match',
          icon: 'mdi-fencing',
          color: '',
          link: '/newmatch',
        },
        {
          title: 'Match en cours',
          icon: 'mdi-medal',
          color: '',
          link: '/inProgress',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({ me: 'player/myData' }),
    ...mapGetters({ inProgressMatches: 'match/inProgressMatch' }),
  },
  watch: {
    inProgressMatches() {
      if (this.inProgressMatches.length > 0) {
        this.items[3].color = 'red'
      } else {
        this.items[3].color = ''
      }
    },
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
  &__logout {
    margin: 2rem 10rem;
    &__icon {
      margin-right: 0 !important;
    }
  }
}
img {
  width: 5rem;
  margin: auto 1rem;
}

.v-btn--active.no-active::before {
  opacity: 0 !important;
}
</style>
