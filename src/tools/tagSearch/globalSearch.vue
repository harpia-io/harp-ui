<template>
  <div class="global-search-tags-filters-block" v-click-outside="leaveTagFilterArea">
    <div v-for="(searchItem, index) in searchItems" :key="index" class="global-search-item">
      <div class="global-search-item__tag">
        <suggest-input
          v-if="searchItem.tag.length === 0"
          :id="'suggest-input-tag-' + index"
          :suggestions="tagSuggestions"
          :selected="searchItem.tag"
          @enter-press="onSelectLeave(index, $event, 'tag')"
          :placeholder='"label"'
          :add-tag="true"
        />
        <span v-else class="global-search-item__tag_filled"> {{ searchItem.tag }} </span>
      </div>
      <div class="global-search-item__condition" v-show="searchItems[index].tag">
        <span style="padding: 0 1px">{{searchItem.condition}}</span>
      </div>
      <div class="global-search-item__value" v-show="searchItems[index].tag">
        <suggest-input
          v-if="searchItem.value.length === 0"
          :id="'suggest-input-value-' + index"
          :suggestions="valueSuggestions"
          :selected="searchItem.value"
          @enter-press="onSelectLeave(index, $event, 'value')"
          :placeholder='"value"'
          :add-tag="true"
        />
        <span v-else class="global-search-item__tag_filled"> {{ searchItem.value }} </span>
      </div>
      <div class="global-search-item__close" v-show="searchItems[index].tag" @click="deleteFilterItem(index)">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="7pt" height="7pt" viewBox="0 0 7 7" version="1.1">
          <g id="surface1">
            <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 5.257812 0.300781 C 5.660156 -0.0976562 6.3125 -0.101562 6.714844 0.296875 C 7.117188 0.695312 7.117188 1.34375 6.71875 1.742188 L 4.960938 3.496094 L 6.71875 5.253906 C 7.117188 5.648438 7.113281 6.292969 6.707031 6.691406 C 6.304688 7.085938 5.65625 7.085938 5.257812 6.6875 L 3.511719 4.945312 L 1.757812 6.691406 C 1.359375 7.09375 0.707031 7.09375 0.304688 6.695312 C -0.0976562 6.296875 -0.101562 5.648438 0.300781 5.25 L 2.058594 3.496094 L 0.296875 1.738281 C -0.101562 1.34375 -0.09375 0.699219 0.308594 0.304688 C 0.714844 -0.09375 1.363281 -0.09375 1.761719 0.304688 L 3.507812 2.046875 Z M 5.257812 0.300781 "/>
          </g>
        </svg>
      </div>
    </div>
    <div class="add-button" @click="addFilterItem"
         v-if="addNewFilterItemButtonShow"
    ><i class="fas fa-plus"></i></div>
    <div v-else class="global-search-item">
      <div class="global-search-item__tag">
        <suggest-input
          v-if="newItemTemplate.tag.length === 0"
          :suggestions="labelNamesSuggestions"
          :id="'suggest-input-tag-new'"
          :selected="newItemTemplate.tag"
          @enter-press="onNewItemSelectLeave($event, 'tag')"
          :placeholder='"label"'
          :add-tag="true"
          :min-width="'100px'"
          :max-width="'600px'"
          :destroy-on-leave="true"
          @destroy-element="deleteTemplateFilterItem"
        />
        <span v-else class="global-search-item__tag_filled"> {{ newItemTemplate.tag }} </span>
      </div>
      <div class="global-search-item__condition" v-show="newItemTemplate.tag">
        <suggest-input
          v-if="newItemTemplate.condition.length === 0"
          :suggestions="optionsSuggestions"
          :id="'suggest-input-condition-new'"
          :selected="newItemTemplate.condition"
          @enter-press="onNewItemSelectLeave($event, 'condition')"
          :placeholder='"="'
          :add-tag="false"
          :min-width="'30px'"
          :max-width="'400px'"
          :destroy-on-leave="true"
          @destroy-element="deleteTemplateFilterItem"
        />
        <span style="padding: 0 1px" v-else>{{ newItemTemplate.condition }}</span>
      </div>
      <div class="global-search-item__value" v-show="newItemTemplate.condition">
        <suggest-input
          v-if="newItemTemplate.value.length === 0"
          :id="'suggest-input-value-new'"
          :suggestions="labelValueSuggestions"
          :selected="newItemTemplate.value"
          @enter-press="onNewItemSelectLeave($event, 'value')"
          :placeholder='"value"'
          :add-tag="true"
          :min-width="'100px'"
          :max-width="'600px'"
        />
        <span v-else class="global-search-item__tag_filled"> {{ newItemTemplate.value }} </span>
      </div>
      <div class="global-search-item__close" v-show="newItemTemplate.tag" @click="deleteTemplateFilterItem">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="7pt" height="7pt" viewBox="0 0 7 7" version="1.1">
          <g id="surface1">
            <path style=" stroke:none;fill-rule:evenodd;fill:rgb(0%,0%,0%);fill-opacity:1;" d="M 5.257812 0.300781 C 5.660156 -0.0976562 6.3125 -0.101562 6.714844 0.296875 C 7.117188 0.695312 7.117188 1.34375 6.71875 1.742188 L 4.960938 3.496094 L 6.71875 5.253906 C 7.117188 5.648438 7.113281 6.292969 6.707031 6.691406 C 6.304688 7.085938 5.65625 7.085938 5.257812 6.6875 L 3.511719 4.945312 L 1.757812 6.691406 C 1.359375 7.09375 0.707031 7.09375 0.304688 6.695312 C -0.0976562 6.296875 -0.101562 5.648438 0.300781 5.25 L 2.058594 3.496094 L 0.296875 1.738281 C -0.101562 1.34375 -0.09375 0.699219 0.308594 0.304688 C 0.714844 -0.09375 1.363281 -0.09375 1.761719 0.304688 L 3.507812 2.046875 Z M 5.257812 0.300781 "/>
          </g>
        </svg>
      </div>
    </div>

  </div>
<!--  <div class="save-filter-block" v-if="filterChanged">-->

<!--    <div class="save-button">-->
<!--      <button class="button__medium button__accent handle" @click="onTagFilterSave">Save</button>-->
<!--    </div>-->
<!--  </div>-->
  <!--  <pre>{{searchItems}}</pre>-->
</template>

<script>
import suggestInput from '@/tools/tagSearch/suggestInput'
import { ref, toRef } from 'vue'
import { useStore } from 'vuex'
import { ADD_ITEM_TO_USER_TAG_FILTER, REMOVE_ITEM_TO_USER_TAG_FILTER } from '@/store/actions/notificationActions'
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
    chosenElement: {
      type: String,
      required: false,
      default: '0'
    },
    labels: {
      type: Array,
      required: false,
      default () {
        return []
      }
    }
  },
  // emits: [
  //   'add-filter-item'
  // ],
  components: {
    suggestInput
  },
  computed: {
    labelValueSuggestions () {
      // console.log('globalSearch. computed. labelValueSuggestions. label_name:', this.newItemTemplate.tag)
      let labelValues = []
      this.labels.forEach(item => {
        if (item.label_name === this.newItemTemplate.tag) {
          labelValues = item.label_values
        }
      })
      // console.log('globalSearch. computed. labelValueSuggestions. labelValues:', labelValues)

      return labelValues
    },
    labelNamesSuggestions () {
      const labelNames = []
      this.labels.forEach(item => {
        // console.log('globalSearch. computed. labelNamesSuggestions. item', item)
        labelNames.push(item.label_name)
      })
      // console.log('globalSearch. computed. labelNamesSuggestions. labelNames:', labelNames, 'labels', this.labels)
      return labelNames
    }
  },
  setup (props, context) {
    // console.log('globalSearch. props. globalSearchSelect:', props.globalSearchSelect)
    // console.log('globalSearch. props. globalFilterDict:', props.globalFilterDict)
    // console.log('globalSearch. props. chosenElement:', props.chosenElement)
    const store = useStore()
    const optionsSuggestions = ['=', '!=', '~', '!~']
    const chosenOption = ref(props.chosenElement)
    const searchItems = toRef(props, 'globalFilterDict')
    const filterChanged = ref(false)
    // const { globalFilterDict } = toRefs(props)
    const globalSearchSelectOptions = ref(props.globalSearchSelect)
    // addFilterItem()
    console.log('globalSearch. setup. searchItems value:', searchItems.value)
    // if (searchItems.value.length === 0) {
    //   addFilterItem()
    // }
    const addNewFilterItemButtonShow = ref(true)
    const newItemTemplate = ref({
      tag: '',
      condition: '',
      value: ''
    })
    const activeFilterObjIndex = ref(searchItems.value.length)
    const globalSearchInput = ref('')
    const newFilterName = ref('')
    async function onSelectLeave (index, value, fieldType) {
      console.log('globalSearch. methods. onSelectLeave.', index, value, fieldType)
      searchItems.value[index][fieldType] = value
      let el = null
      if (fieldType === 'tag') {
        el = document.getElementById('suggest-input-value-' + index).querySelector('input')
        setTimeout(function () { el.focus() }, 200)
      } else {
        addFilterItem()
        await setTimeout(function () {
          el = document.getElementById('suggest-input-tag-' + (index + 1)).querySelector('input')
          setTimeout(function () { el.focus() }, 200)
        }, 300)
        filterChanged.value = true
      }
    }
    async function onNewItemSelectLeave (value, fieldType) {
      console.log('globalSearch. methods. onNewItemSelectLeave.', value, fieldType)
      newItemTemplate.value[fieldType] = value
      let el = null
      if (fieldType === 'tag') {
        setTimeout(function () {
          el = document.getElementById('suggest-input-condition-new').querySelector('input')
          el.focus()
        }, 800)
      } else if (fieldType === 'condition') {
        setTimeout(function () {
          el = document.getElementById('suggest-input-value-new').querySelector('input')
          el.focus()
        }, 800)
      } else {
        // commit changes to store
        store.commit(ADD_ITEM_TO_USER_TAG_FILTER, newItemTemplate.value)
        console.log('onNewItemSelectLeave. newItem:', newItemTemplate.value)
        addNewFilterItemButtonShow.value = true
        newItemTemplate.value = {
          tag: '',
          condition: '',
          value: ''
        }
        filterChanged.value = true
      }
    }
    function addFilterItem () {
      console.log('globalSearch. addFilterItem')
      addNewFilterItemButtonShow.value = false
      // context.emit('add-filter-item')

      setTimeout(function () {
        const el = document.getElementById('suggest-input-tag-new').querySelector('input')
        console.log(el)
        el.focus()
      }, 200)
      // searchItems.value.push({
      //   tag: '',
      //   condition: 'equal',
      //   value: ''
      // })
    }
    function deleteFilterItem (index) {
      store.commit(REMOVE_ITEM_TO_USER_TAG_FILTER, index)
      // searchItems.value.splice(index, 1)
      filterChanged.value = true
    }
    function deleteTemplateFilterItem () {
      addNewFilterItemButtonShow.value = true
      newItemTemplate.value = {
        tag: '',
        condition: '',
        value: ''
      }
    }
    function leaveTagFilterArea () {
      if (addNewFilterItemButtonShow.value === false) {
        console.log('globalSearch. create. leaveTagFilterArea. deleting template')
        deleteTemplateFilterItem()
      }
    }
    // function onFilterUpdate () {
    //   console.log('globalSearch setup onFilterUpdate')
    // }

    console.log('globalSearch. setup. searchItems:', searchItems.value)
    // watch(globalFilterDict, onFilterUpdate)
    return {
      searchItems,
      // labels,
      // tagSuggestions,
      // valueSuggestions,
      chosenOption,
      globalSearchSelectOptions,
      activeFilterObjIndex,
      globalSearchInput,
      filterChanged,
      newFilterName,
      addNewFilterItemButtonShow,
      newItemTemplate,
      optionsSuggestions,
      onSelectLeave,
      onNewItemSelectLeave,
      addFilterItem,
      deleteFilterItem,
      deleteTemplateFilterItem,
      leaveTagFilterArea
    }
  }
}
</script>

<style scoped>
.global-search-tags-filters-block {
  background: white;
  border-radius: 7px;
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
  align-items: center;
  margin-right: 10px;
}
.global-search-item {
  border: 1px solid lightgrey;
  border-radius: 4px;
  padding: 3px 5px;
  margin: 2px 2px;
  display: flex;
  background-color: white;
  /* background-color: rgba(156, 156, 156, 0.35); */
}
.global-search-item:hover {
  background-color: #f1f1f1;
}
.global-search-item__tag {
  color: #9CA2AC;
  min-width: 2px;
  display: flex;
  align-items: center;
}
.global-search-item__condition {
  color: #2c3e50;
  display: flex;
  max-width: 30px;
  align-items: center;
}
.global-search-item__value {
  color: darkblue;
  display: flex;
  align-items: center;
}
.global-search-input input {
  border: unset;
  font-size: 14px;
  padding: 5px;
  margin: 0 2px;
}
.global-search-item__tag_filled {
  background-color: rgba(186, 193, 216, 0.82);
  border-radius: 5px;
  color: black;
  padding: 1px 2px;
}
.global-search-item__close {
  padding: 4px;
  margin-left: 2px;
  cursor: pointer;
  border-radius: 4px;
  display: flex;
  align-items: center;
}
.global-search-item__close:hover {
  cursor: pointer;
  background-color: var(--c-red);
}
.add-button {
  height: 30px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.add-button:hover {
  cursor: pointer;
  border: 1px solid var(--c-accent);;
  background-color: var(--c-accent);
  border-radius: 5px;
}
.save-filter-block {
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 20px;
}
.save-filter-block-input {
  display: block;
  font-size: 14px;
  padding: 2px;
  height: 35px;
  line-height: 1.42857143;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
  -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
}
.save-button {
  margin: 5px;
}
.filter-type {
  margin-left: auto;
}
</style>
<style lang="scss">
.global-search-controls-block .button__text-icon {
  padding: 3px 10px;
}
</style>
