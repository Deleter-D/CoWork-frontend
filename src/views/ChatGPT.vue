<template>
  <div class="conversation">
    <va-card color="#fff" style="height: 73vh;width: 83vw">
      <va-card-content style="text-align: left">
        <va-scroll-container vertical style="height: 70vh;" id="scroll_container">
          <div v-for="(scrip, index) in this.chat" :key="index">
            <Conversation
              :role="scrip.role==='assistant'?'神奇海螺':this.$store.getters.GET_USERNAME"
              :content="scrip.content"
              :style="determinePosition(scrip)"/>
            <div style="height: 1vh"/>
          </div>
        </va-scroll-container>
      </va-card-content>
    </va-card>
  </div>
  <div class="input">
    <va-card
      color="#008F8C"
      style="width: 83vw">
      <va-card-title>来问问神奇海螺吧~</va-card-title>
      <va-card-content>
        <div class="row">
          <div class="flex flex-col md10">
            <div class="item">
              <va-input style="width: 90%"
                        v-model="inputMessage"/>
            </div>
          </div>
          <div class="flex flex-col md1">
            <div class="item">
              <va-button
                round
                color="#015958"
                style="width: 100%"
                @click="send">发送
              </va-button>
            </div>
          </div>
        </div>
      </va-card-content>
    </va-card>
  </div>
</template>

<script>
import Conversation from '@/components/Conversation.vue'
import axios from 'axios'

export default {
  name: 'ChatGPT',
  components: { Conversation },
  data () {
    return {
      chat: [],
      chatLength: 0,
      inputMessage: null,
      styleObject: {
        left: '20vw'
      }
    }
  },
  methods: {
    send () {
      if (this.inputMessage !== null && this.inputMessage !== '') {
        this.chat.push({
          role: 'user',
          content: this.inputMessage
        })
        axios.post('https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'user',
                content: this.inputMessage
              }
            ]
          },
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer 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'
            }
          })
          .then((res) => {
            const message = res.data.choices[0].message
            this.chat.push({
              role: message.role,
              content: message.content
            })
          })
        this.inputMessage = null
        this.chatLength++
      }
    },
    determinePosition (scrip) {
      if (scrip.role === 'user') {
        return { left: '20vw' }
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.chat.push({
        role: 'assistant',
        content: '你好，我是神奇海螺~'
      })
    }, 300)
  },
  watch: {
    chatLength (newVal, oldVal) {
      console.log(oldVal)
      console.log(newVal)
      if (newVal !== oldVal) {
        document.getElementById('scroll_container').scrollBy({
          top: 1000,
          behavior: 'smooth'
        })
      }
    }
  }
}
</script>

<style scoped>
.conversation {
  position: absolute;
  top: 7vh;
  left: 16vw;
}

.input {
  position: absolute;
  bottom: 5vh;
  left: 16vw;
}
</style>
