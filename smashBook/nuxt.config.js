export default {
  ssr: false,
  target: 'static',
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  buildModules: ['@nuxtjs/vuetify'],
  modules: ['@nuxtjs/axios', '@nuxtjs/style-resources'],
  publicRuntimeConfig: {
    baseApiURL: process.env.BASE_API_URL || 'http://localhost:3000/api'
  },
  privateRuntimeConfig: {},
  plugins: ['~/plugins/axios.js'],
  router: {
    middleware: 'auth'
  },
  css: ['@/assets/scss/styles.scss', '@/assets/css/normalize.css'],
  styleResources: {
    scss: ['@/assets/scss/*.scss']
  },
  components: true,
  loading: {
    color: 'white',
    height: '5px'
  }
}
