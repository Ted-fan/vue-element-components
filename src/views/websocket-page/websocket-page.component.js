import { initWebsocket, closeWebsocket, sendMessage } from '@/utils/websocket/websocket'
import wsStore from '@/utils/websocket/websocket-message'
export default {
  name: 'websocket-page',
  components: {},
  data() {
    return {
      sendMsg: '', // 发送消息
      messageList: [],
      currentUser: this.$store.getters.name
    }
  },
  computed: {
    receiveMsg: {
      get: function() {
        return wsStore.state.socketMsg.receiveMsg
      },
      set: function() { }
    }
  },
  watch: {
    receiveMsg(newValue) {
      newValue.current = false
      this.messageList.push(newValue)
    }
  },
  created() {
    this.initWebSocketConnect('123456')
  },
  beforeDestroy() {
    closeWebsocket()
  },
  mounted() {
  },
  methods: {
    // 初始化websocket连接
    initWebSocketConnect(groupId) {
      const uri = `uid=${this.$store.getters.token}&groupId=${groupId}`
      initWebsocket(uri)
    },

    // 发送消息
    sendNewMessage() {
      const toUser = this.$store.getters.token === 'admin-token' ? 'editor-token' : 'admin-token'
      // 定义消息内容
      const params = {
        fromUserId: this.$store.getters.name,
        toUserId: toUser,
        message: {
          from: this.$store.getters.name,
          fromUserId: this.$store.getters.token,
          to: toUser,
          msg: this.sendMsg,
          current: true
        },
        groupId: '123456'
      }
      // 发送消息
      sendMessage(params)
      this.messageList.push(params.message)
      // 发送成功后清除输入内容
      this.sendMsg = ''
    }
  }
}
