<template>
  <q-page class="container">
    <div class="row q-px-md">
      <!-- <q-input outlined v-model="user" class="col-12" label="NOME" /> -->
      <div class="col-12">
          <q-scroll-area style="height: 80vh" ref="scroll">
              <q-chat-message class="text-h6"
                :ref="`chat${index}`"
                v-for="(msgRecebida, index) in messages" :key="index"
                :name="msgRecebida.user"
                :text="[msgRecebida.message]"
                :sent="user === msgRecebida.user"
              />
            </q-scroll-area>
        </div>
    </div>
    <div class="fixed-bottom, absolute-bottom">
      <div class="row">
        <div class="col-10">
          <q-input outlined v-model="message"
          :placeholder="'Digite sua mensagem'" @keyup.enter="sendMessage"/>
        </div>
        <div class="col-2">
          <q-btn icon="send" class="full-width full-height" size="lg" color="green-5"
            @click="sendMessage"  />
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  mensagem: 'Mensagem enviada do vue!',
  data () {
    return {
      user: '',
      message: '',
      messages: []
    }
  },
  sockets: {
    MESSAGE: function (data) {
      this.messages = [...this.messages, data]
      setTimeout(() => {
        this.$refs.scroll.setScrollPosition(this.$refs.scroll.$el.clientHeight)
        // console.log('DATA', data)
        // this.$speechTalk(`${data.user} diz: ${data.message}`)
      }, 100)
    }
  },
  methods: {
    sendMessage (e) {
      e.preventDefault()
      this.$socket.emit('SEND_MESSAGE', {
        user: this.user,
        message: this.message
      })
      this.message = ''
    }
  }
}
</script>
