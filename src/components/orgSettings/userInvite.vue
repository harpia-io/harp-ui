<template>
  <div class="popup__box settings popup__small second-popup">
    <div class="popup__box-header">
      <h4 class="popup__box-title">Add new user</h4>
      <button class="popup__box-close" @click="close">
        <svg width="15" height="14" viewbox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.87424 6.99995L14.715 1.54847C15.0951 1.19388 15.0951 0.620543 14.715 0.265947C14.335 -0.088649 13.7207 -0.088649 13.3408 0.265947L7.49993 5.71743L1.65922 0.265947C1.27911 -0.088649 0.665003 -0.088649 0.285078 0.265947C-0.0950259 0.620543 -0.0950259 1.19388 0.285078 1.54847L6.12579 6.99995L0.285078 12.4514C-0.0950259 12.806 -0.0950259 13.3794 0.285078 13.734C0.474418 13.9108 0.723371 13.9997 0.972147 13.9997C1.22092 13.9997 1.4697 13.9108 1.65922 13.734L7.49993 8.28248L13.3408 13.734C13.5303 13.9108 13.7791 13.9997 14.0279 13.9997C14.2767 13.9997 14.5254 13.9108 14.715 13.734C15.0951 13.3794 15.0951 12.806 14.715 12.4514L8.87424 6.99995Z"
            fill="#3C3C3C" />
        </svg>
      </button>
    </div>

    <div class="popup__box-main">

      <!-- form -->
      <form class="form">
        <fieldset>
          <legend>User Name</legend>
          <input type="text" name="name" placeholder="User Name"
                 class="input__text input" v-model="username">
        </fieldset>
        <fieldset>
          <legend>Email</legend>
          <input type="email" name="email" placeholder="example@gmail.com"
                 class="input__text input" v-model="email">
        </fieldset>
        <!--Role-->
        <fieldset>
          <legend>Role</legend>
          <div class="edit-user__details-block-user-role">
            <select name="user-role" class="input__select input fieldset-select" v-model="role">
              <option value="owner">owner</option>
              <option value="admin">admin</option>
              <option value="user">user</option>
            </select>
          </div>
        </fieldset>

        <fieldset class="edit-user__details-block">
          <legend>User environments</legend>
          <fieldset class="edit-user__details-block">
            <legend style="font-size: 10px">Visible only:</legend>
            <multiselect
              v-model="visible_only"
              :searchable="true"
              :options="visibleOnlyOptions"
              mode="tags"
              placeholder="All environments"
              @select="onUpdateVisibleOnly"
              @deselect="onUpdateVisibleOnly"
            />
          </fieldset>
          <fieldset class="edit-user__details-block">
            <legend style="font-size: 10px">Hidden:</legend>
            <multiselect
              v-model="hidden"
              :searchable="true"
              :options="hiddenOptions"
              mode="tags"
              @select="onUpdateHidden"
              @deselect="onUpdateHidden"
            />
          </fieldset>
        </fieldset>

        <!-- popup buttons -->
        <div class="popup__box-buttons">
          <button class="button__large button__accent submit" type="submit"
                  @click.prevent="inviteUser">Add</button>
        </div>
      </form>

    </div>
  </div>
  <confirmation-popup ref="confirmation"></confirmation-popup>
</template>

<script>
import { REMOTE_REQUEST } from '@/store/actions/remoteActions'
import Multiselect from '@vueform/multiselect'
import ConfirmationPopup from '@/components/popups/confirmationPopup'

export default {
  emits: ['close'],
  components: {
    Multiselect, ConfirmationPopup
  },
  data () {
    return {
      username: '',
      first_name: '',
      second_name: '',
      email: '',
      password: '',
      role: 'user',
      visible_only: [],
      hidden: [],
      visibleOnlyOptions: {},
      hiddenOptions: {}
    }
  },
  computed: {
    options () {
      return this.$store.state.config.environments
    }
  },
  beforeMount () {
    this.updateVisibleOnlyOptions()
    this.updateHiddenOptions()
  },
  methods: {
    close () {
      this.$emit('close')
    },
    inviteUser () {
      const visibleOnlyInt = []
      const hiddenInt = []
      this.visible_only.forEach(id => {
        visibleOnlyInt.push(Number(id))
      })
      this.hidden.forEach(id => {
        hiddenInt.push(Number(id))
      })
      const user = {
        username: this.username,
        email: this.email,
        role: this.role,
        active_environment_ids: {
          visible_only: visibleOnlyInt,
          hidden: hiddenInt
        }
      }
      const requestObj = {
        service: 'users',
        path: '/users/invite',
        method: 'POST',
        body: JSON.stringify(user),
        options: {}
      }
      console.log('userInvite. inviteUser. body: ', JSON.stringify(user))
      const msg = 'Invite user'
      const popupOptions = {
        showDialog: true,
        scenario: 'member_add'
      }
      this.$store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
        .then(response => {
          console.log('userInvite. inviteUser. response:', response)
          this.$refs.confirmation.showScenario('orgRegistration')
          // this.$emit('close')
        })
        .catch((error) => {
          console.error('userInvite. inviteUser. Error:', error)
        })
    },
    onUpdateVisibleOnly (id) {
      if (this.hidden.includes(String(id))) {
        const index = this.hidden.indexOf(String(id))
        this.hidden.slice(index, 1)
      } else {
      }
      this.updateHiddenOptions()
      this.updateVisibleOnlyOptions()
    },
    onUpdateHidden (id) {
      if (this.visible_only.includes(String(id))) {
        const index = this.visible_only.indexOf(String(id))
        this.visible_only.slice(index, 1)
      } else {
      }
      this.updateHiddenOptions()
      this.updateVisibleOnlyOptions()
    },
    updateVisibleOnlyOptions () {
      const visibleOnlyOptionsDict = {}
      for (const [envId, envName] of Object.entries(this.options)) {
        if (!this.hidden.includes(String(envId))) {
          visibleOnlyOptionsDict[envId] = envName
        } else {
        }
      }
      this.visibleOnlyOptions = visibleOnlyOptionsDict
    },
    updateHiddenOptions () {
      const hiddenOptionsDict = {}
      for (const [envId, envName] of Object.entries(this.options)) {
        if (!this.visible_only.includes(String(envId))) {
          hiddenOptionsDict[envId] = envName
        } else {
        }
      }
      this.hiddenOptions = hiddenOptionsDict
    }
  }
}
</script>

<style scoped>

</style>
