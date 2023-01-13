<template>
  <div class="main__filter">
    <div class="linked-alerts__filter">
      <div class="filter__select" @click="showFilterMenu = !showFilterMenu" >
        <button class="button__filter">
          <svg width="12" height="12" viewbox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.55753 5.67045C4.68461 5.80749 4.75438 5.9865 4.75438 6.17169V11.6286C4.75438 11.957 5.15431 12.1236 5.39103 11.8928L6.9272 10.1483C7.13277 9.90384 7.24615 9.78284 7.24615 9.54087V6.17292C7.24615 5.98774 7.31716 5.80872 7.443 5.67167L11.8509 0.932112C12.1811 0.576551 11.9269 0 11.4385 0H0.561962C0.0735751 0 -0.181831 0.575316 0.149574 0.932112L4.55753 5.67045Z" fill="#3C3C3C"/>
          </svg>
          Filter by
          <svg width="11" height="6" viewbox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.5 6L10.2631 0H0.73686L5.5 6Z" fill="#3C3C3C"/>
          </svg>
        </button>

        <div class="filter__select-check" v-show="showFilterMenu" @mouseleave="showFilterMenu=false">
          <p class="checkbox">
              <input type="checkbox" id="ok" name="onlycomments" v-model="severityOk">
              <label for="ok">Ok</label>
          </p>

          <p class="checkbox">
              <input type="checkbox" id="information" name="onlycomments" v-model="severityInformation">
              <label for="information">Information</label>
          </p>

          <p class="checkbox">
              <input type="checkbox" id="warning" name="onlycomments" v-model="severityWarning">
              <label for="warning">Warning</label>
          </p>

          <p class="checkbox">
              <input type="checkbox" id="critical" name="onlycomments" v-model="severityCritical">
              <label for="critical">Critical</label>
          </p>
        </div>
      </div>
      <table :class="['filters-table', {'filters-table-history': historyMode}]">
        <thead>
          <draggable v-model="draggableFilters" tag="tr" :item-key="key => key">
            <template #item="{ element: filter }">
              <th scope="col" :style="{'width': filter.width + 'px'}"><filter-item
                  :name="filter.name"
                  :placeHolder="filter.placeholder"
                  @onGroupingChange="onFilterGrouping()"
                  @onFilterRemove="onFilterRemove(filter.id_)"
                  @onFilterChange="onFilterChange(filter.id_, $event)"
                /></th>
            </template>
          </draggable>
        </thead>
      </table>
<!--            Change time sort order-->
      <Tooltip :tooltipText="'Change order by time'">
        <div class="alert_cell time-cell time-cell-filter" v-if="!historyMode">
            <button class="button__icon-transparent" @click="onSortOrderChange">
              <svg width="15" height="17" viewbox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.4531 0.546867L10.4531 12.1285L8.54387 10.21C8.33081 9.99591 7.98456 9.99509 7.77048 10.2082C7.55638 10.4212 7.55559 10.7675 7.76862 10.9816L10.6124 13.8391C10.6125 13.8393 10.6127 13.8394 10.6129 13.8396C10.826 14.0531 11.1733 14.0538 11.3871 13.8396C11.3873 13.8395 11.3875 13.8393 11.3876 13.8392L14.2314 10.9816C14.4444 10.7676 14.4436 10.4213 14.2295 10.2082C14.0154 9.99514 13.6692 9.99596 13.4561 10.21L11.5469 12.1285L11.5469 0.546867C11.5469 0.244829 11.302 -6.83713e-06 11 -6.82393e-06C10.698 -6.81073e-06 10.4531 0.244829 10.4531 0.546867Z" fill="#3C3C3C"/>
                <path d="M3.45312 13.4531L3.45312 1.87147L1.54387 3.79002C1.33081 4.00409 0.984556 4.00491 0.770482 3.79185C0.556381 3.57879 0.555588 3.23251 0.768623 3.01843L3.61237 0.160901C3.61254 0.16071 3.61273 0.160573 3.61289 0.160409C3.82595 -0.0531184 4.17333 -0.053802 4.3871 0.160354C4.38727 0.160546 4.38746 0.160682 4.38762 0.160846L7.23137 3.01838C7.44438 3.23242 7.44364 3.57871 7.22951 3.7918C7.01544 4.00486 6.66918 4.00404 6.45612 3.78996L4.54687 1.87147L4.54687 13.4531C4.54687 13.7552 4.30203 14 4 14C3.69796 14 3.45312 13.7552 3.45312 13.4531Z" fill="#3C3C3C"/>
              </svg>
            </button>
        </div>
      </Tooltip>
<!--      Add column to the filter -->
      <Tooltip :tooltipText="'Add column'">
        <div class="time-cell time-cell-filter">
        <button class="button__icon-transparent" @click="showColumnMenu = !showColumnMenu">
          <icon-plus-circle/>
        </button>
        <div v-show="showColumnMenu" class="select-columns" @mouseleave="onSelectFilterMouseLeave">
          <div class="select-columns-search">
            <span>Search: </span>
            <input type="text" v-model="filterSearch">
          </div>
          <div v-for="filter in filtersMainArray.filter(x => !filter_names.includes(x.id_))"
               :key="filter.id_"
               @click="addFilter(filter.name, filter.placeholder, filter.id_)"
               >
            {{ filter.id_ }}
          </div>
          <div v-for="column in columnsArray.filter(x => !filter_names.includes(x.label_name))"
               :key="column.label_name"
               @click="addFilter(column.label_name, column.label_name, column.label_name)"
               >
            {{ column.label_name }}
          </div>
        </div>
      </div>
      </Tooltip>

    </div>
  </div>
  <!--
  <button @click="getColumnWidths()">
    Calculate
  </button>
  {{ columnWidths }}
  -->
</template>

<script>
import Tooltip from '@/components/Tooltip'
import filterItem from '@/components/notifications/filterItem'
import draggable from 'vuedraggable'
import IconPlusCircle from '@/components/icons/iconPlusCircle'
import {
  SORT_NOTIFICATIONS,
  PUSH_ITEM_TO_USER_COLUMN_FILTER,
  REMOVE_ITEM_TO_USER_COLUMN_FILTER,
  UPDATE_USER_COLUMNS_WIDTH_FILTER
} from '@/store/actions/config'

export default {
  props: {},
  emits: [
    'on-filter-change-gl',
    'on-filter-remove-gl',
    'on-grouping-change-gl',
    'on-order-by-changed',
    'on-columns-resize'
  ],
  components: {
    Tooltip,
    IconPlusCircle,
    draggable,
    filterItem
  },
  mounted () {
    // const filters = localStorage.getItem('filters')
    // this.filters = JSON.parse(JSON.stringify(this.$store.getters.filterColumns))
    // this.filters = this.$store.getters.filterColumns
    console.log('notificationFilter. mounted. filters:', this.filters)
    console.log(this.filters)
    // if (this.filters) {
    //   // this.filters = JSON.parse(filters)
    //   this.filters = filters
    // } else {
    //   this.filters = JSON.parse(JSON.stringify(this.filtersMain))
    // }
    setTimeout(() => {
      this.setResizableColumns()
      this.getColumnWidths()
    }, 200)
    this.getColumnWidths()
  },
  data () {
    return {
      // columnWidths: [],
      enabled: true,
      drag: false,
      draggableFilters: this.$store.getters.userFilterColumns,
      filterSearch: '',
      // filters: [],
      filtersMain: [
        {
          name: 'name',
          placeholder: 'Alert name...',
          id_: 'name'
        },
        {
          name: 'source',
          placeholder: 'Source...',
          id_: 'source'
        },
        {
          name: 'monitoring_system',
          placeholder: 'Monitoring system...',
          id_: 'monitoring_system'
        },
        {
          name: 'studio',
          placeholder: 'Environment...',
          id_: 'studio'
        }
      ],
      showFilterMenu: false,
      showColumnMenu: false,
      severityOk: false,
      severityWarning: false,
      severityInformation: false,
      severityCritical: false,
      sortDirection: true
    }
  },
  computed: {
    filters () {
      console.log('notificationFilter. computed. filters.', this.$store.getters.userFilterColumns)
      return this.$store.getters.userFilterColumns
    },
    filtersMainArray () {
      // TODO Change this.filterMain to list from store: this.$store.config.filterMain
      const filtersMainArray = this.filtersMain.filter(x => {
        if (this.filterSearch) {
          return x.name.includes(this.filterSearch)
        }
        return true
      })
      console.log('notificationFilter. computed. filtersMainArray:', filtersMainArray)
      return filtersMainArray
    },
    userFilterUpdate () {
      console.log('notificationFilter. computed. userFilterUpdate', this.$store.state.config.filterColumnsUpdatedCounter)
      // this.filters = JSON.parse(JSON.stringify(this.$store.getters.filterColumns))
      return this.$store.state.config.filterColumnsUpdatedCounter
    },
    columnsArray () {
      const columnsArray = this.columns.filter(x => {
        if (this.filterSearch) {
          return x.label_name.includes(this.filterSearch)
        }
        return true
      })
      console.log('notificationFilter. computed. columnsArray:', columnsArray)
      return columnsArray
    },
    filter_names () {
      const filterNames = this.filters.map(x => x.id_)
      console.log('notificationFilter. computed. filter_names:', filterNames)
      return filterNames
    },
    columns () {
      return this.$store.state.config.tagFilterValues
    },
    severityFilter () {
      const severityList = []
      if (this.severityOk) {
        severityList.push(0)
      }
      if (this.severityInformation) {
        severityList.push(1)
      }
      if (this.severityWarning) {
        severityList.push(2)
      }
      if (this.severityCritical) {
        severityList.push(3)
      }
      return severityList
    },
    historyMode () {
      return this.$store.getters.historyMode
    }
  },
  watch: {
    draggableFilters () {
      console.log('notificationFilter. watch. draggableFilters changed:', this.draggableFilters)
      // this.$store.commit(FILTER_COLUMNS_UPDATE, this.draggableFilters)
    },
    historyMode () {
      setTimeout(() => this.getColumnWidths(), 300)
    },
    severityFilter () {
      console.log('notificationFilter. watch. severityFilter:', this.severityFilter)
      this.onFilterChange('severity', this.severityFilter)
    },
    filters: {
      deep: true,
      handler () {
        console.log('notificationFilter. watch. filters:', this.filters)
        this.draggableFilters = this.filters
        setTimeout(() => {
          this.setResizableColumns()
          // this.getColumnWidths()
        }, 200)
        this.$emit('on-columns-resize', this.filters)
      }
    }
  },
  methods: {
    addFilter (name, placeholder, id_) {
      this.filterSearch = ''
      this.$store.commit(PUSH_ITEM_TO_USER_COLUMN_FILTER, {
        name: name,
        placeholder: placeholder,
        id_: id_,
        width: 140
      })
      // this.filters.push({
      //   name: name,
      //   placeholder: placeholder,
      //   id_: id_
      // })
      // localStorage.setItem('filters', JSON.stringify(this.filters))
      setTimeout(() => {
        this.setResizableColumns()
        this.getColumnWidths()
      }, 200)
    },
    onFilterRemove (filterName) {
      this.$store.commit(REMOVE_ITEM_TO_USER_COLUMN_FILTER, filterName)
      // this.filters = this.filters.filter(x => x.id_ !== filterName)
      // localStorage.setItem('filters', JSON.stringify(this.filters))
      this.$emit('on-filter-remove-gl', {
        filter: filterName
      })
      setTimeout(() => {
        this.setResizableColumns()
        this.getColumnWidths()
      }, 200)
      setTimeout(() => {
        this.draggableFilters = this.$store.getters.userFilterColumns
      }, 300)
    },
    onSelectFilterMouseLeave () {
      this.showColumnMenu = false
      this.filterSearch = ''
    },
    setResizableColumns () {
      let thElm
      let startOffset
      Array.prototype.forEach.call(
        document.querySelectorAll('table th'),
        function (th) {
          th.style.position = 'relative'
          th.classList.add('filter-columns')

          const grip = document.createElement('div')
          grip.innerHTML = '&nbsp;'
          grip.style.top = '0'
          grip.style.right = '0'
          grip.style.bottom = '0'
          grip.style.width = '3px'
          grip.style.borderLeftWidth = '1px'
          grip.style.borderLeftColor = 'lightgray'
          grip.style.borderLeftStyle = 'solid'
          grip.style.borderRightWidth = '1px'
          grip.style.borderRightColor = 'lightgray'
          grip.style.borderRightStyle = 'solid'
          grip.style.position = 'absolute'
          grip.style.cursor = 'col-resize'
          grip.addEventListener('mousedown', function (e) {
            thElm = th
            startOffset = th.offsetWidth - e.pageX
            e.preventDefault()
          })

          th.appendChild(grip)
        })
      document.addEventListener('mousemove', (e) => {
        if (thElm) {
          thElm.style.width = startOffset + e.pageX + 'px'
        }
      })
      document.addEventListener('mouseup', () => {
        this.getColumnWidths()
        thElm = undefined
      })
    },
    getColumnWidths () {
      // const widths = []
      // const ths = document.getElementsByTagName('th')
      this.$store.commit(UPDATE_USER_COLUMNS_WIDTH_FILTER)
      // for (let i = 0; i < ths.length; i++) {
      //   this.filters[i].width = ths[i].offsetWidth
      // }
      this.$emit('on-columns-resize', this.filters)
      // this.columnWidths = widths
    },
    onFilterGrouping () {
      this.$emit('on-grouping-change-gl')
    },
    onFilterChange (filterName, value) {
      console.log(filterName, value)
      this.$emit('on-filter-change-gl', {
        filter: filterName, pattern: value
      })
    },
    onSortOrderChange () {
      this.sortDirection = !this.sortDirection
      this.$store.dispatch(SORT_NOTIFICATIONS)
      this.$emit('on-order-by-changed')
    }
  }
}
</script>

<style scoped lang="scss">
  .select-columns {
    background-color: white;
    position: absolute;
    right: 0;
    top: 20px;
    width: 300px;
    z-index: 5;
    border-radius: 10px;
    box-shadow: 0 10px 50px rgba(23, 18, 43, 0.15);
    padding: 20px;
    > div {
      width: 50%;
      display: inline-block;
      text-align: center;
      padding: 5px 0;
      border-radius: 5px;
      cursor: pointer;
      &:hover {
        background-color: #f1f1f1;
      }
    }
    .select-columns-search {
      width: 100%;
      > input {
        padding: 4px;
        margin: 0;
        border: 1px solid black;
      }
      > span {
        padding-right: 5px;
      }
    }
  }
</style>
