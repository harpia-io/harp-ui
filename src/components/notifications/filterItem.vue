<template>
    <input v-if="historyMode"
      type="text"
      :name="name"
      :placeholder="placeHolder"
      @keypress.enter="onFilterChange"
      v-model="filterValue"
      class="filter input__text input">
    <input v-else
      type="text"
      :name="name"
      :placeholder="placeHolder"
      v-model="filterValue"
      class="filter input__text input">
    <div class="filter-icons-tab" :style="grouping.includes(name) ? 'display: block' : ''">
      <Tooltip :tooltipText="'Delete column'">
        <icon-trash-o v-if="name !== 'notificationName'" @click="$emit('on-filter-remove')" />
      </Tooltip>
      <Tooltip :tooltipText="'Group alerts'">
        <icon-group :btn-color="grouping.includes(name) ? '#04B404' : '#3C3C3C'" @click="groupNotifications()"/>
      </Tooltip>
    </div>
</template>

<script>
import Tooltip from '@/components/Tooltip'
import IconTrashO from '@/components/icons/iconTrashO'
import IconGroup from '@/components/icons/iconGroup'
import { GROUP_NOTIFICATIONS } from '@/store/actions/config'

export default {
  components: { IconGroup, IconTrashO, Tooltip },
  emits: [
    'onGroupingChange',
    'onFilterChange',
    'onFilterRemove'
  ],
  props: {
    name: String,
    placeHolder: String
  },
  data () {
    return {
      filterValue: ''
    }
  },
  watch: {
    filterValue () {
      if (!this.historyMode) {
        this.onFilterChange()
      }
    }
  },
  computed: {
    historyMode () {
      return this.$store.getters.historyMode
    },
    grouping () {
      return this.$store.state.config.tagGrouping
    }
  },
  methods: {
    onFilterChange () {
      this.$emit('onFilterChange', this.filterValue)
    },
    groupNotifications () {
      this.$store.dispatch(GROUP_NOTIFICATIONS, this.name)
      this.$emit('onGroupingChange')
    }
  }
}
</script>

<style lang="scss">
  .filter-icons-tab {
    display: none;
    position: absolute;
    right: 0;
    top: 0;
    padding-right: 5px;
    padding-top: 9px;
    color: dimgrey;
    opacity: 1;
    &:hover {
      display: block;
    }
    img {
      cursor: pointer;
      width: 15px;
      margin-right: 5px;
    }
    svg {
      cursor: pointer;
      margin-right: 5px;
    }
  }
  .filter {
    cursor: pointer;
    &:hover ~ div {
      display: block;
    }
  }
</style>
