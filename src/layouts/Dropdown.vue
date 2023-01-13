<template>
  <div class="dropdown-menu-box">
    <button class="dropdown-menu-title button__filter" @click="showDropdown = !showDropdown">
      <span v-html="selectedItem && !showDropdown ? `<b>${title}</b>: ${selectedItem.title}` : title"></span>
      <icon-angle-down :class="{'dropdown-menu-icon-rotate': showDropdown}"></icon-angle-down>
    </button>
    <div v-if="showDropdown"
         class="status-menu user__box-menu date-time-picker-shortcuts-menu dropdown-menu"
         @mouseleave="showDropdown = false">
      <button @click.stop="selectItem(item)"
              :key="item.id"
              :class="{'dropdown-menu-selected': selectedItem ? item.id === selectedItem.id : false }"
              v-for="item in items">
        {{ item.title }}
      </button>
    </div>
  </div>

</template>

<script>
// import IconPopupClose from '@/components/icons/iconPopupClose'
import IconAngleDown from '../components/icons/iconAngleDown'
export default {
  components: { IconAngleDown },
  emits: ['selectedItem'],
  props: ['items', 'title', 'preselected'],
  data: () => ({
    showDropdown: false,
    selectedItem: null
  }),
  mounted () {
    if (this.preselected) {
      this.selectedItem = this.items.find(x => x.id === this.preselected)
    }
  },
  methods: {
    selectItem (item) {
      this.selectedItem = item
      this.showDropdown = false
      this.$emit('selectedItem', item.id)
    }
  }
}
</script>

<style lang="scss">
 .dropdown-menu {
    top: 45px;
 }
 .dropdown-menu-title {
   background-color: white;
   border-radius: 5px;
   line-height: 40px;
   // font-weight: bold;
   display: flex;
   text-align: left;
   min-width: 170px;
   width: fit-content;
   white-space: nowrap;
   align-items: center;
   padding: 0 15px;
   span {
     flex: 1 0;
     margin-right: 10px;
   }

 }
 .dropdown-menu-box {
   display: inline-block;
   position: relative;

 }
 .dropdown-menu-icon-rotate {
   transform: rotate(180deg);
 }
 .dropdown-menu-selected {
   font-weight: bold;
   color: #00C284;
 }
</style>
