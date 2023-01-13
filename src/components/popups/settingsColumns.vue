<template>
  <div class="env ">
    <div class="tabs__box">
      <!-- BOX -->
      <div class="tabs__box-in">
        <h4 class="tabs__box-title">Active</h4>
        <div class="tabs__box-content">
          <draggable class="dragArea list-group w-full"
                     group="userEnvLists"
                     :list="activeColumns"
                     itemKey="id"
                     @change="log">
            <div
              class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
              v-for="element in activeColumns"
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
                     :list="availableColumns"
                     itemKey="id"
                     @change="log">
            <div
              class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
              v-for="element in availableColumns"
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
      <button class="button__large button__default close">Close</button>
      <button @click="onSaveBtnClick" class="button__large button__accent save">Save</button>
    </div>
  </div>

</template>

<script>
import { defineComponent } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import DragObjectSimple from '@/components/small_blocks/draggable_box_simple'
import { dataFetcher } from '@/mixins/dataFetcher'
import store from '@/store'
import { USER_PROFILE_UPDATE } from '@/store/actions/user'

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
      activeColumns: [
        { id: 0, name: 'Monitoring system' },
        { id: 1, name: 'Source' },
        { id: 2, name: 'Name' },
        { id: 3, name: 'Object' },
        { id: 4, name: 'Severity' }
      ],
      availableColumns: [
        { id: 5, name: 'Time' },
        { id: 6, name: 'Status' }
      ],
      dragging: false,
      localFormValid: this.formValid
    }
  },
  beforeMount () {
    // this.onLoad()
  },
  methods: {
    log () {
      console.log('order_changed')
      console.log(this.activeColumns)
      console.log(this.availableColumns)
    },
    onSaveBtnClick () {
      const [url, params] = store.getters.generateUrl(
        'users', '/users/profile/2', 'POST')
      const userProfile = store.getters.getProfileForForm
      userProfile.activeColumns = this.activeColumns.map((env) => { return env.id })
      const body = {
        // user_id: userProfile.userID,
        // first_name: userProfile.firstName,
        // second_name: userProfile.secondName,
        // email: userProfile.email,
        // phone: userProfile.phone,
        // active_environment_ids: userProfile.activeEnvironmentIds
        active_columns: userProfile.activeColumns
      }
      params.body = JSON.stringify(body)
      fetch(url, params)
        .then(resp => resp.json())
        .then(resp => {
          store.commit(USER_PROFILE_UPDATE, userProfile)
          console.log('settingsUserColumns. onSaveBtnClick. user.profile:', userProfile)
        })
        .catch((err) => {
          console.log('settingsUserColumns. onsSaveBtnClick. Error:', err)
        })
    }
  }
})
</script>
