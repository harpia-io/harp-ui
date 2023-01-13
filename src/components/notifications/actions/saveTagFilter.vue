<template>
  <!-- popup code -->
  <div id="save-filter" class="notification-action-popup__box notification-action-popup">
    <div class="popup__box-header">
      <h4 class="popup__box-title">Add new filter</h4>
      <button class="popup__box-close" @click="close">
        <svg width="15" height="14" viewbox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.87424 6.99995L14.715 1.54847C15.0951 1.19388 15.0951 0.620543 14.715 0.265947C14.335 -0.088649 13.7207 -0.088649 13.3408 0.265947L7.49993 5.71743L1.65922 0.265947C1.27911 -0.088649 0.665003 -0.088649 0.285078 0.265947C-0.0950259 0.620543 -0.0950259 1.19388 0.285078 1.54847L6.12579 6.99995L0.285078 12.4514C-0.0950259 12.806 -0.0950259 13.3794 0.285078 13.734C0.474418 13.9108 0.723371 13.9997 0.972147 13.9997C1.22092 13.9997 1.4697 13.9108 1.65922 13.734L7.49993 8.28248L13.3408 13.734C13.5303 13.9108 13.7791 13.9997 14.0279 13.9997C14.2767 13.9997 14.5254 13.9108 14.715 13.734C15.0951 13.3794 15.0951 12.806 14.715 12.4514L8.87424 6.99995Z"
            fill="#3C3C3C" />
        </svg>
      </button>
    </div>

    <div class="popup__box-main" style="height: unset">
      <div>
        <fieldset>
          <legend>Filter name</legend>
          <input type="text" class="input_in_form" v-model="filterName" placeholder="Name of filter">
          <span v-if="v$.filterName.$invalid" class="input form-validation-error">
          Name of the filter is too short
          </span>
        </fieldset>
        <div class="checkbox_in_form">
          <label class="checkbox_in_form__label">Private filter</label>
          <input type="checkbox" v-model="privateFilter">
        </div>
      </div>
      <!-- popup buttons -->
      <div class="popup__box-buttons add-filter-buttons">
        <button class="button__medium button__default close" @click="close">Close</button>
        <button class="button__medium button__accent handle"
                @click="submit"
                :disabled="formInvalid"
                :class="{'button__accent': true, 'disabled': formInvalid}"
        >Save</button>
      </div>

    </div>
  </div>
</template>

<script>
import { HIDE_SAVE_TAG_FILTER_DIALOG, SAVE_TAG_FILTER } from '@/store/actions/notificationActions'
import { required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { TAG_FILTERS_REQUEST } from '@/store/actions/config'
export default {
  data () {
    return {
      filterName: '',
      privateFilter: false,
      v$: useVuelidate()
    }
  },
  computed: {
    formInvalid () {
      return this.v$.$invalid
    }
    // showSaveFilterDialog () {
    // this.onDialogOpen()
    // return this.$store.getters.showSaveFilterDialog
    // }
  },
  // watch: {
  //   showSaveFilterDialog () {
  // this.onDialogOpen()
  //   }
  // },
  validations () {
    return {
      filterName: {
        required
      }
    }
  },
  methods: {
    // onDialogOpen () {
    //   const activeTagsFilterId = this.$store.state.config.activeTagsFilterId
    //   const globalSearchSelect = this.$store.state.config.tagFilters.global_search_select
    //   const activeFilter = globalSearchSelect.filter(item => (item.id === activeTagsFilterId))
    //   if (activeFilter.length === 1) {
    //     this.filterName = activeFilter[0].value + '(Copy)'
    //   }
    // this.filterName = globalFilterDict[activeTagsFilterId]
    // console.log('saveTagFilter. onDialogOpen. activeTagsFilterId:', activeTagsFilterId)
    // console.log('saveTagFilter. onDialogOpen. globalSearchSelect:', globalSearchSelect)
    // console.log('saveTagFilter. onDialogOpen. activeFilter:', activeFilter)
    // console.log('saveTagFilter. onDialogOpen. filterName:', this.filterName)
    // },
    close () {
      console.log('saveTagFilter. Close dialog')
      this.$store.commit(HIDE_SAVE_TAG_FILTER_DIALOG)
    },
    submit () {
      const body = {
        newFilter: true,
        filter_name: this.filterName,
        filter_config: this.$store.state.config.activeTagsFilter,
        filter_status: this.privateFilter ? 'private' : 'public'
      }
      console.log('saveTagFilter. Save dialog: body:', body)
      this.$store.dispatch(SAVE_TAG_FILTER, body)
      this.$store.dispatch(TAG_FILTERS_REQUEST)
    },
    onAddNewFilter () {
      this.newFilter = true
    }
  }
}
</script>

<style scoped>
#save-filter {
  max-width: 350px;
}
.notification-action-popup {
  background: var(--c-white);
  margin: 20px;
}
.notification-action-popup__box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--c-background);
  width: 100%;
  max-height: 100vh;
  z-index: 6;
}
.input_in_form {
  display: block;
  width: 100%;
  height: 29px;
  margin-bottom: 5px;
  padding: 2px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.checkbox_in_form {
  display: block;
  width: 100%;
  height: 29px;
  margin-bottom: 5px;
  padding: 2px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
}
.checkbox_in_form__label {
  padding: 0 10px;
}
.disabled {
  background-color: dimgrey;
}
fieldset {
  border: 0;
  margin: 0 0 10px;
}

fieldset legend {
  display: block;
  font-size: var(--s-input);
  letter-spacing: 0.4px;
  color: var(--c-text);
  margin: 0 0 5px;
}
.add-filter-buttons {
  justify-content: space-between;
}
</style>
