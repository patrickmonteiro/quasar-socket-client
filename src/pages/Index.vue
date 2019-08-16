<template>
  <q-page class="container">
    <div class="row q-px-md">
      <q-input outlined v-model="user" class="col-12" label="NOME" />
      <div class="col-12">
          <q-scroll-area style="height: 60vh" ref="scroll">
              <q-chat-message
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
          <q-input outlined v-model="message" :disable="!user"
          :class="user === '' ? 'bg-grey' : ''"
          :placeholder="user === '' ? 'Entre com seu nome na parte superior' : 'Digite sua mensagem'"/>
        </div>
        <div class="col-2">
          <q-btn icon="send" class="full-width" size="lg" color="green-5"
            @click="sendMessage" :disable="user === '' ? true : false"  />
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
        this.$speechTalk(`${data.user} diz: ${data.message}`)
      }, 100)
      // // this.$refs.scroll.$el.scroolBottom = this.$refs.scroll.$el.scrollHeight
      // console.log(this.$refs.scroll)
      // var objDiv = document.getElementById('message)
      // objDiv.scrollTop = objDiv.scrollHeight
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
