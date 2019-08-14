<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    // console.log(this.$vueSocketIo.io.id)
    // this.$socket.broadcast.to('').emit('Fala Yohan')
  },
  sockets: {
    texto (text) {
      console.log('oi')
      this.disparaFala(text)
    }
  },
  methods: {
    disparaFala (text) {
      this.$speechTalk('pt=BR', text)
    }
  }
}
</script>

<style>
</style>
