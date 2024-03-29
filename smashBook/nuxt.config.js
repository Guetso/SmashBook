export default {
  ssr: false,

  target: 'static',

  head: {
    title: 'Le SmashBook',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href:
          process.env.NODE_ENV === 'production'
            ? '/smashbook/favicon.ico'
            : '/favicon.ico',
      },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css2?family=Hachi+Maru+Pop&display=swap%27',
      },
    ],
  },

  buildModules: ['@nuxtjs/vuetify'],

  modules: ['@nuxtjs/axios', '@nuxtjs/style-resources', '@nuxtjs/pwa'],

  publicRuntimeConfig: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000/api',
    version: process.env.VERSION,
  },

  privateRuntimeConfig: {},

  plugins: [
    { src: '~/plugins/vuex-persist', ssr: false },
    '~/plugins/axios.js',
    '~/plugins/notifier.js',
  ],

  router: {
    base: process.env.NODE_ENV === 'production' ? '/smashbook/' : '/',
  },

  css: ['@/assets/scss/styles.scss', '@/assets/css/normalize.css'],
  styleResources: {
    scss: ['@/assets/scss/*.scss'],
  },

  components: true,

  loading: {
    color: 'white',
    height: '5px',
  },

  vuetify: {
    theme: {
      options: {
        customProperties: true,
      },
      dark: true,
      themes: {
        dark: {
          secondary: '#232323',
        },
      },
    },
  },

  /*   pwa: {
    manifest: {
      name: 'Le SmashBook',
      lang: 'fr',
    },
    workbox: {
      dev: true,
      debug: true,
    },
  }, */
}
