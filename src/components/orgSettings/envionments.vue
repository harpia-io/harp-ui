<template>
  <div>
<!--    <div class="backdrop backdrop-settings" style="z-index: 3" v-if="showSettingsBackdrop"></div>-->
    <add-environment
      v-show="showAddEnvironment"
      @onCloseBtnClick="onCloseBtnClick"
      class="settings-org__popup"
      @onAddEnv="getOrgEnvironments"
      :envId="envIdToEdit"
    />
    <div class="settings-page__content-tabs-body">
      <div class="tabs__box">
        <!-- left -->
        <div class="tabs__box-in">
          <div class="search__box">
            <input type="search" name="search" placeholder="Search"
                   class="input__search input" v-model="search">
            <button type="submit">
              <svg width="16" height="16" viewbox="0 0 16 16" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M7.3548 2.22577C4.52211 2.22577 2.22577 4.52211 2.22577 7.3548C2.22577 10.1875 4.52211 12.4838 7.3548 12.4838C10.1875 12.4838 12.4838 10.1875 12.4838 7.3548C12.4838 4.52211 10.1875 2.22577 7.3548 2.22577ZM0.225769 7.3548C0.225769 3.41755 3.41755 0.225769 7.3548 0.225769C11.2921 0.225769 14.4838 3.41755 14.4838 7.3548C14.4838 9.12768 13.8367 10.7494 12.7657 11.9966L15.3477 14.5786L13.9334 15.9928L11.2604 13.3198C10.1386 14.0558 8.79671 14.4838 7.3548 14.4838C3.41755 14.4838 0.225769 11.2921 0.225769 7.3548Z"
                      fill="#9CA2AC" />
              </svg>
            </button>
          </div>
        </div>
        <!-- right -->
        <div class="tabs__box-in">
          <button
            class="add__new"
            style="margin: 0 0 0 auto;"
            @click="addEnvironment"
          >
            <svg width="11" height="12" viewbox="0 0 11 12" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.6 6.09995C10.6 6.59995 10.2 6.99995 9.7 6.99995H6.1V10.4C6.1 10.9 5.7 11.3 5.2 11.3C4.7 11.3 4.3 10.9 4.3 10.4V6.99995H0.9C0.4 6.99995 0 6.59995 0 6.09995C0 5.59995 0.4 5.19995 0.9 5.19995H4.3V1.59995C4.3 1.09995 4.7 0.699951 5.2 0.699951C5.7 0.699951 6.1 1.09995 6.1 1.59995V5.19995H9.7C10.2 5.19995 10.6 5.59995 10.6 6.09995Z"
                fill="#00C284" />
            </svg>
            Add new environment
          </button>
        </div>
      </div>
      <table class="org-environments-table table-scroll">
        <thead>
        <tr>
          <th class="env-table__id-column-header">Id</th>
          <th>Environment name</th>
          <th>Default scenario </th>
          <th>Users</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody class="body-half-screen">
        <loading-spinner v-if="loading"></loading-spinner>
        <tr v-for="(envObj, envId, environmentId) in envsDict"
            :key="environmentId">
          <!--Id-->
          <td class="env-table__id-column-header">{{ envId }}</td>
          <!--Environment name-->
          <td>{{ envObj }}</td>
          <!--Default scenarios-->
          <td>OPs default</td>
          <!--Users-->
          <td>All</td>
          <td>
            <div class="env-table__buttons-cell">
              <!--Edit environment-->
              <div class="">
                <button
                  @click="editEnvironment(envId)"
                  class="button__icon-transparent">
                  <svg width="16" height="16" viewbox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.63671 13.8682C1.57824 13.8098 1.52477 13.748 1.47557 13.6836C1.4381 13.6344 1.40319 13.5836 1.37133 13.5312L1.00646 14.6023L0.775867 15.2796C0.718616 15.4475 0.760853 15.6121 0.858753 15.7293C1.00255 15.8842 1.22264 15.9081 1.36888 15.8733L3.11632 15.2804C3.00341 15.2097 2.89745 15.1261 2.80077 15.0297L1.63671 13.8682Z" fill="#3C3C3C"/>
                    <path d="M15.0657 3.08881C15.0657 3.08881 13.9962 2.03779 13.5759 1.65473C13.2632 1.3863 12.8671 1.43842 12.6321 1.69209L11.9189 2.40754L14.2744 4.75775C14.2755 4.75885 14.2764 4.76007 14.2775 4.76117L14.3049 4.73383L15.0658 3.97431C15.3105 3.72992 15.3105 3.3332 15.0657 3.08881Z" fill="#3C3C3C"/>
                    <path d="M11.2544 3.07007L9.95801 4.36414L12.3153 6.71606C12.3159 6.71667 12.3163 6.71716 12.3168 6.71765L13.6133 5.42346C13.6127 5.42285 13.6119 5.42236 13.6113 5.42163L11.2544 3.07007Z" fill="#3C3C3C"/>
                    <path d="M4.33001 14.5675C4.44903 14.5275 4.56073 14.4602 4.65557 14.3655L11.6535 7.38025C11.6535 7.38025 11.6535 7.38025 11.6534 7.38013L9.29473 5.02686L2.29937 12.0096C2.20355 12.1051 2.1358 12.218 2.09552 12.338C1.997 12.6323 2.06475 12.97 2.29949 13.2041L3.46356 14.3656C3.62823 14.5299 3.84393 14.6121 4.0595 14.6121C4.15106 14.6121 4.24249 14.5972 4.33001 14.5675Z" fill="#3C3C3C"/>
                  </svg>
                </button>
              </div>
              <!--Copy ID-->
              <nd-copy-btn-transparant v-clipboard:copy="envId"/>
              <!--Remove environment-->
              <div class="">
                <button v-show="Number(envId) > 100"
                        class="button__icon-transparent"
                        @click="removeEnvironment(envId)"
                >
                  <svg width="16" height="16" viewbox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.66797 0.96582H9.34204V1.41577H10.3077V0.902832C10.3079 0.405029 9.90308 0 9.40552 0H6.60449C6.10693 0 5.70215 0.405029 5.70215 0.902832V1.41577H6.66797V0.96582Z" fill="#3C3C3C"/>
                    <path d="M12.5382 5.24219H3.47224C3.22382 5.24219 3.02827 5.4541 3.04829 5.70178L3.80622 15.0739C3.84846 15.597 4.28486 16 4.80915 16H11.2011C11.7254 16 12.1618 15.597 12.204 15.0737L12.962 5.70178C12.9821 5.4541 12.7866 5.24219 12.5382 5.24219ZM5.66743 15.0004C5.65729 15.001 5.64716 15.0013 5.63715 15.0013C5.38398 15.0013 5.17145 14.8042 5.15571 14.5481L4.68073 6.85413C4.66437 6.58789 4.86689 6.35876 5.133 6.34241C5.39826 6.32629 5.62836 6.52832 5.64472 6.79468L6.11958 14.4886C6.13605 14.7549 5.93354 14.9839 5.66743 15.0004ZM8.49348 14.5184C8.49348 14.785 8.27729 15.0012 8.01057 15.0012C7.74384 15.0012 7.52766 14.785 7.52766 14.5184V6.82434C7.52766 6.55762 7.74384 6.34143 8.01057 6.34143C8.27717 6.34143 8.49348 6.55762 8.49348 6.82434V14.5184ZM11.3297 6.85278L10.8762 14.5468C10.8612 14.8033 10.6483 15.0012 10.3946 15.0012C10.3851 15.0012 10.3754 15.001 10.3658 15.0005C10.0996 14.9847 9.89643 14.7562 9.91218 14.49L10.3655 6.7959C10.3812 6.52966 10.609 6.32654 10.8759 6.34229C11.1422 6.35791 11.3453 6.58655 11.3297 6.85278Z" fill="#3C3C3C"/>
                    <path d="M14.2077 3.75195L13.8906 2.80127C13.807 2.55066 13.5724 2.38159 13.3081 2.38159H2.70152C2.43736 2.38159 2.20262 2.55066 2.11912 2.80127L1.80199 3.75195C1.74083 3.9353 1.82042 4.12231 1.96898 4.21558C2.02952 4.25354 2.10118 4.27637 2.17992 4.27637H13.8298C13.9086 4.27637 13.9803 4.25354 14.0408 4.21545C14.1893 4.12219 14.2689 3.93518 14.2077 3.75195Z" fill="#3C3C3C"/>
                  </svg>
                </button>
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div class="popup__box-buttons">
      <button class="button__large button__default close" @click="toggleOrgSettings">Close</button>
    </div>
    <confirmation-popup ref="confirmation"></confirmation-popup>
  </div>
</template>

<script>
import { REMOTE_REQUEST } from '@/store/actions/remoteActions'
import addEnvironment from '@/components/orgSettings/addEnvironment'
import {
  SHOW_SECOND_BACKDROP,
  HIDE_SECOND_BACKDROP,
  HIDE_SETTINGS
} from '@/store/actions/localActions'
import { BLUR_FIRST_POPUP, ENV_REQUEST } from '@/store/actions/config'
import { SHOW_BACKDROP } from '@/store/actions/notificationActions'
import NdCopyBtnTransparant from '@/components/icons/ndCopyBtnTransparant'
import ConfirmationPopup from '@/components/popups/confirmationPopup';
import { ref } from 'vue'
import LoadingSpinner from '@/components/LoadingSpinner';

export default {
  components: {
    LoadingSpinner,
    ConfirmationPopup,
    NdCopyBtnTransparant,
    addEnvironment
  },
  data () {
    return {
      loading: false,
      environments: {},
      scenarios: {},
      envIdToEdit: null,
      showAddEnvironment: false,
      search: ''
    }
  },
  computed: {
    envDict () {
      return this.environments
    },
    envId () {
      return this.envIdToEdit
    },
    envsDict () {
      if (this.search.length > 0) {
        const envsDict = {}
        for (const [key, value] of Object.entries(this.environments)) {
          if (value.toLowerCase().includes(this.search.toLowerCase())) {
            envsDict[key] = value
          }
        }
        return envsDict
      }
      return this.environments
    },
    showSettingsBackdrop () {
      return this.$store.getters.showSettingsSecondDialog
    }
  },
  beforeMount () {
    this.getOrgEnvironments()
  },
  setup () {
    const confirmation = ref(null)
    return { confirmation }
  },
  methods: {
    onCloseBtnClick () {
      this.showAddEnvironment = false
      this.$store.commit(HIDE_SECOND_BACKDROP)
    },
    getOrgEnvironments () {
      this.loading = true
      console.log('settingsOrgEnvironments. getOrgEnvironments.')
      this.envIdToEdit = null
      const requestObj = {
        service: 'environments',
        path: '/environments/all',
        method: 'GET',
        body: null,
        options: {}
      }
      const msg = 'Collect environments list'
      const popupOptions = {
        showDialog: true
      }
      this.$store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
        .then(response => {
          console.log('settingsOrgEnvironments. getOrgEnvironments. response:', response)
          this.environments = response
          this.loading = false
        })
        .catch((error) => {
          this.loading = false
          console.error('settingsOrgEnvironments. getOrgEnvironments. Error:', error)
        })
    },
    addEnvironment () {
      console.log('settingsOrgEnvironments. addEnvironment')
      this.envIdToEdit = 'new'
      this.showAddEnvironment = true
      this.$store.commit(SHOW_SECOND_BACKDROP)
      // this.$store.dispatch(BLUR_FIRST_POPUP)
      // this.$store.commit(SHOW_BACKDROP)
    },
    editEnvironment (envId) {
      console.log('settingsOrgEnvironments. editEnvironment. envId:', envId)
      this.envIdToEdit = envId
      this.showAddEnvironment = true
      this.$store.commit(SHOW_SECOND_BACKDROP)
      // this.$store.dispatch(BLUR_FIRST_POPUP)
      // this.$store.commit(SHOW_BACKDROP)
    },
    async removeEnvironment (envId) {
      const confirmation = await this.$refs.confirmation.showScenario('delete')
      if (confirmation) {
        const requestObj = {
          service: 'environments',
          path: '/environments/' + envId,
          method: 'DELETE',
          body: null,
          options: {}
        }
        const msg = 'Delete environment'
        const popupOptions = {
          showDialog: true,
          alert: { scenario: 'environment_delete' }
        }
        this.$store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
          .then(response => {
            console.log('settingsOrgEnvironments. removeEnvironment. response:', response)
            this.$store.dispatch(ENV_REQUEST)
            this.getOrgEnvironments()
          })
          .catch((error) => {
            console.error('settingsOrgEnvironments. removeEnvironment. Error:', error)
          })
      }
    },
    toggleOrgSettings () {
      this.$store.commit(HIDE_SETTINGS)
    }
  }
}
</script>

<style scoped lang="scss">
.scenario-block {
  display: flex;
}
/*.org-environments {*/
/*  max-height: 600px;*/
/*  width: 100%;*/
/*}*/
.org-environments-table{
  /*padding: 20px 0;*/
  /*width: 100%;*/
}
.org-environments-table th{
  position: sticky;
  top: 0;
  /*margin: 20px 0;*/
  border-collapse: collapse;
}
.env-table__id-column-header {
  width: 60px;
}
.env-table__active-cell {
  text-align: center;
}
.settings-org-env__add-environment {
  border: 2px solid #352424;
  z-index: 1;
}
.env-table__buttons-cell {
  display: flex;
  max-width: 100px;
  /*align-content: center;*/
  justify-content: space-between;
  > * {
    flex: 1 0;
  }
}
.small-col{flex-basis:20%;}
</style>
