<template>
  <div>
    <div class="settings-page__content-tabs-body">
      <div class="tabs__box">
        <!-- photo -->
        <div class="tabs__box-in photo">
          <div class="photo__image">
            <!--          <img src="@/assets/images/avatar.png" alt="Name">-->
          </div>

          <!-- <input type="file" id="upload_photo" name="filename" hidden> -->

          <button class="button__edit button__photo-change">
            <svg width="16" height="15" viewbox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.63671 12.8682C1.57824 12.8098 1.52477 12.7481 1.47557 12.6836C1.4381 12.6344 1.40319 12.5836 1.37133 12.5313L0.775867 14.2796C0.718616 14.4475 0.760853 14.6121 0.858753 14.7293C1.00255 14.8842 1.22264 14.9081 1.36888 14.8733L3.11632 14.2804C3.00341 14.2097 2.89745 14.1261 2.80077 14.0297L1.63671 12.8682Z" fill="#00C284"/>
              <path d="M15.0657 2.08881C15.0657 2.08881 13.9962 1.03779 13.5759 0.654733C13.2632 0.386301 12.867 0.438425 12.6321 0.692086L11.9189 1.40754L14.2744 3.75775C14.2755 3.75885 14.2763 3.76007 14.2774 3.76117L14.3049 3.73383L15.0658 2.97431C15.3105 2.72992 15.3105 2.3332 15.0657 2.08881Z" fill="#00C284"/>
              <path d="M11.2549 2.07008L9.95848 3.36414L12.3158 5.71607C12.3164 5.71668 12.3168 5.71717 12.3172 5.71766L13.6137 4.42347C13.6131 4.42286 13.6124 4.42237 13.6118 4.42164L11.2549 2.07008Z" fill="#00C284"/>
              <path d="M4.32984 13.5675C4.44886 13.5275 4.56056 13.4602 4.6554 13.3655L11.6533 6.38026L9.29456 4.02686L2.2992 11.0097C2.20338 11.1051 2.13563 11.218 2.09535 11.338C1.99683 11.6323 2.06458 11.97 2.29932 12.2041L3.46339 13.3656C3.62806 13.5299 3.84376 13.6121 4.05933 13.6121C4.15089 13.6121 4.24232 13.5972 4.32984 13.5675Z" fill="#00C284"/>
            </svg>
            Change photo
          </button>
          <button class="button__edit button__photo-delete">
            <svg width="14" height="16" viewbox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.66785 0.96582H8.34193V1.41577H9.30762V0.902832C9.30775 0.405029 8.90296 0 8.4054 0H5.60438C5.10682 0 4.70203 0.405029 4.70203 0.902832V1.41577H5.66785V0.96582Z" fill="white"/>
              <path d="M11.5379 5.24219H2.47195C2.22353 5.24219 2.02798 5.4541 2.048 5.70178L2.80593 15.0739C2.84817 15.597 3.28457 16 3.80886 16H10.2008C10.7251 16 11.1615 15.597 11.2038 15.0737L11.9617 5.70178C11.9818 5.4541 11.7863 5.24219 11.5379 5.24219ZM4.66714 15.0004C4.657 15.001 4.64687 15.0013 4.63686 15.0013C4.38369 15.0013 4.17116 14.8042 4.15542 14.5481L3.68044 6.85413C3.66409 6.58789 3.8666 6.35876 4.13271 6.34241C4.39797 6.32629 4.62807 6.52832 4.64443 6.79468L5.11929 14.4886C5.13576 14.7549 4.93325 14.9839 4.66714 15.0004ZM7.49319 14.5184C7.49319 14.785 7.277 15.0012 7.01028 15.0012C6.74355 15.0012 6.52737 14.785 6.52737 14.5184V6.82434C6.52737 6.55762 6.74355 6.34143 7.01028 6.34143C7.27688 6.34143 7.49319 6.55762 7.49319 6.82434V14.5184ZM10.3294 6.85278L9.87588 14.5468C9.86086 14.8033 9.64797 15.0012 9.39431 15.0012C9.38479 15.0012 9.37514 15.001 9.3655 15.0005C9.09927 14.9847 8.89614 14.7562 8.91189 14.49L9.36526 6.7959C9.38088 6.52966 9.60867 6.32654 9.87563 6.34229C10.1419 6.35791 10.345 6.58655 10.3294 6.85278Z" fill="white"/>
              <path d="M13.2078 3.75195L12.8907 2.80127C12.8071 2.55066 12.5724 2.38159 12.3082 2.38159H1.70158C1.43742 2.38159 1.20268 2.55066 1.11919 2.80127L0.802047 3.75195C0.740889 3.9353 0.820479 4.12231 0.969039 4.21558C1.02959 4.25354 1.10124 4.27637 1.17998 4.27637H12.8299C12.9086 4.27637 12.9804 4.25354 13.0408 4.21545C13.1894 4.12219 13.269 3.93518 13.2078 3.75195Z" fill="white"/>
            </svg>
            Delete photo
          </button>
        </div>

        <!-- fields -->
        <div class="tabs__box-in">
          <fieldset>
            <legend>First name</legend>
            <input v-model="profile.firstName" type="text" name="name" placeholder="Firstname" class="input__text input">
          </fieldset>
          <fieldset>
            <legend>Nickname</legend>
            <input v-model="profile.username" type="text" name="name" placeholder="Nickname" class="input__text input">
          </fieldset>
          <fieldset>
            <legend>Role</legend>
            <input v-model="profile.role" type="text" name="role" placeholder="Admin" class="input__text input" disabled>
          </fieldset>
          <fieldset>
            <legend>Phone</legend>
            <input v-model="profile.phone" type="tel" name="phone" placeholder="0752549328" class="input__text input">
          </fieldset>
        </div>

        <!-- fields 2 -->
        <div class="tabs__box-in">
          <fieldset>
            <legend>Second name</legend>
            <input v-model="profile.secondName" type="text" name="name" placeholder="Secondname" class="input__text input">
          </fieldset>
          <fieldset>
            <legend>E-mail</legend>
            <input v-model="profile.email" type="email" name="email" placeholder="email" class="input__text input">
          </fieldset>
          <fieldset>
            <legend>Password</legend>
            <input v-model="profile.password" type="password" name="password" placeholder="password" class="input__text input">
          </fieldset>
          <!--        <fieldset>-->
          <!--          <legend>Time zone</legend>-->
          <!--          <select-plugin name="time_zone" class="input__select input">-->
          <!--            <option value="utc">UTC</option>-->
          <!--            <option value="utc">EST</option>-->
          <!--            <option value="utc">EEST</option>-->
          <!--          </select-plugin>-->
          <!--        </fieldset>-->
        </div>
      </div>
    </div>
    <div class="popup__box-buttons">
      <button class="button__large button__default close" @click="toggleUserProfile">Close</button>
      <button @click="onSaveBtnClick" class="button__large button__accent save">Save</button>
    </div>
  </div>

</template>

<script>
import { defineComponent } from 'vue'
import store from '@/store'
// import { USER_PROFILE_UPDATE } from '@/store/actions/user'
import { HIDE_SETTINGS, TOGGLE_ORG_SETTINGS, TOGGLE_USER_PROFILE} from '@/store/actions/localActions'
import { REMOTE_REQUEST } from '@/store/actions/remoteActions'

export default defineComponent({
  components: {
  },
  data () {
    return {
      profile: null
    }
  },
  computed: {
  },
  beforeMount () {
    this.onLoad()
  },
  methods: {
    onSaveBtnClick () {
      // const [url, params] = store.getters.generateUrl(
      //   'users', '/users/profile/2', 'POST')
      console.log(this.$store.state.user.profile)
      const body = {
        first_name: this.profile.firstName,
        second_name: this.profile.secondName,
        email: this.profile.email,
        phone: this.profile.phone,
        active_environment_ids: this.profile.activeEnvironmentIds
      }
      const requestObj = {
        service: 'users',
        path: '/users/profile/' + this.profile.userId,
        method: 'POST',
        body: JSON.stringify(body),
        options: {}
      }
      const msg = 'Update user profile'
      const popupOptions = {
        showDialog: true,
        delay: 2000,
        alert: { scenario: 'user_save' }
      }
      this.$store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
        .then(response => {
          console.log('settingsUserProfile. onSaveBtnClick. response:', response)
          this.environments = response
        })
        .catch((error) => {
          console.error('settingsUserProfile. onSaveBtnClick. Error:', error)
        })
      // params.body = JSON.stringify(body)
      // fetch(url, params)
      //   .then(resp => resp.json())
      //   .then(resp => {
      //     store.commit(USER_PROFILE_UPDATE, this.profile)
      //     console.log('settingsInfo. onsSaveBtnClick. user.profile:', this.profile)
      //   })
      //   .catch((err) => {
      //     console.log('settingsInfo. onsSaveBtnClick. Error:', err)
      //   })
      // console.log('SaveBtnClick')
    },
    formValid () {
      return true
    },
    onLoad () {
      this.profile = store.getters.getProfileForForm
      console.log('settingsInfo. onLoad. profile:', this.profile)
    },
    toggleUserProfile () {
      this.$store.commit(HIDE_SETTINGS)
    }
  }
})
</script>
