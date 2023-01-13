<template>
  <div class="env ">
    <div class="tabs__box">
      <!-- BOX -->
      <div class="tabs__box-in">
        <h4 class="tabs__box-title">Active</h4>
        <div class="tabs__box-content">
          <draggable class="dragArea list-group w-full"
                     group="userEnvLists"
                     :list="activeEnvironmentIds"
                     itemKey="id"
                     @change="log">
            <div
              class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
              v-for="element in activeEnvironmentIds"
              :key="element.name"
            >
              <dragObjectSimple :env_name="element.name"
                                :env_id="element.id"/>
            </div>
          </draggable>
        </div>
      </div>

      <div class="tabs__box-in">
        <h4 class="tabs__box-title">Available</h4>
        <div class="tabs__box-content">
          <draggable class="dragArea list-group w-full list-group"
                     group="userEnvLists"
                     :list="availableEnvList"
                     itemKey="id"
                     @change="log">
            <div
              class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
              v-for="element in availableEnvList"
              :key="element.name"
            >
              <dragObjectSimple :env_name="element.name"
                                :env_id="element.id"/>
            </div>
          </draggable>
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
import { VueDraggableNext } from 'vue-draggable-next'
import DragObjectSimple from '@/components/small_blocks/draggable_box_simple'
import { dataFetcher } from '@/mixins/dataFetcher'
import store from '@/store/index'
import { USER_PROFILE_UPDATE } from '@/store/actions/user'
import { TOGGLE_USER_PROFILE } from '@/store/actions/localActions'

export default defineComponent({
  props: ['formValid'],
  components: {
    draggable: VueDraggableNext,
    dragObjectSimple: DragObjectSimple
  },
  mixins: [dataFetcher],
  data () {
    return {
      enabled: true,
      activeEnvironmentIds: [],
      availableEnvList: [],
      env_list: this.$store.state.config.environments,
      dragging: false,
      localFormValid: this.formValid
    }
  },
  beforeMount () {
    this.onLoad()
  },
  computed: {
    visibleOnly () {
      return this.$store.state.user.profile.activeEnvironmentIds.visible_only
    }
  },
  methods: {
    log () {
      // console.log('order_changed')
      // console.log(this.activeEnvList)
      // console.log(this.availableEnvList)
    },
    onLoad () {
      this.environments = store.getters.getEnv
      // this.activeEnvironmentIds = store.getters.userEnvList
      // this.availableEnvList = store.getters.userEnvAvailable
      // console.log('settingsUserSettings. onLoad. environments:', this.environments)
      // console.log('settingsUserSettings. onLoad. activeEnvList:', this.activeEnvList)
      // console.log('settingsUserSettings. onLoad. availableEnvList:', this.availableEnvList)
    },
    onSaveBtnClick () {
      const [url, params] = store.getters.generateUrl(
        'users', '/users/profile/2', 'POST')
      const userProfile = store.getters.getProfileForForm
      userProfile.activeEnvironmentIds = this.activeEnvironmentIds.map((env) => { return Number(env.id) })
      const body = {
        user_id: userProfile.userID,
        first_name: userProfile.firstName,
        second_name: userProfile.secondName,
        email: userProfile.email,
        phone: userProfile.phone,
        active_environment_ids: userProfile.activeEnvironmentIds
      }
      params.body = JSON.stringify(body)
      fetch(url, params)
        .then(resp => resp.json())
        .then(resp => {
          store.commit(USER_PROFILE_UPDATE, userProfile)
          console.log('settingsUserEnvironments. onSaveBtnClick. user.profile:', userProfile)
        })
        .catch((err) => {
          console.log('settingsUserEnvironments. onsSaveBtnClick. Error:', err)
        })
    },
    toggleUserProfile () {
      this.$store.dispatch(TOGGLE_USER_PROFILE)
    }
  }
})
</script>
