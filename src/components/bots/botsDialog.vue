<template>
  <div class="main-client-dialog" style="width: 840px;">
    <div class="main-client-dialog__background-filter" v-if="showSecondBackDrop"></div>
    <div class="popup__box-header">
      <h4 class="popup__box-title">Bots</h4>
      <button class="popup__box-close" @click="hideSettings">
        <svg width="15" height="14" viewbox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.87424 6.99995L14.715 1.54847C15.0951 1.19388 15.0951 0.620543 14.715 0.265947C14.335 -0.088649 13.7207 -0.088649 13.3408 0.265947L7.49993 5.71743L1.65922 0.265947C1.27911 -0.088649 0.665003 -0.088649 0.285078 0.265947C-0.0950259 0.620543 -0.0950259 1.19388 0.285078 1.54847L6.12579 6.99995L0.285078 12.4514C-0.0950259 12.806 -0.0950259 13.3794 0.285078 13.734C0.474418 13.9108 0.723371 13.9997 0.972147 13.9997C1.22092 13.9997 1.4697 13.9108 1.65922 13.734L7.49993 8.28248L13.3408 13.734C13.5303 13.9108 13.7791 13.9997 14.0279 13.9997C14.2767 13.9997 14.5254 13.9108 14.715 13.734C15.0951 13.3794 15.0951 12.806 14.715 12.4514L8.87424 6.99995Z"
            fill="#3C3C3C" />
        </svg>
      </button>
    </div>
    <div class="bots-page__content">
      <loading-spinner height="500px" v-if="loading"></loading-spinner>
      <div v-else class="tabs" style="height: 100%">
        <div class="tabs__bar">
          <button class="info"
                  :class="{active: show === 'configured'}"
                  @click="show = 'configured'">Configured</button>
        </div>
        <!--          <div v-if="error">{{ error }}</div>-->
        <div class="tabs__content" style="height: 100%;">
          <configured
            :configured-bots="configuredBots"
            :preChosenBotName="chosenBotName"
            @update-bots-list="onLoad"
            @add-bot="addBot"
            @delete-bot="deleteBot"
            v-show="show === 'configured'"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { HIDE_BOTS } from '@/store/actions/localActions'
import { SCENARIOS_REQUEST, AVAILABLE_BOTS_REQUEST } from '@/store/actions/config'
import store from '@/store'
import createNew from '@/components/bots/createNew'
import configured from '@/components/bots/configured'
import requestNew from '@/components/bots/requestNew'
import { REMOTE_REQUEST } from '@/store/actions/remoteActions'
import { TRIGGER_ERROR } from '@/store/actions/errorHandler'
import LoadingSpinner from '@/components/LoadingSpinner'

export default {
  components: {
    createNew,
    configured,
    requestNew,
    LoadingSpinner
  },
  data () {
    return {
      show: 'configured',
      chosenBotName: 'default',
      profile: null,
      loading: false,
      configuredBots: []
    }
  },
  computed: {
    showSecondBackDrop () {
      console.log('botsDialog. showSecondBackDrop')
      return store.getters.showSecondBackDrop
    }
    // environments () {
    //   return store.getters.getEnv
    // }
  },
  beforeMount () {
    console.log('botsDialog. beforeMount')
    this.onLoad(0)
  },
  methods: {
    hideSettings () {
      this.$store.commit(HIDE_BOTS)
    },
    onLoad (bot_name) {
      console.log('botsDialog. onLoad')
      this.chosenBotName = bot_name
      this.loading = true
      this.$store.dispatch(AVAILABLE_BOTS_REQUEST)
      const requestObj = {
        service: 'bots',
        path: '/bots/all',
        method: 'GET',
        options: {}
      }
      const msg = 'GET bots'
      const popupOptions = {
        showDialog: true
      }
      this.$store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
        .then(response => {
          console.log('botsDialog. onLoad. response:', response)
          this.configuredBots = response.bots
          this.loading = false
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
    addBot (newBot) {
      console.log('botsDialog. methods. addBot. newBot:', newBot)
      this.configuredBots.push(newBot)
    },
    deleteBot (botName) {
      console.log('botsDialog. methods. deleteBot. BotName:', botName)
      const elementIndex = this.configuredBots.findIndex(
        botObj => botObj.bot_name === botName
      )
      if (elementIndex !== -1) {
        console.log('botDialog. methods. deleteBot. elementIndex:', elementIndex)

        this.configuredBots.splice(elementIndex, 1)
      } else {
        console.log('botsDialog. methods. deleteBot. elementIndex wasn\'t found')
      }
    }
  }
}
</script>

<style scoped>
@media screen and (max-width: 1200px), screen and (max-height: 730px){
  .main-client-dialog__background-filter {
    height: 100%;
    width: 100%;
    /*background-color: black;*/
    /*opacity: 30%;*/
    backdrop-filter: blur(2px) brightness(70%);
    -webkit-backdrop-filter: blur(2px) brightness(70%);
    position: absolute;
    z-index: 5;
  }
  .main-client-dialog {
    position: fixed;
    width: 1200px;
    height: 500px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #e6e6e6;
    z-index: 10;
    display: flex;
    flex-direction: column;
    /*justify-content: space-between;*/
  }
  .bots-page__content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    max-height: 86%;
    background: var(--c-white);
    padding: 0 20px;
    /*margin: 18px;*/
  }
}
@media screen and (min-width: 1200px), screen and (min-height: 730px){
  .main-client-dialog__background-filter {
    height: 100%;
    width: 100%;
    /*background-color: black;*/
    /*opacity: 30%;*/
    backdrop-filter: blur(2px) brightness(70%);
    -webkit-backdrop-filter: blur(2px) brightness(70%);
    position: absolute;
    z-index: 5;
  }
  .main-client-dialog {
    position: fixed;
    width: 1200px;
    height: 700px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #e6e6e6;
    z-index: 10;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .bots-page__content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    max-height: 86%;
    background: var(--c-white);
    padding: 20px;
    /*margin: 18px;*/
  }
}

/*.settings-page__content {*/
/*  display: flex;*/
/*  !*flex-direction: column;*!*/
/*  justify-content: space-between;*/
/*  background: var(--c-white);*/
/*  padding: 20px;*/
/*  !*border-radius: var(--r-radius);*!*/
/*  margin: 18px;*/
/*  flex-grow: 1;*/
/*  !*height: 574px;*!*/
/*}*/
/*.settings-page__content .tabs {*/
/*  !*height: 100%;*!*/
/*  display: flex;*/
/*  flex-direction: column;*/
/*  justify-content: space-between;*/
/*  flex-grow: 1;*/
/*}*/
/*.settings-page__content .tabs__content {*/
/*  display: flex;*/
/*  flex-direction: column;*/
/*  justify-content: space-between;*/
/*}*/

</style>
