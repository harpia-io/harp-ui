<template>
<!--  <div class="settings-page__background-filter"></div>-->
    <div class="settings-page">
      <div class="settings-page__background-filter" v-if="showSecondBackDrop"></div>
      <div class="popup__box-header">
        <h4 class="popup__box-title">Organization settings</h4>
        <button class="popup__box-close" @click="hideSettings">
          <svg width="15" height="14" viewbox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.87424 6.99995L14.715 1.54847C15.0951 1.19388 15.0951 0.620543 14.715 0.265947C14.335 -0.088649 13.7207 -0.088649 13.3408 0.265947L7.49993 5.71743L1.65922 0.265947C1.27911 -0.088649 0.665003 -0.088649 0.285078 0.265947C-0.0950259 0.620543 -0.0950259 1.19388 0.285078 1.54847L6.12579 6.99995L0.285078 12.4514C-0.0950259 12.806 -0.0950259 13.3794 0.285078 13.734C0.474418 13.9108 0.723371 13.9997 0.972147 13.9997C1.22092 13.9997 1.4697 13.9108 1.65922 13.734L7.49993 8.28248L13.3408 13.734C13.5303 13.9108 13.7791 13.9997 14.0279 13.9997C14.2767 13.9997 14.5254 13.9108 14.715 13.734C15.0951 13.3794 15.0951 12.806 14.715 12.4514L8.87424 6.99995Z"
              fill="#3C3C3C" />
          </svg>
        </button>
      </div>
      <div class="settings-page__content">
        <!-- tabs -->
        <div class="tabs">
          <div class="tabs__bar">
            <button class="info"
                    :class="{active: show === 'profile'}"
                    @click.prevent="show = 'profile'">User profile</button>
            <button class="info"
                    v-show="profile.role === 'admin'"
                    :class="{active: show === 'environments'}"
                    @click.prevent="show = 'environments'">Environments</button>
            <button v-show="profile.role === 'admin'"
                    :class="{active: show === 'members'}"
                    class="members" @click.prevent="show = 'members'">Members</button>
            <button class="license"
                    v-show="profile.role === 'admin'"
                    :class="{active: show === 'licenses'}"
                    @click.prevent="show = 'licenses'">License</button>
          </div>
          <!--          <div v-if="error">{{ error }}</div>-->
          <div class="tabs__content">
            <user-profile v-show="show === 'profile'" />
            <environments v-show="profile.role === 'admin' && show === 'environments'"/>
            <members v-show="profile.role === 'admin' && show === 'members'" :show="show"/>
            <licenses v-show="profile.role === 'admin' && show === 'licenses'" :show="show"/>
          </div>
        </div>
        <!-- end tabs -->
      </div>
    </div>
</template>

<script>

import userProfile from '@/components/orgSettings/userProfile'
import Environments from '@/components/orgSettings/envionments'
import Licenses from '@/components/orgSettings/licenses'
import Members from '@/components/orgSettings/members'
import store from '@/store'
import { TOGGLE_ORG_SETTINGS, SHOW_SETTINGS, HIDE_SETTINGS } from '@/store/actions/localActions'

export default {
  components: {
    Environments,
    Licenses,
    Members,
    userProfile
  },
  computed: {
    globalFilter () {
      return store.state.config.blurMainLayout
    },
    showSecondBackDrop () {
      return store.getters.showSecondBackDrop
    }
  },
  beforeMount () {
    this.onLoad()
  },
  data () {
    return {
      show: 'profile',
      profile: null
    }
  },

  methods: {
    onLoad () {
      this.profile = store.getters.getProfile
      console.log('OrgSettings. onLoad. profile:', this.profile)
    },
    // toggleOrgSettings () {
    //   this.$store.dispatch(TOGGLE_ORG_SETTINGS)
    // },
    hideSettings () {
      this.$store.commit(HIDE_SETTINGS)
    }
  }
}
</script>

<style>
.settings-page__background-filter {
  height: 100%;
  width: 100%;
  /*background-color: black;*/
  /*opacity: 30%;*/
  backdrop-filter: blur(2px) brightness(70%);
  -webkit-backdrop-filter: blur(2px) brightness(70%);
  position: absolute;
  z-index: 5;
}
@media screen and (max-width: 1200px) {
  .settings-page {
    position: fixed;
    width: 950px;
    height: 500px;
    /*padding: 20px;*/
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #e6e6e6;
    z-index: 10;
    /*border: 2px solid #d4d4d4;*/
    /*border-radius: 12px;*/
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
@media screen and (min-width: 1200px) {
  .settings-page {
    position: fixed;
    width: 1200px;
    height: 700px;
    /*padding: 20px;*/
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #e6e6e6;
    z-index: 10;
    /*border: 2px solid #d4d4d4;*/
    /*border-radius: 12px;*/
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
/*.settings-page {*/
/*  position: fixed;*/
/*  width: 1200px;*/
/*  height: 700px;*/
/*  !*padding: 20px;*!*/
/*  top: 50%;*/
/*  left: 50%;*/
/*  transform: translate(-50%, -50%);*/
/*  background: #e6e6e6;*/
/*  z-index: 10;*/
/*  !*border: 2px solid #d4d4d4;*!*/
/*  !*border-radius: 12px;*!*/
/*  display: flex;*/
/*  flex-direction: column;*/
/*  justify-content: space-between;*/
/*}*/
.settings-page__content {
  display: flex;
  /*flex-direction: column;*/
  justify-content: space-between;
  background: var(--c-white);
  padding: 20px;
  /*border-radius: var(--r-radius);*/
  margin: 18px;
  flex-grow: 1;
  overflow-y: scroll;
  /*height: 574px;*/
}
.settings-page__content .tabs {
  /*height: 100%;*/
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
}
.settings-page__content .tabs__content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.settings-page__content-tabs-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-grow: 1;
}
.second-popup {
  z-index: 6;
}
</style>
