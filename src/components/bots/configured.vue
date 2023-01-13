<template>
  <div class="bots-dialog">
    <div class="bots-dialog__content">
      <div id="container" class="bots-dialog__content-sidebar">
        <div class="bots-dialog__content-bots-list">
          <div v-for="botObj in configuredBots" :key="botObj.bot_name">
            <div v-if="botObj.status === 'active'" class="bots-dialog__content-bots-list-item severity-green">
              <div>
                <voice-icon v-if="botObj.bot_name === 'voice'"/>
                <SMS-icon v-if="botObj.bot_name === 'sms'"/>
                <email-icon v-if="botObj.bot_name === 'email'"/>
                <telegram-icon v-if="botObj.bot_name === 'telegram'"/>
                <slack-icon v-if="botObj.bot_name === 'slack'"/>
                <jira-icon v-if="botObj.bot_name === 'jira'"/>
              </div>
              <div class="bots-dialog__content-bots-list-item-name"
                   :class="{'active': botObj.bot_name === chosenBotName}"
                   @click="openBot(botObj.bot_name)">
                {{ botObj.bot_name }}
              </div>
            </div>
            <div v-if="botObj.status === 'pending'" class="bots-dialog__content-bots-list-item severity-yellow">
              <div>
                <voice-icon v-if="botObj.bot_name === 'voice'"/>
                <SMS-icon v-if="botObj.bot_name === 'sms'"/>
                <email-icon v-if="botObj.bot_name === 'email'"/>
                <telegram-icon v-if="botObj.bot_name === 'telegram'"/>
                <slack-icon v-if="botObj.bot_name === 'slack'"/>
                <jira-icon v-if="botObj.bot_name === 'jira'"/>
              </div>
              <div class="bots-dialog__content-bots-list-item-name"
                   :class="{'active': botObj.bot_name === chosenBotName}"
                   @click="openBot(botObj.bot_name)">
                {{ botObj.bot_name }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="botName === 'voice'" class="bots-dialog__content-body">
        <div class="bots-dialog__content-body-item bots-dialog__content-body-item__height">
          <div>TWILIO_ACCOUNT_SID</div>
          <div>
            <input type="text" name="name" class="input__text input" size="50" v-model="botConfig.config.TWILIO_ACCOUNT_SID">
          </div>
        </div>
        <div class="bots-dialog__content-body-item bots-dialog__content-body-item__height">
          <div>TWILIO_AUTH_TOKEN</div>
          <div>
            <input type="text" name="name" class="input__text input" size="50" v-model="botConfig.config.TWILIO_AUTH_TOKEN">
          </div>
        </div>
        <div class="bots-dialog__content-body-item bots-dialog__content-body-item__height">
          <div>TWILIO_PHONE_NUMBER</div>
          <div>
            <input type="text" name="name" class="input__text input" size="50" v-model="botConfig.config.TWILIO_PHONE_NUMBER">
          </div>
        </div>
        <div>
          <button class="button__medium button__accent button_save"
                  style="margin-left: auto; margin-top: 10px"
                  @click="onSave">
            Save
          </button>
        </div>
        <div class="bots-dialog__content-bots-test-list">
            <input placeholder="Exp: +380986627571" type="text" name="name" class="input__text input input_test" size="50" v-model="TEST_PHONE_NUMBER">
            <button v-bind:disabled="!TEST_PHONE_NUMBER" class="button__medium button__accent button_test"
                    style="margin-left: auto; margin-top: 10px"
                    @click="onTest">
              Test
            </button>
        </div>
      </div>
      <div v-if="botName === 'sms'" class="bots-dialog__content-body">
        <div class="bots-dialog__content-body-item bots-dialog__content-body-item__height">
          <div>TWILIO_ACCOUNT_SID</div>
          <div>
            <input type="text" name="name" class="input__text input" size="50" v-model="botConfig.config.TWILIO_ACCOUNT_SID">
          </div>
        </div>
        <div class="bots-dialog__content-body-item bots-dialog__content-body-item__height">
          <div>TWILIO_AUTH_TOKEN</div>
          <div>
            <input type="text" name="name" class="input__text input" size="50" v-model="botConfig.config.TWILIO_AUTH_TOKEN">
          </div>
        </div>
        <div class="bots-dialog__content-body-item bots-dialog__content-body-item__height">
          <div>TWILIO_PHONE_NUMBER</div>
          <div>
            <input type="text" name="name" class="input__text input" size="50" v-model="botConfig.config.TWILIO_PHONE_NUMBER">
          </div>
        </div>
        <div>
          <button class="button__medium button__accent button_save"
                  style="margin-left: auto; margin-top: 10px"
                  @click="onSave">
            Save
          </button>
        </div>
        <div class="bots-dialog__content-bots-test-list">
          <input placeholder="Exp: +380986627571" type="text" name="name" class="input__text input input_test" size="50" v-model="TEST_PHONE_NUMBER">
          <button v-bind:disabled="!TEST_PHONE_NUMBER" class="button__medium button__accent button_test"
                  style="margin-left: auto; margin-top: 10px"
                  @click="onTest">
            Test
          </button>
        </div>
      </div>
      <div v-if="botName === 'email'" class="bots-dialog__content-body">
        <div class="bots-dialog__content-body-item bots-dialog__content-body-item__height">
          <div>EMAIL USER</div>
          <div>
            <input type="text" name="name" class="input__text input" size="50" v-model="botConfig.config.EMAIL_USER">
          </div>
        </div>
        <div class="bots-dialog__content-body-item bots-dialog__content-body-item__height">
          <div>EMAIL PASSWORD</div>
          <div>
            <input type="text" name="name" class="input__text input" size="50" v-model="botConfig.config.EMAIL_PASSWORD">
          </div>
        </div>
        <div>
          <button class="button__medium button__accent button_save"
                  style="margin-left: auto; margin-top: 10px"
                  @click="onSave">
            Save
          </button>
        </div>
        <div class="bots-dialog__content-bots-test-list">
          <input placeholder="Exp: email@gmail.com" type="text" name="name" class="input__text input input_test" size="50" v-model="TEST_EMAIL_ADDRESS">
          <button v-bind:disabled="!TEST_EMAIL_ADDRESS" class="button__medium button__accent button_test"
                  style="margin-left: auto; margin-top: 10px"
                  @click="onTest">
            Test
          </button>
        </div>
      </div>
      <div v-if="botName === 'jira'" class="bots-dialog__content-body">
        <div class="bots-dialog__content-body-item bots-dialog__content-body-item__height">
          <div>JIRA Server</div>
          <div>
            <input type="text" name="name" class="input__text input" size="50" v-model="botConfig.config.JIRA_SERVER">
          </div>
        </div>
        <div class="bots-dialog__content-body-item bots-dialog__content-body-item__height">
          <div>JIRA User</div>
          <div>
            <input type="text" name="name" class="input__text input" size="50" v-model="botConfig.config.JIRA_USER">
          </div>
        </div>
        <div class="bots-dialog__content-body-item bots-dialog__content-body-item__height">
          <div>JIRA Password</div>
          <div>
            <input type="text" name="name" class="input__text input" size="50" v-model="botConfig.config.JIRA_PASSWORD">
          </div>
        </div>
        <div>
          <button class="button__medium button__accent button_save"
                  style="margin-left: auto; margin-top: 10px"
                  @click="onSave">
            Save
          </button>
        </div>
      </div>
      <div v-if="botName === 'telegram'" class="bots-dialog__content-body">
        <div class="bots-dialog__content-body-item bots-dialog__content-body-item__height">
          <div>Bot Name</div>
          <div>
            <input type="text" name="name" class="input__text input" size="50" v-model="botConfig.config.BOT_NAME">
          </div>
        </div>
        <div class="bots-dialog__content-body-item bots-dialog__content-body-item__height">
          <div>Bot API Token</div>
          <div>
            <input type="text" name="name" class="input__text input" size="50" v-model="botConfig.config.BOT_API_TOKEN">
          </div>
        </div>
        <div>
          <button class="button__medium button__accent button_save"
                  style="margin-left: auto; margin-top: 10px"
                  @click="onSave">
            Save
          </button>
        </div>
        <div class="bots-dialog__content-bots-test-list">
          <input placeholder="CHAT_ID" type="text" name="name" class="input__text input input_test" size="50" v-model="TEST_TELEGRAM_CHAT_ID">
          <button v-bind:disabled="!TEST_TELEGRAM_CHAT_ID" class="button__medium button__accent button_test"
                  style="margin-left: auto; margin-top: 10px"
                  @click="onTest">
            Test
          </button>
        </div>
      </div>
      <div v-if="botName === 'slack'" class="bots-dialog__content-body">
        <div class="bots-dialog__content-body-item bots-dialog__content-body-item__height">
          <div>Slack Bot Token</div>
          <div>
            <input type="text" name="name" class="input__text input" size="50" v-model="botConfig.config.SLACK_TOKEN">
          </div>
        </div>
        <div>
          <button class="button__medium button__accent button_save"
                  style="margin-left: auto; margin-top: 10px"
                  @click="onSave">
            Save
          </button>
        </div>
        <div class="bots-dialog__content-bots-test-list">
          <input placeholder="CHANNEL NAME" type="text" name="name" class="input__text input input_test" size="50" v-model="TEST_SLACK_CHANNEL_NAME">
          <button v-bind:disabled="!TEST_SLACK_CHANNEL_NAME" class="button__medium button__accent button_test"
                  style="margin-left: auto; margin-top: 10px"
                  @click="onTest">
            Test
          </button>
        </div>
      </div>
    </div>
    <div class="bots-dialog__content-body-footer">
      <div class="popup__box-buttons">
        <button class="button__large button__default close" @click="closeDialog">Close</button>
      </div>
    </div>
    <confirmation-popup ref="confirmation"></confirmation-popup>
  </div>
</template>

<script>
import SMSIcon from '@/components/icons/destTypeIconSMS.vue'
import VoiceIcon from '@/components/icons/destTypeIconVoice.vue'
import EmailIcon from '@/components/icons/destTypeIconEmail.vue'
import TelegramIcon from '@/components/icons/destTypeIconTelegram.vue'
import SlackIcon from '@/components/icons/destTypeIconSlack.vue'
import JiraIcon from '@/components/icons/destTypeIconJira.vue'
import { REMOTE_REQUEST } from '@/store/actions/remoteActions'
import { TRIGGER_ERROR } from '@/store/actions/errorHandler'
import ndCopyBtn from '@/components/icons/ndCopyBtn'
import addBot from '@/components/bots/addBot'
import { HIDE_BOTS, HIDE_SECOND_BACKDROP, SHOW_SECOND_BACKDROP } from '@/store/actions/localActions'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import ConfirmationPopup from '@/components/popups/confirmationPopup'
import { ref } from 'vue'
export default {
  props: [
    'configuredBots',
    'environments',
    'preChosenBotName'
  ],
  emits: ['add-bot', 'update-bots-list'],
  components: {
    SMSIcon,
    VoiceIcon,
    EmailIcon,
    TelegramIcon,
    SlackIcon,
    JiraIcon,
    ndCopyBtn,
    addBot,
    ConfirmationPopup
  },
  setup () {
    const confirmation = ref(null)
    return { confirmation }
  },
  data () {
    return {
      search: '',
      bots: [],
      botToUpdate: {},
      chosenBotName: 0,
      newBot: false,
      botName: '',
      botConfig: '',
      showAddBotDialog: false,
      TEST_PHONE_NUMBER: '',
      TEST_EMAIL_ADDRESS: '',
      TEST_TELEGRAM_CHAT_ID: '',
      TEST_SLACK_CHANNEL_NAME: '',
      v$: useVuelidate()
    }
  },
  validations () {
    return {
      BotName: { required }
    }
  },
  computed: {
    formValid () {
      return !this.v$.$invalid
    },
    botNameValid () {
      return !this.v$.botName.$invalid
    }
  },
  mounted () {
    this.chosenBotName = this.preChosenBotName
    if (this.configuredBots.length > 0) {
      if (this.chosenBotName === 0) {
        this.openBot(this.configuredBots[0].bot_name)
      } else {
        this.openBot(this.chosenBotName)
      }
    }
    this.v$.$touch()
  },
  methods: {
    openBot (botName) {
      console.log('1bots. configured. openBot. botName:', botName)
      this.chosenBotName = botName
      this.botName = botName
      this.loading = true
      const requestObj = {
        service: 'bots',
        path: '/bots/' + botName,
        method: 'GET',
        options: {}
      }
      const msg = 'GET specific bot'
      const popupOptions = {
        showDialog: true
      }
      this.$store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
        .then(response => {
          console.log('botsDialog. onLoad. response:', response)
          this.botConfig = response
          console.log('ALALALAALA:', this.botConfig.config.TWILIO_ACCOUNT_SID)
          this.loading = true
        })
        .catch((error) => {
          const errorDescription = {
            errorObj: error,
            eventName: '',
            eventType: 'error',
            showError: true,
            message: 'Can\'t load bots.'
          }
          this.$store.dispatch(TRIGGER_ERROR, errorDescription)
          console.error('botsDialog. onLoad. Error:', error)
          this.loading = false
          // this.$router.go(-1)
        })
    },
    async onSave () {
      console.log('configured (bots). onSave. BotName', this.chosenBotName)
      const confirmation = await this.$refs.confirmation.showScenario('updateBotConfig')
      if (confirmation) {
        const voice_body = JSON.stringify({
          bot_name: this.botName,
          status: 'active',
          config: {
            TWILIO_ACCOUNT_SID: this.botConfig.config.TWILIO_ACCOUNT_SID,
            TWILIO_AUTH_TOKEN: this.botConfig.config.TWILIO_AUTH_TOKEN,
            TWILIO_PHONE_NUMBER: this.botConfig.config.TWILIO_PHONE_NUMBER
          }
        })
        const sms_body = JSON.stringify({
          bot_name: this.botName,
          status: 'active',
          config: {
            TWILIO_ACCOUNT_SID: this.botConfig.config.TWILIO_ACCOUNT_SID,
            TWILIO_AUTH_TOKEN: this.botConfig.config.TWILIO_AUTH_TOKEN,
            TWILIO_PHONE_NUMBER: this.botConfig.config.TWILIO_PHONE_NUMBER
          }
        })
        const email_body = JSON.stringify({
          bot_name: this.botName,
          status: 'active',
          config: {
            EMAIL_USER: this.botConfig.config.EMAIL_USER,
            EMAIL_PASSWORD: this.botConfig.config.EMAIL_PASSWORD
          }
        })

        const telegram_body = JSON.stringify({
          bot_name: this.botName,
          status: 'active',
          config: {
            BOT_API_TOKEN: this.botConfig.config.BOT_API_TOKEN,
            BOT_NAME: this.botConfig.config.BOT_NAME
          }
        })

        const slack_body = JSON.stringify({
          bot_name: this.botName,
          status: 'active',
          config: {
            SLACK_TOKEN: this.botConfig.config.SLACK_TOKEN
          }
        })

        const jira_body = JSON.stringify({
          bot_name: this.botName,
          status: 'active',
          config: {
            JIRA_SERVER: this.botConfig.config.JIRA_SERVER,
            JIRA_USER: this.botConfig.config.JIRA_USER,
            JIRA_PASSWORD: this.botConfig.config.JIRA_PASSWORD
          }
        })

        if (this.chosenBotName === 'voice') {
          this.bot_body = voice_body
        } else if (this.chosenBotName === 'sms') {
          this.bot_body = sms_body
        } else if (this.chosenBotName === 'email') {
          this.bot_body = email_body
        } else if (this.chosenBotName === 'telegram') {
          this.bot_body = telegram_body
        } else if (this.chosenBotName === 'slack') {
          this.bot_body = slack_body
        } else if (this.chosenBotName === 'jira') {
          this.bot_body = jira_body
        }

        const requestObj = {
          service: 'bots',
          path: '/bots/' + this.botName,
          method: 'POST',
          body: this.bot_body,
          options: {}
        }
        const msg = 'Update bots'
        console.log('configured (bots). onSave. requestObj:', requestObj)

        const popupOptions = {
          showDialog: true,
          alert: { scenario: 'bot_save' }
        }
        this.$store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
          .then(response => {
            console.log('botsDialog. onSave. chosenBotName:', this.chosenBotName, '. response:', response)
            this.loading = false
            this.$emit('update-bot', this.chosenBotName)
            if (this.configuredBots.length > 0) {
              this.openBot(this.configuredBots[0].bot_name)
            }
          })
          .catch((error) => {
            const errorDescription = {
              errorObj: error,
              eventName: 'update bot',
              eventType: 'error',
              showError: true,
              message: 'Can\'t update bot.'
            }
            this.$store.dispatch(TRIGGER_ERROR, errorDescription)
            console.error('bots. configured. onSave. Error:', error)
            this.loading = false
          })
      }
    },
    async onTest () {
      console.log('configured (bots). onTest. BotName', this.chosenBotName)
      const voice_test_body = JSON.stringify({
        to_number: this.TEST_PHONE_NUMBER,
        body: 'This is the test phone call from Harp',
        event_id: 123
      })
      const sms_test_body = JSON.stringify({
        to_number: this.TEST_PHONE_NUMBER,
        body: 'This is the test SMS from Harp',
        event_id: 123
      })
      const email_test_body = JSON.stringify({
        recipients: [this.TEST_EMAIL_ADDRESS],
        email_subject: 'This is the test Email Subject from Harp',
        email_body: 'This is the test Email Body from Harp',
        event_id: 'test_email'
      })

      const telegram_test_body = JSON.stringify({
        telegram_chat_id: this.TEST_TELEGRAM_CHAT_ID,
        title: 'This is my message title',
        text: 'this is my text',
        button_url: 'https://github.com/rveachkc/pymsteams/',
        facts: { key_1: 'value_1', key_2: 'value_2' },
        image_url: 'https://res.cloudinary.com/dvphzoqv8/image/upload/v1670918459/sample.jpg'
      })

      const slack_test_body = JSON.stringify({
        slack_channel: this.TEST_SLACK_CHANNEL_NAME,
        title: 'This is my message title',
        text: 'this is my text',
        button_url: 'https://github.com/rveachkc/pymsteams/',
        facts: { key_1: 'value_1', key_2: 'value_2' },
        image_url: 'https://res.cloudinary.com/dvphzoqv8/image/upload/v1670918459/sample.jpg'
      })

      if (this.chosenBotName === 'voice') {
        this.test_body = voice_test_body
        this.test_service = 'notifications-voice'
        this.test_path = '/notifications/' + this.botName
      } else if (this.chosenBotName === 'sms') {
        this.test_body = sms_test_body
        this.test_service = 'notifications-sms'
        this.test_path = '/notifications/' + this.botName
      } else if (this.chosenBotName === 'email') {
        this.test_body = email_test_body
        this.test_service = 'notifications-gmail'
        this.test_path = '/notifications/' + this.botName
      } else if (this.chosenBotName === 'telegram') {
        this.test_body = telegram_test_body
        this.test_service = 'notifications-telegram'
        this.test_path = '/notifications/' + this.botName
      } else if (this.chosenBotName === 'slack') {
        this.test_body = slack_test_body
        this.test_service = 'notifications-slack'
        this.test_path = '/notifications/' + this.botName
      }

      const requestObj = {
        service: this.test_service,
        path: this.test_path,
        method: 'POST',
        body: this.test_body,
        options: {}
      }
      const msg = 'Send Test'
      console.log('configured (bots). onTest. requestObj:', requestObj)

      const popupOptions = {
        showDialog: true,
        alert: { scenario: 'bot_voice_test' }
      }
      this.$store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
        .then(response => {
          console.log('botsDialog. onTest. chosenBotName:', this.chosenBotName, '. response:', response)
          this.loading = false
          this.$emit('update-bot', this.chosenBotName)
          if (this.configuredBots.length > 0) {
            this.openBot(this.configuredBots[0].bot_name)
          }
        })
        .catch((error) => {
          const errorDescription = {
            errorObj: error,
            eventName: 'update bot',
            eventType: 'error',
            showError: true,
            message: 'Can\'t update bot.'
          }
          this.$store.dispatch(TRIGGER_ERROR, errorDescription)
          console.error('bots. configured. onSave. Error:', error)
          this.loading = false
        })
    },
    scrollToEnd () {
      const container = this.$el.querySelector('#container')
      container.scrollTop = container.scrollHeight
    },
    closeDialog () {
      this.$store.commit(HIDE_BOTS)
    }
  }
}
</script>

<style scoped>
.bots-dialog {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-bottom: 20px;
}
.bots-dialog__navbar {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
@media screen and (max-width: 1200px), screen and (max-height: 730px){
  .bots-dialog__content {
    width: 100%;
    /*max-height: 100%;*/
    margin-top: 10px;
    height: 236px;
    display: flex;
    border: 1px solid rgba(156, 162, 172, 0.32);
    border-radius: 5px;
    padding: 5px;
    flex-grow: 1;
  }
  .bots-dialog__content-sidebar {
    min-width: 200px;
    border-right: 1px solid rgba(156, 162, 172, 0.32);
    overflow-y: auto;
  }
  .bots-dialog__content-bots-list {
    display: flex;
    flex-direction: column;
  }
  .bots-dialog__content-bots-test-list {
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 3%;
    top: 73%;
  }
  .input_test {
    width: 94%;
    padding: 6px 21px 6px;
  }
  .button_test {
    width: 25%;
    right: 21px;
    position: relative;
  }
  .bots-dialog__content-bots-list-item {
    display: flex;
    padding: 5px;
    border-radius: 6px;
    margin: 2px;
    align-items: center;
  }
  .bots-dialog__content-bots-list-item-name {
    padding: 5px;
    margin: 0 5px;
    border-radius: 5px;
    cursor: grab;
  }
  .bots-dialog__content-bots-list-item-name.active {
    background-color: #00C284
  ;
  }
  .bots-dialog__content-body {
    /*height: 70px;*/
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: scroll;
    min-height: 217px;
  }
  .button_save {
    position: absolute;
    right: 45px;
  }
  .bots-dialog__content-body-footer {
    height: 70px;
    display: flex;
    flex-direction: column;
  }
}
@media screen and (min-width: 1200px), screen and (min-height: 730px){
  .bots-dialog__content {
    width: 100%;
    max-height: 81%;
    margin-top: 10px;
    display: flex;
    border: 1px solid rgba(156, 162, 172, 0.32);
    border-radius: 5px;
    padding: 5px;
    flex-grow: 1;
  }
  .bots-dialog__content-sidebar {
    min-width: 200px;
    border-right: 1px solid rgba(156, 162, 172, 0.32);
    overflow-y: auto;
  }
  .bots-dialog__content-bots-list {
    display: flex;
    flex-direction: column;
  }
  .bots-dialog__content-bots-list-item {
    display: flex;
    padding: 5px;
    border-radius: 6px;
    margin: 2px;
    align-items: center;
  }
  .bots-dialog__content-bots-list-item-name {
    padding: 5px;
    margin: 0 5px;
    border-radius: 5px;
    cursor: grab;
  }
  .bots-dialog__content-bots-list-item-name.active {
    background-color: #00C284
  ;
  }
  .bots-dialog__content-body {
    height: 70px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }
  .bots-dialog__content-body-footer {
    height: 70px;
    display: flex;
    flex-direction: column;
  }

  .bots-dialog__content-bots-test-list {
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 3%;
    top: 73%;
  }
  .button_save {
    position: absolute;
    right: 45px;
  }
  .input_test {
    width: 94%;
    padding: 6px 21px 6px;
  }
  .button_test {
    width: 25%;
    right: 21px;
    position: relative;
  }
}

.bots-dialog__content-body-item {
  /*border-bottom: 1px solid rgba(156, 162, 172, 0.32);*/
  padding: 5px;
  margin: 0 10px;
  display: flex;
  align-items: center;
}
.bots-dialog__test {
  padding: 5px;
  margin: 0 10px;
  display: flex;
  align-items: center;
  position: absolute;
  bottom: 1px;
}
.bots-dialog__content-body-item__height {
  line-height: 42px;
  /*min-height: 42px;*/
}
.bots-dialog__content-body-item > div {
 padding: 0 5px;
}
.bots-dialog__content-body-item > div:first-child {
  padding: 0 5px;
  width: 200px;
}

.bots-url {
  flex-grow: 1;
}
.severity-red {
  border-left: 4px solid red;
}
.severity-green {
  border-left: 4px solid green;
}

.severity-yellow {
  border-left: 4px solid #9a9c44;
}

</style>

<style lang="scss">
  .bots-dialog__content-body-item .button__icon {
    width: 21px;
    height: 21px;
  }
  .bots-dialog__content-body-item .input {
    padding: 6px 12px 6px;
  }
</style>
