<template>
  <!-- popup code -->
  <div class="popup__box settings popup__medium">
    <div class="popup__box-header">
      <h4 class="popup__box-title">{{ envId !== 'new' ? 'Edit environment' : 'Add new environment' }}</h4>
      <button class="popup__box-close" @click="onClose">
        <svg width="15" height="14" viewbox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.87424 6.99995L14.715 1.54847C15.0951 1.19388 15.0951 0.620543 14.715 0.265947C14.335 -0.088649 13.7207 -0.088649 13.3408 0.265947L7.49993 5.71743L1.65922 0.265947C1.27911 -0.088649 0.665003 -0.088649 0.285078 0.265947C-0.0950259 0.620543 -0.0950259 1.19388 0.285078 1.54847L6.12579 6.99995L0.285078 12.4514C-0.0950259 12.806 -0.0950259 13.3794 0.285078 13.734C0.474418 13.9108 0.723371 13.9997 0.972147 13.9997C1.22092 13.9997 1.4697 13.9108 1.65922 13.734L7.49993 8.28248L13.3408 13.734C13.5303 13.9108 13.7791 13.9997 14.0279 13.9997C14.2767 13.9997 14.5254 13.9108 14.715 13.734C15.0951 13.3794 15.0951 12.806 14.715 12.4514L8.87424 6.99995Z"
            fill="#3C3C3C" />
        </svg>
      </button>
    </div>
    <loading-spinner height="574px" v-if="loading"/>
    <div v-else class="popup__box-main">
      <!-- form -->
      <form class="form">
        <fieldset class="edit-environment__details-block">
          <legend>Environment details</legend>
          <div class="edit-environment__details-block-env-name">
            <input
              v-model="envName"
              placeholder="Environment name"
              class="input__text input"
              autocomplete="off"
            >
            <span class="form-validation-error">{{ envNameError }}</span>
          </div>
          <div class="edit-environment__details-block-env-description">
            <input
              type="text"
              name="description"
              placeholder="Description"
              class="input__text input"
            >
          </div>

        </fieldset>
        <fieldset class="edit-environment__users-block">
          <legend>Visible only for users:</legend>
          <div>
            <multiselect
              v-model="visible_only"
              :searchable="true"
              :options="visibleOnlyOptions"
              mode="tags"
              @select="onUpdateVisibleOnly"
              @deselect="onUpdateVisibleOnly"
            />
          </div>
          <div>
            <p>Hidden for users: </p>
            <multiselect
              v-model="hidden"
              :searchable="true"
              :options="hiddenOptions"
              mode="tags"
              @select="onUpdateHidden"
              @deselect="onUpdateHidden"
            />
          </div>
        </fieldset>

        <!-- popup buttons -->
        <div class="popup__box-buttons">
          <button
            @click.prevent="onClose"
            class="button__large button__default close">Close</button>
          <button
            @click.prevent="onEnvEdit"
            class="button__large button__accent handle">{{ (envId === 'new') ? 'Add' : 'Save' }}</button>
        </div>
      </form>

    </div>
  </div>
</template>

<script>
import { REMOTE_REQUEST } from '@/store/actions/remoteActions'
import { useField } from 'vee-validate'
import Multiselect from '@vueform/multiselect'
import { ENV_REQUEST } from '@/store/actions/config'
import LoadingSpinner from '@/components/LoadingSpinner'

export default {
  components: {
    LoadingSpinner,
    Multiselect
  },
  props: {
    envId: String
  },
  data () {
    return {
      newEnv: true,
      loading: true,
      defaultScenario: -1,
      visible_only: [],
      hidden: [],
      options: [],
      usersAvailable: [],
      visibleOnlyOptions: {},
      hiddenOptions: {}
    }
  },
  setup () {
    function isRequired (value) {
      if (!value || !value.trim()) {
        return 'Environment name is required'
      }
      // if (value && value.trim()) {
      //   return 'true'
      // }
      if (value.length < 3) {
        return 'Environment name must contain at least 3 characters'
      }
      return true
    }
    const { value: envName, errorMessage: envNameError } = useField('fullName', isRequired)
    return {
      envName,
      envNameError
    }
  },
  beforeMount () {
    if (this.envId) {
      this.getAllUsers()
      this.prepareForm()
    }
  },
  watch: {
    envId () {
      if (this.envId) {
        this.getAllUsers()
        this.prepareForm()
      }
    }
  },
  methods: {
    onClose () {
      // this.$store.dispatch(UNBLUR_FIRST_POPUP)
      // this.$store.commit(HIDE_BACKDROP)
      this.$emit('onCloseBtnClick')
    },
    onEnvEdit () {
      const body = {
        env_name: this.envName,
        env_settings: {
          description: this.description,
          default_scenario: 1
        },
        available_for_users_id: {
          visible_only: this.visible_only,
          hidden: this.hidden
        }
      }
      const requestObj = {
        service: 'environments',
        path: '/environments',
        method: 'PUT',
        body: JSON.stringify(body),
        options: {}
      }
      let msg = 'Create new environment'
      if (this.envId !== 'new') {
        requestObj.path = '/environments/' + this.envId
        requestObj.method = 'POST'
        msg = 'Edit environment'
      }
      console.log('addEnvironment. onEnvEdit.' + msg + '. body: ', JSON.stringify(body))
      const popupOptions = {
        showDialog: true,
        alert: { scenario: 'environment_add' }
      }
      this.$store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
        .then(response => {
          console.log('addEnvironment. onAdd. response:', response)
          this.$store.dispatch(ENV_REQUEST)
          this.onClose()
          this.$emit('onAddEnv')
        })
        .catch((error) => {
          console.error('addEnvironment. onAdd. Error:', error)
        })
    },
    getAllUsers () {
      console.log('addEnvironment. getUsers.')
      const requestObj = {
        service: 'users',
        path: '/users/all',
        method: 'GET',
        body: null,
        options: {}
      }
      const msg = 'Get users list'
      const popupOptions = {
        showDialog: true
      }
      this.$store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
        .then(response => {
          console.log('addEnvironment. getUsers. response:', response)
          const usersList = []
          const userDict = {}
          response.users.forEach(user => {
            if (Number(user.user_id) > 1) {
              usersList.push({
                value: user.user_id,
                label: user.first_name + ' ' + user.second_name
              })
              userDict[user.user_id] = user.first_name + ' ' + user.second_name
            }
          })
          this.options = userDict
          this.loading = false
        })
        .catch((error) => {
          console.error('addEnvironment. getUsers. Error:', error)
          this.loading = false
        })
    },
    getEnvConfig () {
      console.log('addEnvironment. getEnvConfig. envId', this.envId)
      const requestObj = {
        service: 'environments',
        path: '/environments/' + this.envId,
        method: 'GET',
        body: null,
        options: {}
      }
      const msg = 'Get environment config'
      const popupOptions = {
        showDialog: true
      }
      this.$store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
        .then(response => {
          console.log('addEnvironment. getEnvConfig. response:', response.msg)
          this.envName = response.msg.env_name
          const visibleOnlyParsed = []
          const hiddenParsed = []
          response.msg.available_for_users_id.visible_only.forEach(envId => {
            visibleOnlyParsed.push(String(envId))
          })
          this.hidden = response.msg.available_for_users_id.hidden.forEach(envId => {
            hiddenParsed.push(String(envId))
          })
          this.visible_only = visibleOnlyParsed
          this.hidden = hiddenParsed
          this.description = response.msg.env_settings.description
          this.defaultScenario = response.msg.env_settings.default_scenario
          this.updateHiddenOptions()
          this.updateVisibleOnlyOptions()
        })
        .catch((error) => {
          console.error('addEnvironment. getEnvConfig. Error:', error)
        })
    },
    prepareForm () {
      // this.visible_only = []
      // this.hidden = []
      if (this.envId === 'new') {
        this.envName = ''
        this.description = ''
      } else {
        this.newEnv = false
        this.getEnvConfig()
      }
    },
    onUpdateVisibleOnly (id) {
      // console.log('addEnvironment. onUpdateVisibleOnly. id:', id)
      // console.log('hidden:', this.hidden)
      // console.log('visible_only:', this.visible_only)
      if (this.hidden.includes(String(id))) {
        console.log('addEnvironment. onUpdateVisibleOnly. removing env with id:', id)
        const index = this.hidden.findIndex(String(id))
        this.hidden.slice(index, 1)
      }
      this.updateHiddenOptions()
      this.updateVisibleOnlyOptions()
    },
    onUpdateHidden (id) {
      // console.log('addEnvironment. onUpdateHidden. id:', id)
      // console.log('hidden:', this.hidden)
      // console.log('visible_only:', this.visible_only)
      if (this.visible_only.includes(String(id))) {
        // console.log('addEnvironment. onUpdateHidden. removing env with id:', id)
        const index = this.visible_only.findIndex(String(id))
        this.visible_only.slice(index, 1)
      }
      this.updateHiddenOptions()
      this.updateVisibleOnlyOptions()
    },
    updateVisibleOnlyOptions () {
      const visibleOnlyOptionsDict = {}
      // console.log('addEnvironment. updateVisibleOnlyOptions', this.options)
      // console.log('hidden', this.hidden)
      // console.log('visible_only', this.visible_only)
      for (const [envId, envName] of Object.entries(this.options)) {
        if (!this.hidden.includes(String(envId))) {
          // console.log('addEnvironment. updateVisibleOnlyOptions', envName)
          visibleOnlyOptionsDict[envId] = envName
        } else {
          // console.log('addEnvironment. updateVisibleOnlyOptions. False', envId, envName)
        }
      }
      // console.log('addEnvironment. computed. visibleOnlyOptions', visibleOnlyOptionsDict)
      this.visibleOnlyOptions = visibleOnlyOptionsDict
    },
    updateHiddenOptions () {
      const hiddenOptionsDict = {}
      // console.log('addEnvironment. updateHiddenOptions', this.options)
      // console.log('hidden', this.hidden)
      // console.log('visible_only', this.visible_only)
      for (const [envId, envName] of Object.entries(this.options)) {
        if (!this.visible_only.includes(String(envId))) {
          // console.log('addEnvironment. updateHiddenOptions', envId, envName)
          hiddenOptionsDict[envId] = envName
        } else {
          // console.log('addEnvironment. updateHiddenOptions. False', envId, envName)
        }
      }
      // console.log('addEnvironment. computed. updateHiddenOptions', hiddenOptionsDict)
      this.hiddenOptions = hiddenOptionsDict
    }
  }
}
</script>

<style scoped>
.form-validation-error {
  color: red;
  font-style: italic;
  padding: 0 5px;
  transition: 0.28s;
}
.edit-environment__details-block {
  display: flex;
}
.edit-environment__details-block-env-name {
  width: 200px;
  padding-right: 5px;
}
.edit-environment__details-block-env-description {
  flex-grow: 1;
}
.edit-environment__users-block{
  display: flex;
  flex-direction: column;
  padding: 5px;
}
/*.edit-environment__users-select-block {*/
/*  padding: 5px ;*/
/*  !*display: flex;*!*/
/*  !*height: 100px;*!*/
/*}*/
</style>
