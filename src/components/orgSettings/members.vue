<template>
  <div>
    <edit-user-profile
      v-show="editUser"
      :editUser="editUser"
      :userId="userId"
      @close="onEditUserClose"
      class="settings-org__popup"
    />
    <user-invite
      v-if="inviteUser"
      @close="onInviteUserClose"
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
          <button class="add__new" style="margin: 0 0 0 auto;" @click="onInviteUser">
            <svg width="11" height="12" viewbox="0 0 11 12" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.6 6.09995C10.6 6.59995 10.2 6.99995 9.7 6.99995H6.1V10.4C6.1 10.9 5.7 11.3 5.2 11.3C4.7 11.3 4.3 10.9 4.3 10.4V6.99995H0.9C0.4 6.99995 0 6.59995 0 6.09995C0 5.59995 0.4 5.19995 0.9 5.19995H4.3V1.59995C4.3 1.09995 4.7 0.699951 5.2 0.699951C5.7 0.699951 6.1 1.09995 6.1 1.59995V5.19995H9.7C10.2 5.19995 10.6 5.59995 10.6 6.09995Z"
                fill="#00C284" />
            </svg>
            Add new user
          </button>
        </div>
      </div>
      <table class="table-scroll">
        <thead>
          <tr>
            <th class="members-table__name">Name</th>
            <th class="members-table__username">Username</th>
            <th class="members-table__email">Email</th>
            <th>Environments</th>
            <th>Role </th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody class="body-half-screen">
          <loading-spinner v-if="loading"></loading-spinner>
          <tr v-for="(userObj, index) in usersArray" :key="index">
            <!--User name-->
            <td class="members-table__name">{{ userObj.first_name }} {{ userObj.second_name }}</td>
            <!--Username-->
            <td class="members-table__username">{{ userObj.username }}</td>
            <!--Email-->
            <td class="members-table__email">{{ userObj.email }}</td>
            <!--Environments-->
            <td>{{ environmentsAll(userObj.active_environment_ids) }}</td>
            <!--Role-->
            <td>{{ userObj.role}}</td>
            <!--Status-->
            <td>{{ userObj.status }}</td>
            <!--Actions-->
            <td>
              <div class="env-table__buttons-cell">
                <!--Edit user-->
                <div>
                  <button
                    @click="onEditUser(userObj.user_id)"
                    @close="onEditUserClose"
                    class="button__icon-transparent">
                    <icon-edit/>
                  </button>
                </div>
                <!--Delete user-->
                <div>
                  <button
                    class="button__icon-transparent" :disabled="userObj.user_id === currentUserProfile.userId"
                    @click="onDeleteUser(userObj.user_id)">
                    <icon-delete/>
                  </button>
                </div>
                <!--Disable-->
<!--                <div>-->
<!--                  <button class="button__icon-transparent" :disabled="userObj.user_id === currentUserProfile.userId"-->
<!--                          @click="onBlockUser(userObj.user_id)">-->
<!--                    <icon-disable/>-->
<!--                  </button>-->
<!--                </div>-->
                <!--Report-->
<!--                <div>-->
<!--                  <button class="button__icon-transparent" disabled>-->
<!--                    <icon-report/>-->
<!--                  </button>-->
<!--                </div>-->
                <!--Reset-->
                <div>
                  <button class="button__icon-transparent" type="button"
                          @click="onResetPasswordUser(userObj.username)">
                    <icon-reset-password/>
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
// import { defineComponent } from 'vue'
import editUserProfile from '@/components/orgSettings/editUserProfile'
import userInvite from '@/components/orgSettings/userInvite'
import { dataFetcher } from '@/mixins/dataFetcher'
import { REMOTE_REQUEST } from '@/store/actions/remoteActions'
import {
  SHOW_SECOND_BACKDROP,
  HIDE_SECOND_BACKDROP,
  HIDE_SETTINGS
} from '@/store/actions/localActions'
import store from '@/store'
import ConfirmationPopup from '@/components/popups/confirmationPopup'
import { ref } from 'vue'
import LoadingSpinner from '@/components/LoadingSpinner'
import iconResetPassword from '@/components/icons/iconResetPassword'
import iconDelete from '@/components/icons/iconDelete'
import iconEdit from '@/components/icons/iconEdit'
import iconReport from '@/components/icons/iconReport'
import iconDisable from '@/components/icons/iconDisable'

export default {
  props: ['show'],
  components: {
    LoadingSpinner,
    ConfirmationPopup,
    editUserProfile,
    userInvite,
    iconResetPassword,
    iconDelete,
    iconEdit,
    iconReport,
    iconDisable
  },
  setup () {
    const confirmation = ref(null)
    return { confirmation }
  },
  mixins: [dataFetcher],
  computed: {
    usersArray () {
      if (this.search.length > 0) {
        const searchPattern = this.search.toLowerCase()
        return this.users.filter(user => {
          const firstName = user.first_name ? user.first_name.toLowerCase() : ''
          const secondName = user.second_name ? user.second_name.toLowerCase() : ''
          const username = user.username ? user.username.toLowerCase() : ''
          return (firstName.includes(searchPattern) ||
            secondName.includes(searchPattern) ||
            username.includes(searchPattern))
        })
      }
      return this.users
    },
    currentUserProfile () {
      return store.getters.getProfile
    }
  },
  watch: {
    show () {
      console.log('settingsMembers. watch show method called')
      if (this.show === 'members') {
        this.loadUsers()
      }
    }
  },
  data () {
    return {
      users: [],
      userId: null,
      editUser: false,
      inviteUser: false,
      loading: false,
      search: ''
    }
  },
  methods: {
    onSaveBtnClick () {
      console.log('settingMembers. onSaveBtnClick')
    },
    loadUsers () {
      this.loading = true
      console.log('settingsMembers. loadUsers.')
      const requestObj = {
        service: 'users',
        path: '/users/all',
        method: 'GET',
        body: null,
        options: {}
      }
      const msg = 'Loading users'
      const popupOptions = {
        showDialog: true
      }
      this.$store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
        .then(response => {
          console.log('settingsMembers. loadUsers. response:', response.users)
          this.users = response.users
          this.loading = false
        })
        .catch((error) => {
          console.error('settingsMembers. loadUsers. Error:', error)
        })
    },
    environmentsAll (envSet) {
      return (envSet.visible_only.length === 0 && envSet.hidden.length === 0) ? 'All' : 'Custom'
    },
    async onDeleteUser (userId) {
      const confirmation = await this.$refs.confirmation.showScenario('delete')
      if (confirmation) {
        console.log('settingMembers. deleteUser:', userId)
        const requestObj = {
          service: 'users',
          path: '/users/delete/' + userId,
          method: 'DELETE',
          body: null,
          options: {}
        }
        const msg = 'Delete user'
        const popupOptions = {
          showDialog: true
        }
        this.$store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
          .then(response => {
            console.log('members. onDeleteUser. response:', response)
            this.loadUsers()
          })
          .catch((error) => {
            console.error('members. onDeleteUser. Error:', error)
          })
      }
    },
    async onBlockUser (userId) {
      const confirmation = await this.$refs.confirmation.showScenario('block')
      if (confirmation) {
        console.log('settingMembers. deleteUser:', userId)
        const requestObj = {
          service: 'users',
          path: '/users/block/' + userId,
          method: 'POST',
          body: null,
          options: {}
        }
        const msg = 'Block user'
        const popupOptions = {
          showDialog: true
        }
        this.$store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
          .then(response => {
            console.log('members. onBlockUser. response:', response)
            this.loadUsers()
          })
          .catch((error) => {
            console.error('members. onBlockUser. Error:', error)
          })
      }
    },
    async onResetPasswordUser (userName) {
      const confirmation = await this.$refs.confirmation.showScenario('reset')
      if (confirmation) {
        console.log('members. onResetPassword:', userName)
        const requestObj = {
          service: 'users',
          path: '/users/reset-password-username/' + userName,
          method: 'POST',
          body: null,
          options: {}
        }
        const msg = 'Reset password'
        const popupOptions = {
          showDialog: true
        }
        this.$store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
          .then(response => {
            console.log('mmembers. onResetPassword. response:', response)
            this.loadUsers()
          })
          .catch((error) => {
            console.error('members. onResetPassword. Error:', error)
          })
      }
    },
    onEditUser (userId) {
      console.log('settingMembers. editUser:', userId)
      this.userId = userId
      this.editUser = true
      this.$store.commit(SHOW_SECOND_BACKDROP)
      // this.$store.dispatch(BLUR_FIRST_POPUP)
    },
    onEditUserClose () {
      this.userId = null
      this.editUser = false
      this.loadUsers()
      this.$store.commit(HIDE_SECOND_BACKDROP)
      // this.$store.dispatch(UNBLUR_FIRST_POPUP)
    },
    onInviteUser () {
      this.inviteUser = true
      this.$store.commit(SHOW_SECOND_BACKDROP)
      // this.$store.dispatch(BLUR_FIRST_POPUP)
      this.loadUsers()
    },
    onInviteUserClose () {
      this.inviteUser = false
      this.$store.commit(HIDE_SECOND_BACKDROP)
      // this.$store.dispatch(UNBLUR_FIRST_POPUP)
    },
    toggleOrgSettings () {
      this.$store.commit(HIDE_SETTINGS)
    }
  }
}
</script>

<style lang="scss">
.env-table__buttons-cell {
  display: flex;
  /*align-content: center;*/
  justify-content: space-between;
  > * {
    flex: 1 0;
  }
}
.members-table__name {
  min-width: 200px;
}
.members-table__username {
  min-width: 150px;
}
.members-table__email {
  min-width: 220px;
}
.env-table__buttons-cell .button__icon-transparent:disabled:hover path{
  fill: #d28703;
}
</style>
