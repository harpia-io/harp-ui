<template>
  <div class="global-search-block">
    <global-search
      :global-filter-dict="activeFilter"
      :labels="labels"
    />
    <div>

    </div>
    <div class="global-search-controls-block">
      <icon-save description="Save" position="left" @click="onTagFilterSave" v-if="activeFilterId !== 'null'"/>
      <icon-save-as description="Save as" position="left" @click="onTagFilterSaveAs"/>
      <icon-trash description="Delete" position="left" @click="onTagFilterDelete"/>
<!--      <icon-delete description="Delete filter" position="top"/>-->
      <div class="global-search-controls-block__select" style="width: 160px" id="select"></div>
      <div class="global-search-block__assigned_to_me_checkbox_block">
        <Tooltip tooltipText="Assigned to me" position="top">
          <div class="global-search-block__assigned_to_me_checkbox">
            <div style="padding: 0 4px; display: flex; align-items: center">
              <input v-model="showAssignedToMe" type="checkbox" id="assigned-to-me" name="assigned-to-me">

            </div>
<!--            <label for="assigned-to-me"></label>-->
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
              <g id="surface1">
                <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 16.535156 6.90625 C 16.535156 9.414062 14.5 11.445312 11.992188 11.445312 C 9.484375 11.445312 7.453125 9.414062 7.453125 6.90625 C 7.453125 4.398438 9.484375 2.367188 11.992188 2.367188 C 14.5 2.367188 16.535156 4.398438 16.535156 6.90625 Z M 16.535156 6.90625 "/>
                <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 8 17.765625 C 8.027344 17.011719 8.507812 16.347656 9.214844 16.085938 C 9.921875 15.824219 10.71875 16.011719 11.234375 16.566406 L 13.808594 19.332031 L 18.367188 14.246094 C 16.484375 12.992188 14.261719 12.335938 12 12.367188 C 8.820312 12.285156 5.769531 13.617188 3.667969 16 C 3.578125 16.117188 3.53125 16.261719 3.535156 16.40625 L 3.535156 20 C 3.53125 20.722656 4.105469 21.3125 4.828125 21.332031 L 10.539062 21.332031 L 8.492188 19.132812 C 8.152344 18.761719 7.972656 18.269531 8 17.765625 Z M 8 17.765625 "/>
                <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 19.171875 21.332031 C 19.894531 21.3125 20.46875 20.722656 20.464844 20 L 20.464844 17.492188 L 17.046875 21.332031 Z M 19.171875 21.332031 "/>
                <path style=" stroke:none;fill-rule:nonzero;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 22.511719 12.414062 C 22.382812 12.292969 22.207031 12.230469 22.027344 12.242188 C 21.851562 12.253906 21.683594 12.332031 21.566406 12.464844 L 13.820312 21.132812 L 10.351562 17.40625 C 10.113281 17.125 9.691406 17.09375 9.414062 17.332031 C 9.289062 17.457031 9.214844 17.628906 9.214844 17.808594 C 9.214844 17.984375 9.289062 18.15625 9.414062 18.28125 L 13.867188 23.078125 L 22.558594 13.332031 C 22.792969 13.0625 22.773438 12.660156 22.511719 12.414062 Z M 22.511719 12.414062 "/>
              </g>
            </svg>          </div>
        </Tooltip>
      </div>
    </div>
    <confirmation-popup ref="confirmation"></confirmation-popup>
    <!--    <pre>{{activeFilter}}</pre>-->
  </div>
  <!--  <pre> {{ searchItems }} </pre>-->
</template>

<script>
import globalSearch from '@/tools/tagSearch/globalSearch'
import { Select } from '@/tools/select-plugin/select'
import '@/tools/select-plugin/select.scss'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { GET_FILTER_COLUMNS, TAG_FILTERS_REQUEST, UPDATE_USER_TAG_FILTER, TOOGLE_SHOW_ASSIGNED_TO_ME } from '@/store/actions/config'
import iconSave from '@/components/icons/iconSave'
import iconSaveAs from '@/components/icons/iconSaveAs'
import iconTrash from '@/components/icons/iconTrash'
import { OPEN_SAVE_TAG_FILTER_DIALOG, SAVE_TAG_FILTER } from '@/store/actions/notificationActions'
import { REMOTE_REQUEST } from '@/store/actions/remoteActions'
import ConfirmationPopup from '@/components/popups/confirmationPopup'
import Tooltip from '@/components/Tooltip'
export default {
  props: {
    globalSearchSelect: {
      type: Array,
      required: false,
      default () {
        return []
      }
    },
    globalFilterDict: {
      type: Object,
      required: false,
      default () {
        return {}
      }
    },
    chosenFilter: {
      type: String,
      required: false,
      default: 'null'
    }
  },
  components: {
    globalSearch,
    iconSave,
    iconSaveAs,
    iconTrash,
    ConfirmationPopup,
    Tooltip
  },
  setup (props) {
    const store = useStore()
    const confirmation = ref(null)
    let chosenFilterId = localStorage.getItem('active-tag-filter-id')
    const defaultFilter = []
    const select = null
    const showAssignedToMe = ref(false)
    const labels = ref(store.state.config.tagFilterValues)
    const initialFilter = chosenFilterId in props.globalFilterDict ? props.globalFilterDict[chosenFilterId] : defaultFilter
    const activeFilter = ref(initialFilter)
    let filterObject = null
    store.commit(UPDATE_USER_TAG_FILTER, { activeFilter: activeFilter.value, activeFilterId: chosenFilterId })
    function switchActiveFilter (filterObj) {
      console.log('tagSearchBlock setup. switchActiveFilter', filterObj)
      if (filterObj.id === 'null') {
        activeFilter.value = []
        chosenFilterId = 'null'
      } else {
        activeFilter.value = props.globalFilterDict[filterObj.id]
        chosenFilterId = filterObj.id
      }
      store.dispatch(GET_FILTER_COLUMNS, { filterId: filterObj.id }).then(() => {
        store.commit(UPDATE_USER_TAG_FILTER, { activeFilter: activeFilter.value, activeFilterId: filterObj.id })
        console.log('tagSearchBlock setup. activeFilter', activeFilter.value, filterObj.id)
      })
    }
    async function getFilterObj () {
      const requestObj = {
        service: 'filters',
        path: '/filters/config/' + chosenFilterId,
        method: 'GET',
        body: null,
        options: {}
      }
      const msg = 'GET tag filter details'
      const popupOptions = {
        showDialog: true,
        scenario: 'filter_get'
      }
      await store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
        .then(response => {
          // console.log('tagSearchBlock. getFilterObj. response:', response)
          filterObject = response
        })
        .catch((error) => {
          console.error('tagSearchBlock. getFilterObj. Error:', error)
        })
    }
    async function onTagFilterSave () {
      // console.log('tagSearchBlock. onTagFilterSave')
      // if (chosenFilterId !== '0') {
      await getFilterObj()
      // }
      if (filterObject.filter_status === 'public') {
        const confirmed = await confirmation.value.showScenario('updatePublicFilter')
        if (confirmed) {
          // console.log('tagSearchBlock. onTagFilterSave. update public filter')
          const body = {
            newFilter: false,
            filter_config: store.state.config.activeTagsFilter
          }
          store.dispatch(SAVE_TAG_FILTER, body)
          // this.$store.dispatch(TAG_FILTERS_REQUEST)
        }
      } else {
        const body = {
          newFilter: false,
          filter_config: store.state.config.activeTagsFilter
        }
        store.dispatch(SAVE_TAG_FILTER, body)
      }
    }
    function onTagFilterSaveAs () {
      console.log('tagSearchBlock. onTagFilterSaveAs')
      store.dispatch(OPEN_SAVE_TAG_FILTER_DIALOG, chosenFilterId)
    }
    async function onTagFilterDelete () {
      // console.log('tagSearchBlock. onTagFilterDelete')
      const confirmed = await confirmation.value.showScenario('deleteFilter')
      if (confirmed) {
        const requestObj = {
          service: 'filters',
          path: '/filters/config/' + chosenFilterId,
          method: 'DELETE',
          body: null,
          options: {}
        }
        const msg = 'DELETE tag filter'
        const popupOptions = {
          showDialog: true,
          scenario: 'delete_get'
        }
        store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
          .then(response => {
            // console.log('tagSearchBlock. onTagFilterDelete. response:', response)
            store.dispatch(TAG_FILTERS_REQUEST)
            const filterObj = {
              activeFilter: [],
              activeFilterId: 'null'
            }
            activeFilter.value = []
            store.commit(UPDATE_USER_TAG_FILTER, filterObj)
          })
          .catch((error) => {
            console.error('tagSearchBlock. onTagFilterSave. Error:', error)
          })
      }
      // console.log('onTagFilterDelete', confirmed)
      // store.dispatch(OPEN_SAVE_TAG_FILTER_DIALOG, chosenFilterId)
    }
    return {
      confirmation,
      activeFilter,
      chosenFilterId,
      showAssignedToMe,
      labels,
      select,
      switchActiveFilter,
      onTagFilterSave,
      onTagFilterSaveAs,
      onTagFilterDelete
    }
  },
  watch: {
    globalSearchSelect () {
      const newFilterId = this.$store.state.config.activeTagsFilterId
      console.log('tagSearchBlock. watch. globalSearchSelect. onUpdate. newFilterId:', newFilterId)
      const switchFunc = this.switchActiveFilter
      this.select.destroy()
      this.select = new Select('#select', {
        placeholder: 'Choose filter',
        data: this.globalSearchSelect,
        selectedId: this.chosenFilterId,
        onSelect (item) {
          // console.log('Selected Item', item)
          switchFunc(item)
        }
      })
      this.select.select(newFilterId)
    },
    showAssignedToMe () {
      this.$store.commit(TOOGLE_SHOW_ASSIGNED_TO_ME)
    }
  },
  computed: {
    newTagFilterAdded () {
      console.log('tagSearchBlock. newTagFilterAdded.', this.$store.state.notificationActions.tagFilterSaveAsCounter)
      this.onNewFilterChange()
      return this.$store.state.notificationActions.tagFilterSaveAsCounter
    },
    activeFilterId () {
      return this.$store.state.config.activeTagsFilterId
    }
  },
  methods: {
    onNewFilterChange () {
      console.log('tagSearchBlock. onNewFilterChange. chosenFilterId:', this.chosenFilterId)
      // this.select.select(this.chosenFilterId)
    },
    setupTagSelect (destroy = false) {
      console.log('tagSearchBlock. setupTagSelect. destroy:', destroy)
      const switchFunc = this.switchActiveFilter
      if (destroy) {
        this.select.destroy()
      }
      const selected = String(this.chosenFilterId)
      // console.log('tagSearchBlock mounted selected:', this.chosenFilter)
      this.select = new Select('#select', {
        placeholder: 'Choose filter',
        data: this.globalSearchSelect,
        selectedId: selected,
        onSelect (item) {
          // console.log('Selected Item', item)
          switchFunc(item)
        }
      })
      // this.select.select(selected)
    }
  },
  mounted () {
    this.setupTagSelect()
  }
}
</script>

<style scoped>
.global-search-block__assigned_to_me_checkbox_block {
  padding: 0 5px;
}
.global-search-block__assigned_to_me_checkbox {
  display: flex;
  align-items: center;
  padding: 4px;
}
.global-search-block__assigned_to_me_checkbox input {
  transform: scale(1.5);
}
</style>
