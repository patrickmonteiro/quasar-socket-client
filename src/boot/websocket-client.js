// import axios from 'axios'
// export default async ({ Vue }) => {
//   Vue.prototype.$axios = axios
// }
import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'https://quasar-socket-server.herokuapp.com'
}))
