<template>
  <div v-if="editUser" class="popup__box settings popup__medium second-popup">
    <div class="popup__box-header">
      <h4 class="popup__box-title">Edit user profile</h4>
      <button class="popup__box-close" @click.prevent="onClose">
        <svg width="15" height="14" viewbox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.87424 6.99995L14.715 1.54847C15.0951 1.19388 15.0951 0.620543 14.715 0.265947C14.335 -0.088649 13.7207 -0.088649 13.3408 0.265947L7.49993 5.71743L1.65922 0.265947C1.27911 -0.088649 0.665003 -0.088649 0.285078 0.265947C-0.0950259 0.620543 -0.0950259 1.19388 0.285078 1.54847L6.12579 6.99995L0.285078 12.4514C-0.0950259 12.806 -0.0950259 13.3794 0.285078 13.734C0.474418 13.9108 0.723371 13.9997 0.972147 13.9997C1.22092 13.9997 1.4697 13.9108 1.65922 13.734L7.49993 8.28248L13.3408 13.734C13.5303 13.9108 13.7791 13.9997 14.0279 13.9997C14.2767 13.9997 14.5254 13.9108 14.715 13.734C15.0951 13.3794 15.0951 12.806 14.715 12.4514L8.87424 6.99995Z"
            fill="#3C3C3C" />
        </svg>
      </button>
    </div>
    <loading-spinner height="574px" v-if="!user"></loading-spinner>

    <div class="popup__box-main" v-else>
      <!-- form -->
      <form class="form">
        <fieldset class="edit-user__details-block">
          <legend>User personal data</legend>
          <div class="edit-user__details-block-item">
            <!--First name-->
            <fieldset >
              <legend>First name</legend>
              <div class="edit-user__details-block-user-name">
                <input
                  v-model="user.first_name"
                  placeholder="First name"
                  class="input__text input"
                  autocomplete="off"
                >
              </div>
                <!--            <span class="form-validation-error">{{ envNameError }}</span>-->
            </fieldset>
            <!--Second name-->
            <fieldset>
              <legend>Second name</legend>
              <div class="edit-user__details-block-user-second-name">
                <input
                  v-model="user.second_name"
                  type="text"
                  name="description"
                  placeholder="Second name"
                  class="input__text input"
                >
              </div>
            </fieldset>
            <!--Email-->
            <fieldset>
              <legend>Email</legend>
              <div class="edit-user__details-block-user-email">
                <input
                  v-model="user.email"
                  type="text"
                  name="description"
                  placeholder="Email"
                  class="input__text input"
                >
              </div>
            </fieldset>
            <!--Username-->
            <fieldset>
              <legend>Username</legend>
              <div class="edit-user__details-block-user-username">
                <input
                  v-model="user.username"
                  type="text"
                  name="description"
                  placeholder="Username"
                  class="input__text input"
                  disabled
                >
              </div>
            </fieldset>
          </div>
          <div class="edit-user__details-block-item">
            <!--Phone-->
            <fieldset>
              <legend>Phone</legend>
              <div class="edit-user__details-block-user-phone">
                <input
                  v-model="user.phone"
                  type="text"
                  name="description"
                  placeholder="Username"
                  class="input__text input"
                >
              </div>
            </fieldset>
            <!--Status-->
            <fieldset>
              <legend>Status</legend>
              <div class="edit-user__details-block-user-status">
                <select name="user-status" class="input__select input fieldset-select" v-model="user.status">
                  <option value="active">active</option>
                  <option value="passive">blocked</option>
                </select>
              </div>
            </fieldset>
            <!--Role-->
            <fieldset>
              <legend>Role</legend>
              <div class="edit-user__details-block-user-role">
                <select name="user-role" class="input__select input fieldset-select" v-model="user.role">
                  <option value="admin">admin</option>
                  <option value="user">user</option>
                </select>
              </div>
            </fieldset>
          </div>
        </fieldset>
        <fieldset class="edit-user__details-block">
          <legend>User environments</legend>
          <div>
            <p>Visible only: </p>
            <multiselect
              v-model="visible_only"
              :searchable="true"
              :options="visibleOnlyOptions"
              mode="tags"
              placeholder="All environments"
              @select="onUpdateVisibleOnly"
              @deselect="onUpdateVisibleOnly"
            />
          </div>
          <div>
            <p>Hide: </p>
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
        <div class="popup__box-buttons">
          <button @click.prevent="onClose" class="button__large button__default close">Close</button>
          <button @click.prevent="onSave" class="button__large button__accent handle">Save</button>
        </div>
      </form>

    </div>
  </div>

</template>

<script>
import { REMOTE_REQUEST } from '@/store/actions/remoteActions'
import Multiselect from '@vueform/multiselect'
import LoadingSpinner from '@/components/LoadingSpinner'

export default {
  props: ['editUser', 'userId'],
  components: {
    LoadingSpinner,
    Multiselect
  },
  computed: {

  },
  watch: {
    editUser () {
      if (this.editUser) {
        this.loadUserProfile()
        this.options = this.$store.state.config.environments
      }
    }
  },
  data () {
    return {
      user: null,
      loading: true,
      visible_only: [],
      hidden: [],
      options: [],
      visibleOnlyOptions: {},
      hiddenOptions: {}
    }
  },
  methods: {
    loadUserProfile () {
      console.log('editUserProfile. loadUserProfile. userId:', this.userId)
      const requestObj = {
        service: 'users',
        path: '/users/info/' + this.userId,
        method: 'GET',
        body: null,
        options: {}
      }
      const popupOptions = {
        showDialog: true
      }
      const msg = 'Get user profile'
      this.$store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
        .then(response => {
          console.log('editUserProfile. loadUserProfile. response:', response)
          this.user = response
          const visibleOnlyParsed = []
          const hiddenParsed = []
          response.active_environment_ids.visible_only.forEach(envId => {
            visibleOnlyParsed.push(String(envId))
          })
          response.active_environment_ids.hidden.forEach(envId => {
            hiddenParsed.push(String(envId))
          })
          this.visible_only = visibleOnlyParsed
          this.hidden = hiddenParsed
          this.updateVisibleOnlyOptions()
          this.updateHiddenOptions()
          this.loading = false
        })
        .catch((error) => {
          console.error('editUserProfile. loadUserProfile. Error:', error)
          this.loading = false
        })
    },
    onClose () {
      this.$emit('close')
    },
    onSave () {
      const visibleOnlyInt = []
      const hiddenInt = []
      this.visible_only.forEach(id => {
        visibleOnlyInt.push(Number(id))
      })
      this.hidden.forEach(id => {
        hiddenInt.push(Number(id))
      })
      const userProfile = {
        active_environment_ids: {
          visible_only: visibleOnlyInt,
          hidden: hiddenInt
        },
        first_name: this.user.first_name,
        second_name: this.user.second_name,
        email: this.user.email,
        role: this.user.role,
        status: this.user.status
        // TODO Check if it's possible to send username
      }
      console.log('editUserProfile. onSave. userProfile:', userProfile)
      const requestObj = {
        service: 'users',
        path: '/users/profile/' + this.userId,
        method: 'POST',
        body: JSON.stringify(userProfile),
        options: {}
      }
      console.log('editUserProfile. onSave. body: ', JSON.stringify(userProfile))
      const msg = 'Update user profile'
      const popupOptions = {
        showDialog: true,
        alertScenario: 'user_saved'
      }
      this.$store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
        .then(response => {
          console.log('editUserProfile. onSave. response:', response)
          this.$emit('close')
        })
        .catch((error) => {
          console.error('editUserProfile. onSave. Error:', error)
        })
    },
    onUpdateVisibleOnly (id) {
      // console.log('editUserProfile. onUpdateVisibleOnly. id:', id)
      // console.log('visible_only', this.visible_only)
      // console.log('hidden', this.hidden)
      if (this.hidden.includes(String(id))) {
        // console.log('editUserProfile. onUpdateVisibleOnly. removing env with id:', id)
        const index = this.hidden.indexOf(String(id))
        this.hidden.slice(index, 1)
      } else {
        // console.log('editUserProfile. onUpdateVisibleOnly. False', id)
      }
      this.updateHiddenOptions()
      this.updateVisibleOnlyOptions()
    },
    onUpdateHidden (id) {
      // console.log('editUserProfile. onUpdateHidden. id:', id)
      // console.log('visible_only', this.visible_only)
      // console.log('hidden', this.hidden)
      if (this.visible_only.includes(String(id))) {
        // console.log('editUserProfile. onUpdateHidden. removing env with id:', id)
        const index = this.visible_only.indexOf(String(id))
        // console.log('editUserProfile. onUpdateHidden. removing env with id:', id, 'index', index)
        this.visible_only.slice(index, 1)
      } else {
        // console.log('editUserProfile. onUpdateHiddenOptions. False', id)
      }
      this.updateHiddenOptions()
      this.updateVisibleOnlyOptions()
    },
    updateVisibleOnlyOptions () {
      const visibleOnlyOptionsDict = {}
      // console.log('editUserProfile. updateVisibleOnlyOptions', this.options)
      // console.log('hidden', this.hidden)
      // console.log('visible_only', this.visible_only)
      for (const [envId, envName] of Object.entries(this.options)) {
        if (!this.hidden.includes(String(envId))) {
          // console.log('editUserProfile. updateVisibleOnlyOptions', envName)
          visibleOnlyOptionsDict[envId] = envName
        } else {
          // console.log('editUserProfile. updateVisibleOnlyOptions. False', envId, envName)
        }
      }
      // console.log('editUserProfile. visibleOnlyOptions', visibleOnlyOptionsDict)
      this.visibleOnlyOptions = visibleOnlyOptionsDict
    },
    updateHiddenOptions () {
      const hiddenOptionsDict = {}
      // console.log('editUserProfile. updateHiddenOptions', this.options)
      // console.log('hidden', this.hidden)
      // console.log('visible_only', this.visible_only)
      for (const [envId, envName] of Object.entries(this.options)) {
        if (!this.visible_only.includes(String(envId))) {
          // console.log('editUserProfile. updateHiddenOptions', envId, envName)
          hiddenOptionsDict[envId] = envName
        } else {
          // console.log('editUserProfile. updateHiddenOptions. False', envId, envName)
        }
      }
      // console.log('editUserProfile. updateHiddenOptions', hiddenOptionsDict)
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
.edit-user__details-block {
  display: flex;
  flex-direction: column;
  padding: 5px;
  border: 1px solid black;
}
.edit-user__details-block-item {
  padding: 5px;
  display: flex;
}
.edit-user__details-block-item div{
  padding: 5px;
}
.edit-user__details-block-user-role {
  display: flex;
  align-items: center;
}
/*.edit-user__details-block-user-role select-plugin{*/
/*  margin: 0 2px;*/
/*  background-color: white;*/
/*  padding: 8px 12px*/
/*}*/

.edit-user__details-block-actions-bnt {
  display: flex;
  align-items: flex-end;
}
#edit-user__details-block-actions-bnt {
  padding: 10px 12px;
}
.edit-user__details-block-actions-bnt button {
  padding: 5px;
}
.edit-user__details-block-env-name {
  width: 200px;
  padding-right: 5px;
}
.edit-user__details-block-env-description {
  flex-grow: 1;
}
.edit-environment__users-select-block {
  padding: 5px ;
  /*display: flex;*/
  /*height: 100px;*/
}
</style>
