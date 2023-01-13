/* eslint-disable promise/param-names */
import {
  ENV_REQUEST,
  UPDATE_ENV_FILTER,
  UPDATE_DESTINATION_FILTER,
  UPDATE_STATE_FILTER,
  GET_FILTERS,
  UPDATE_ENV_FILTER_ON_LOAD,
  UPDATE_STATE_FILTER_ON_LOAD,
  UPDATE_DESTINATION_FILTER_ON_LOAD,
  GET_UI_SETTINGS,
  GET_USERS,
  UPDATE_NOTIFICATION_SORTING,
  SORT_NOTIFICATIONS,
  UPDATE_SHOW_SIDEBAR,
  UPDATE_SHOW_SIDEBAR_ON_LOAD,
  BLUR_FIRST_POPUP,
  UNBLUR_FIRST_POPUP,
  UPDATE_BLUR_STATE,
  ENABLE_HISTORY_MODE,
  DISABLE_HISTORY_MODE,
  UPDATE_DEBUG_MODE,
  SCENARIOS_REQUEST,
  UPDATE_SCENARIOS,
  AVAILABLE_INTEGRATIONS_REQUEST,
  AVAILABLE_BOTS_REQUEST,
  UPDATE_AVAILABLE_INTEGRATIONS,
  UPDATE_AVAILABLE_BOTS,
  AVAILABLE_ACTIONS_REQUEST,
  AVAILABLE_ACTIONS_UPDATE,
  PUT_NEW_INTEGRATIONS,
  PUT_NEW_BOTS,
  TAG_FILTERS_REQUEST,
  UPDATE_TAG_FILTERS,
  ADD_TAG_GROUPING,
  REMOVE_TAG_GROUPING,
  UPDATE_USER_TAG_FILTER,
  UPDATE_USER_TAG_FILTER_ID,
  ADD_ITEM_TO_USER_TAG_FILTER,
  REMOVE_ITEM_TO_USER_TAG_FILTER,
  TAG_FILTER_VALUES_REQUEST,
  TAG_FILTER_VALUES_UPDATE,
  GROUP_NOTIFICATIONS,
  CLEAR_GROUPING,
  UPDATE_TAG_GROUPING,
  GET_FILTER_COLUMNS,
  FILTER_COLUMNS_UPDATE,
  PUSH_ITEM_TO_USER_COLUMN_FILTER,
  REMOVE_ITEM_TO_USER_COLUMN_FILTER,
  UPDATE_USER_COLUMNS_WIDTH_FILTER,
  UPDATE_STORE_USERS,
  TRIGGER_USER_FILTER_UPDATE,
  TOOGLE_SHOW_ASSIGNED_TO_ME
} from '../actions/config'

const { Settings } = require('luxon')

const state = {
  environments: {},
  scenarios: {},
  availableIntegrations: [],
  availableBots: [],
  availableActions: {},
  activeTagsFilter: [],
  activeTagsFilterId: null,
  tagFilters: {
    global_filter_dict: {},
    global_search_select: {}
  },
  tagGrouping: [],
  notificationSorting: {
    sort_by_field: 'total_duration',
    sort_type: 'sorted'
  },
  tagFilterValues: [],
  showAssignedToMe: false,
  filterColumns: [],
  filterColumnsUpdatedCounter: 0,
  users: [],
  filters: {
    destinationFilter: {
      ui: true,
      teams: false,
      email: false,
      telegram: false,
      whatsapp: false,
      signl4: false
    },
    stateFilter: {
      active: true,
      handled: false,
      snoozed: false,
      acknowledged: false
    },
    environmentFilter: []
  },
  notificationTypesDict: {
    1: 'ui',
    2: 'email',
    3: 'jira',
    4: 'skype',
    5: 'teams',
    6: 'telegram',
    7: 'pagerduty',
    8: 'sms',
    9: 'voice',
    10: 'whatsapp',
    11: 'signl4'
  },
  dstTypesDict: {
    ui: 1,
    email: 2,
    jira: 3,
    skype: 4,
    teams: 5,
    telegram: 6,
    pagerduty: 7,
    sms: 8,
    voice: 9,
    whatsapp: 10,
    signl4: 11
  },
  filterUpdateCounter: 0,
  tzLocale: Settings.defaultLocale = 'utc',
  tzTimeZone: Settings.defaultZoneName = 'utc',
  showSideBar: false,
  historyMode: false,
  blurMainLayout: false,
  debugMode: false,
  filtersMain: [
    {
      name: 'name',
      placeholder: 'Alert name...',
      id_: 'name',
      width: 300
    },
    {
      name: 'source',
      placeholder: 'Source...',
      id_: 'source',
      width: 300
    },
    {
      name: 'monitoring_system',
      placeholder: 'Monitoring system...',
      id_: 'monitoring_system',
      width: 300
    },
    {
      name: 'studio',
      placeholder: 'Environment...',
      id_: 'studio',
      width: 300
    }
  ],
  usersList: [],
  usersDict: {}
}

const getters = {
  getEnv: state => state.environments,
  getScenarios: state => state.scenarios,
  getAvailableIntegrations: state => state.availableIntegrations,
  getAvailableBots: state => state.availableBots,
  getEnvFilter: state => state.filters.environmentFilter,
  userEnvListWithFilter: state => {
    const envList = []
    for (const [envId, envName] of Object.entries(state.environments)) {
      envList.push({
        id: envId,
        name: envName,
        checked: state.filters.environmentFilter.includes(Number(envId))
      })
    }
    return envList
  },
  userFilterForBridge: state => {
    const states = []
    const destinations = []
    if (state.filters.stateFilter) {
      for (const [stateName, stateStatus] of Object.entries(state.filters.stateFilter)) {
        if (stateStatus) {
          states.push(stateName)
        }
      }
    }
    if (state.filters.destinationFilter) {
      for (const [dstName, dstStatus] of Object.entries(state.filters.destinationFilter)) {
        if (dstStatus) {
          destinations.push(dstName)
        }
      }
    }
    return {
      environments: state.filters.environmentFilter,
      destinationFilter: destinations,
      notificationStatesFilter: states,
      tagFilter: state.activeTagsFilter,
      tagGrouping: state.tagGrouping,
      notificationSorting: state.notificationSorting,
      showAssignedToMe: state.showAssignedToMe
    }
  },
  dstTypeIdList: state => {
    const dstIdsList = []
    for (const [dstType, dstStatus] of Object.entries(state.filters.destinationFilter)) {
      if (dstStatus) {
        dstIdsList.push(state.dstTypesDict[dstType])
      }
    }
    return dstIdsList
  },
  userLocale: state => state.tzLocale,
  historyMode: state => state.historyMode,
  blurMainLayout: state => state.blurMainLayout,
  debugMode: state => state.debugMode,
  globalFilterDict: state => state.tagFilters.global_filter_dict,
  globalSearchSelect: state => state.tagFilters.global_search_select,
  activeTagFilterId: state => state.activeTagsFilterId,
  filterColumnsUpdatedCounter: state => state.filterColumnsUpdatedCounter,
  filterColumns: state => {
    if (state.filterColumns.length > 0) {
      return state.filterColumns
    } else {
      return state.filtersMain
    }
  },
  userFilterColumns: state => state.filterColumns,
  userFilterGrouping: state => state.tagGrouping,
  usersList: state => state.usersList,
  usersDict: state => state.usersDict,
  showAssignedToMe: state => state.showAssignedToMe
}

const actions = {
  [ENV_REQUEST]: ({ commit, getters }) => {
    return new Promise((resolve, reject) => {
      const [url, params] = getters.generateUrl('users', '/users/availableEnvironments')
      // console.log('Store.modules.config.js. Actions. ENV_REQUEST. URL:', url, 'Params:', params)
      fetch(url, params)
        .then(response => response.json())
        .then(response => {
          console.log('Store.modules.config.js. Actions. ENV_REQUEST. response: ', response)
          commit(ENV_REQUEST, response)
          resolve()
        })
        .catch((err) => {
          console.error('Store.modules.config.js. Actions. ENV_REQUEST. Error: ', err)
          reject(err)
        })
    })
  },
  [SCENARIOS_REQUEST]: ({ commit, getters }) => {
    return new Promise((resolve, reject) => {
      const [url, params] = getters.generateUrl('scenarios', '/scenarios/all')
      // console.log('Store.modules.config.js. Actions. SCENARIOS_REQUEST. URL:', url, 'Params:', params)
      fetch(url, params)
        .then(response => response.json())
        .then(response => {
          console.log('Store.modules.config.js. Actions. SCENARIOS_REQUEST. response: ', response)
          commit(UPDATE_SCENARIOS, response.scenarios)
          resolve()
        })
        .catch((err) => {
          console.error('Store.modules.config.js. Actions. SCENARIOS_REQUEST. Error: ', err)
          reject(err)
        })
    })
  },
  [AVAILABLE_INTEGRATIONS_REQUEST]: ({ commit, getters }) => {
    return new Promise((resolve, reject) => {
      const [url, params] = getters.generateUrl('integrations', '/integrations/available/all')
      // console.log('Store.modules.config.js. Actions. SCENARIOS_REQUEST. URL:', url, 'Params:', params)
      fetch(url, params)
        .then(response => response.json())
        .then(response => {
          console.log('Store.modules.config.js. Actions. AVAILABLE_INTEGRATIONS_REQUEST. response: ', response)
          commit(UPDATE_AVAILABLE_INTEGRATIONS, response.integrations)
          resolve()
        })
        .catch((err) => {
          console.error('Store.modules.config.js. Actions. AVAILABLE_INTEGRATIONS_REQUEST. Error: ', err)
          reject(err)
        })
    })
  },
  [AVAILABLE_BOTS_REQUEST]: ({ commit, getters }) => {
    return new Promise((resolve, reject) => {
      const [url, params] = getters.generateUrl('bots', '/bots/all')
      fetch(url, params)
        .then(response => response.json())
        .then(response => {
          console.log('Store.modules.config.js. Actions. AVAILABLE_BOTS_REQUEST. response: ', response)
          commit(UPDATE_AVAILABLE_BOTS, response.bots)
          resolve()
        })
        .catch((err) => {
          console.error('Store.modules.config.js. Actions. AVAILABLE_BOTS_REQUEST. Error: ', err)
          reject(err)
        })
    })
  },
  [AVAILABLE_ACTIONS_REQUEST]: ({ commit, getters }) => {
    return new Promise((resolve, reject) => {
      const body = JSON.stringify({
        environment_id: 101
      })
      const [url, params] = getters.generateUrl('scenarios', '/scenarios/search-actions', 'POST', body)
      console.log('Store.modules.config.js. Actions. AVAILABLE_ACTIONS_REQUEST. URL:', url, 'Params:', params)
      fetch(url, params)
        .then(response => response.json())
        .then(response => {
          console.log('Store.modules.config.js. Actions. AVAILABLE_ACTIONS_REQUEST. response: ', response)
          commit(AVAILABLE_ACTIONS_UPDATE, response.msg)
          resolve()
        })
        .catch((err) => {
          console.error('Store.modules.config.js. Actions. AVAILABLE_ACTIONS_REQUEST. Error: ', err)
          reject(err)
        })
    })
  },
  [TAG_FILTERS_REQUEST]: ({ commit, getters }) => {
    return new Promise((resolve, reject) => {
      const [url, params] = getters.generateUrl('filters', '/filters/config/all')
      console.log('Store.modules.config.js. Actions. TAG_FILTERS_REQUEST. URL:', url, 'Params:', params)
      fetch(url, params)
        .then(response => response.json())
        .then(response => {
          console.log('Store.modules.config.js. Actions. TAG_FILTERS_REQUEST. response: ', response)
          commit(UPDATE_TAG_FILTERS, response.filters)
          resolve()
        })
        .catch((err) => {
          console.error('Store.modules.config.js. Actions. TAG_FILTERS_REQUEST. Error: ', err)
          reject(err)
        })
    })
  },
  [TAG_FILTER_VALUES_REQUEST]: ({ commit, getters }) => {
    return new Promise((resolve, reject) => {
      const [url, params] = getters.generateUrl('filters', '/filters/labels/all')
      console.log('Store.modules.config.js. Actions. TAG_FILTER_VALUES_REQUEST. URL:', url, 'Params:', params)
      fetch(url, params)
        .then(response => response.json())
        .then(response => {
          console.log('Store.modules.config.js. Actions. TAG_FILTER_VALUES_REQUEST. response: ', response)
          commit(TAG_FILTER_VALUES_UPDATE, response.labels)
          resolve()
        })
        .catch((err) => {
          console.error('Store.modules.config.js. Actions. TAG_FILTER_VALUES_REQUEST. Error: ', err)
          reject(err)
        })
    })
  },
  [GET_FILTER_COLUMNS]: ({ commit, getters, state }, filterId) => {
    return new Promise((resolve, reject) => {
      // const activeTagFilterId = localStorage.getItem('active-tag-filter-id')
      const activeTagFilterId = filterId.filterId
      // const columns = []
      if (activeTagFilterId) {
        const [url, params] = getters.generateUrl('filters', '/filters/config/' + activeTagFilterId)
        console.log('Store.modules.config.js. Actions. GET_FILTER_COLUMNS. URL:', url, 'Params:', params)
        fetch(url, params)
          .then(response => {
            if (response.status === 200) {
              console.log('Store.modules.config.js. Actions. GET_FILTER_COLUMNS. Response is 200')
              return response.json()
            } else {
              console.log('Store.modules.config.js. Actions. GET_FILTER_COLUMNS. Response is not 200. Default columns is used')
              localStorage.setItem('active-tag-filter-id', 'null')
              return {
                columns: state.filtersMain,
                grouping: []
              }
            }
          })
          .then(response => {
            console.log('Store.modules.config.js. Actions. GET_FILTER_COLUMNS. response: ', response)
            commit(FILTER_COLUMNS_UPDATE, response.columns)
            commit(UPDATE_TAG_GROUPING, response.grouping === undefined ? [] : response.grouping)
            // commit(UPDATE_TAG_GROUPING, [])
            resolve()
          })
          .catch((err) => {
            console.error('Store.modules.config.js. Actions. GET_FILTER_COLUMNS. Error: ', err)
            reject(err)
          })
      } else {
        commit(FILTER_COLUMNS_UPDATE, state.filtersMain)
        resolve()
      }
      // console.log('Store.modules.config.js. Actions. GET_FILTER_COLUMNS. columns:', columns)
    })
  },
  [GET_FILTERS]: ({ commit }) => {
    // console.log('GET_FILTERS')
    const envFilter = localStorage.getItem('env-filter')
    if (envFilter) {
      commit(UPDATE_ENV_FILTER_ON_LOAD, JSON.parse(envFilter))
    }
    const stateFilter = localStorage.getItem('state-filter')
    if (stateFilter) {
      commit(UPDATE_STATE_FILTER_ON_LOAD, JSON.parse(stateFilter))
    }
    // console.log('stateFilter:', stateFilter)
    const dstFilter = localStorage.getItem('dst-filter')
    if (dstFilter) {
      commit(UPDATE_DESTINATION_FILTER_ON_LOAD, JSON.parse(dstFilter))
    }
    const debugMode = localStorage.getItem('debug-mode')
    if (debugMode) {
      commit(UPDATE_DEBUG_MODE, debugMode)
    }
    // const tagFilter = localStorage.getItem('active-tags-filter')
    // if (tagFilter) {
    //   commit(UPDATE_USER_TAG_FILTER, tagFilter)
    // }
    // console.log('dstFilter:', dstFilter)
  },
  [GET_USERS]: ({ commit, getters }) => {
    return new Promise((resolve, reject) => {
      const [url, params] = getters.generateUrl('users', '/users/all')
      fetch(url, params)
        .then(response => {
          if (response.status === 200) {
            return response.json()
          } else {
            console.log('Store.modules.config.js. Actions. GET_USERS. Response is not 200. Empty users list will be used.')
            return {
              users: []
            }
          }
        })
        .then(response => {
          console.log('Store.modules.config.js. Actions. GET_USERS. response: ', response)
          const usersList = []
          const usersDict = {}
          response.users.forEach(user => {
            if (Number(user.user_id) > 1) {
              usersList.push({
                id: String(user.user_id),
                value: user.first_name + ' ' + user.second_name
              })
              usersDict[String(user.user_id)] = user.first_name + ' ' + user.second_name
            }
          })
          commit(UPDATE_STORE_USERS, { usersList: usersList, usersDict: usersDict })
          resolve()
        })
        .catch((err) => {
          console.error('Store.modules.config.js. Actions. GET_USERS. Error: ', err)
          reject(err)
        })
      // this.$store.dispatch(REMOTE_REQUEST, {
      //   requestObj,
      //   msg,
      //   popupOptions
      // })
      //   .then(response => {
      //     console.log('addEnvironment. getUsers. response:', response)
      //     const usersList = []
      //     const userDict = {}
      //     response.users.forEach(user => {
      //       if (Number(user.user_id) > 1) {
      //         usersList.push({
      //           value: user.user_id,
      //           label: user.first_name + ' ' + user.second_name
      //         })
      //         userDict[user.user_id] = user.first_name + ' ' + user.second_name
      //       }
      //     })
      //     this.options = userDict
      //     this.updateVisibleOnlyOptions()
      //     this.loading = false
      //   })
      //   .catch((error) => {
      //     console.error('addEnvironment. getUsers. Error:', error)
      //     this.loading = false
      //   })
    })
  },
  [GET_UI_SETTINGS]: ({ commit }) => {
    // console.log('GET_UI_SETTINGS')
    const uiSettings = localStorage.getItem('ui-settings')
    if (uiSettings) {
      const parsedSettings = JSON.parse(uiSettings)
      const showSideBar = parsedSettings.showSideBar
      commit(UPDATE_SHOW_SIDEBAR_ON_LOAD, showSideBar)
    } else {
      commit(UPDATE_SHOW_SIDEBAR_ON_LOAD, true)
    }
    // console.log('dstFilter:', uiSettings)
  },
  [BLUR_FIRST_POPUP]: ({ commit }) => {
    commit(UPDATE_BLUR_STATE, true)
  },
  [UNBLUR_FIRST_POPUP]: ({ commit }) => {
    commit(UPDATE_BLUR_STATE, false)
  },
  [SORT_NOTIFICATIONS]: ({ commit }) => {
    commit(UPDATE_NOTIFICATION_SORTING)
  },
  [GROUP_NOTIFICATIONS]: ({ commit }, tag) => {
    commit(ADD_TAG_GROUPING, tag)
  },
  [CLEAR_GROUPING]: ({ commit }, tag) => {
    commit(REMOVE_TAG_GROUPING, tag)
  }
}

const mutations = {
  [ENV_REQUEST] (state, resp) {
    state.environments = resp
    // console.log('Store.modules.config.js. Mutation. ENV_REQUEST. Rest: ', state.environments)
  },
  [UPDATE_ENV_FILTER] (state, envObj) {
    // console.log('UPDATE_ENV_FILTER. envObj:', envObj)
    if (envObj.checked) {
      const index = state.filters.environmentFilter.indexOf(Number(envObj.id))
      state.filters.environmentFilter.splice(index, 1)
    } else {
      state.filters.environmentFilter.push(Number(envObj.id))
    }
    state.filterUpdateCounter += 1
    localStorage.setItem('env-filter', JSON.stringify(state.filters.environmentFilter))
  },
  [UPDATE_ENV_FILTER_ON_LOAD] (state, value) {
    state.filters.environmentFilter = value
    state.filterUpdateCounter += 1
    // console.log('UPDATE_ENV_FILTER_ON_LOAD New value:', value)
  },
  [UPDATE_DESTINATION_FILTER] (state, value) {
    state.filters.destinationFilter[value] = !state.filters.destinationFilter[value]
    state.filterUpdateCounter += 1
    localStorage.setItem('dst-filter', JSON.stringify(state.filters.destinationFilter))
    // console.log('UPDATE_DESTINATION_FILTER New value:', value)
  },
  [UPDATE_DESTINATION_FILTER_ON_LOAD] (state, value) {
    state.filters.destinationFilter = value
    state.filterUpdateCounter += 1
    // console.log('UPDATE_DESTINATION_FILTER_ON_LOAD New value:', value)
  },
  [UPDATE_STATE_FILTER] (state, value) {
    state.filters.stateFilter[value] = !state.filters.stateFilter[value]
    state.filterUpdateCounter += 1
    localStorage.setItem('state-filter', JSON.stringify(state.filters.stateFilter))
    // console.log('UPDATE_STATE_FILTER New value:', value)
  },
  [UPDATE_STATE_FILTER_ON_LOAD] (state, value) {
    state.filters.stateFilter = value
    state.filterUpdateCounter += 1
    // console.log('UPDATE_STATE_FILTER_ON_LOAD New value:', value)
  },
  [UPDATE_SHOW_SIDEBAR] (state) {
    state.showSideBar = !state.showSideBar
    localStorage.setItem('ui-settings', JSON.stringify({ showSideBar: state.showSideBar }))

    // state.filterColumnsUpdatedCounter += 1
    // console.log('UPDATE_SHOW_SIDEBAR')
  },
  [UPDATE_SHOW_SIDEBAR_ON_LOAD] (state, value) {
    state.showSideBar = value
    localStorage.setItem('ui-settings', JSON.stringify({ showSideBar: state.showSideBar }))
    // console.log('UPDATE_SHOW_SIDEBAR_ON_LOAD value:', value)
  },
  [UPDATE_BLUR_STATE] (state, value) {
    state.blurMainLayout = value
  },
  [ENABLE_HISTORY_MODE] (state) {
    state.historyMode = true
  },
  [DISABLE_HISTORY_MODE] (state) {
    state.historyMode = false
  },
  [UPDATE_DEBUG_MODE] (state, value) {
    state.debugMode = value
  },
  [UPDATE_SCENARIOS] (state, resp) {
    state.scenarios = resp
    console.log('Store.modules.config.js. Mutation. UPDATE_SCENARIOS. Rest: ', state.scenarios)
  },
  [UPDATE_AVAILABLE_INTEGRATIONS] (state, resp) {
    state.availableIntegrations = resp
    console.log('Store.modules.config.js. Mutation. UPDATE_AVAILABLE_INTEGRATIONS. Rest: ', state.availableIntegrations)
  },
  [UPDATE_AVAILABLE_BOTS] (state, resp) {
    state.availableBots = resp
    console.log('Store.modules.config.js. Mutation. UPDATE_AVAILABLE_BOTS. Rest: ', state.availableBots)
  },
  [AVAILABLE_ACTIONS_UPDATE] (state, resp) {
    state.availableActions = resp
    console.log('Store.modules.config.js. Mutation. AVAILABLE_ACTIONS_UPDATE. Rest: ', state.availableActions)
  },
  [PUT_NEW_INTEGRATIONS] (state, newIntegration) {
    console.log('Store.modules.config.js. Mutation. PUT_NEW_INTEGRATIONS. newIntegration: ', newIntegration)
  },
  [PUT_NEW_BOTS] (state, newBot) {
    console.log('Store.modules.config.js. Mutation. PUT_NEW_BOTS. newBot: ', newBot)
  },
  [UPDATE_TAG_FILTERS] (state, resp) {
    state.tagFilters.global_filter_dict = resp.global_filter_dict
    state.tagFilters.global_search_select = resp.global_search_select
    state.filterUpdateCounter += 1
    console.log('Store.modules.config.js. Mutation. UPDATE_TAG_FILTERS. Rest: ', state.tagFilters)
  },
  [ADD_TAG_GROUPING] (state, tag) {
    if (!state.tagGrouping.includes(tag)) {
      state.tagGrouping.push(tag)
    } else {
      state.tagGrouping = state.tagGrouping.filter(x => x !== tag)
    }
    state.filterUpdateCounter += 1
    console.log('Store.modules.config.js. Mutation. ADD_TAG_GROUPING. state.tagGrouping: ', state.tagGrouping)
  },
  [REMOVE_TAG_GROUPING] (state, tag) {
    state.tagGrouping = state.tagGrouping.filter(x => x !== tag)
    console.log('Store.modules.config.js. Mutation. REMOVE_TAG_GROUPING. state.tagGrouping: ', state.tagGrouping)
  },
  [UPDATE_TAG_GROUPING] (state, grouping) {
    state.tagGrouping = grouping
    state.filterUpdateCounter += 1
    console.log('Store.modules.config.js. Mutation. UPDATE_TAG_GROUPING. Rest: ', state.tagGrouping)
  },
  [UPDATE_USER_TAG_FILTER] (state, activeTagsFilterObj) {
    console.log('Store.modules.config.js. Mutation. UPDATE_USER_TAG_FILTER. activeTagsFilterObj:', activeTagsFilterObj)
    state.activeTagsFilter = activeTagsFilterObj.activeFilter
    state.activeTagsFilterId = activeTagsFilterObj.activeFilterId
    state.filterUpdateCounter += 1
    localStorage.setItem('active-tags-filter', JSON.stringify({ activeTagsFilter: state.activeTagsFilter }))
    localStorage.setItem('active-tag-filter-id', state.activeTagsFilterId)

    console.log('Store.modules.config.js. Mutation. UPDATE_USER_TAG_FILTER. activeTagsFilter:', state.activeTagsFilter, 'active-tag-filter-id', state.activeTagsFilterId)
  },
  [UPDATE_USER_TAG_FILTER_ID] (state, activeTagsFilterId) {
    console.log('Store.modules.config.js Mutation. UPDATE_USER_TAG_FILTER_ID. activeTagsFilterId:', activeTagsFilterId)
    state.activeTagsFilterId = activeTagsFilterId
    state.filterUpdateCounter += 1
    // localStorage.setItem('active-tags-filter', JSON.stringify({ activeTagsFilter: state.activeTagsFilter }))
    localStorage.setItem('active-tag-filter-id', state.activeTagsFilterId)

    console.log('Store.modules.config.js. Mutation. UPDATE_USER_TAG_FILTER. activeTagsFilter:', state.activeTagsFilter, 'active-tag-filter-id', state.activeTagsFilterId)
  },
  [ADD_ITEM_TO_USER_TAG_FILTER] (state, newItem) {
    console.log('Store.modules.config.js Mutation. ADD_ITEM_TO_USER_TAG_FILTER. newItem:', newItem)
    state.activeTagsFilter.push(newItem)
    state.filterUpdateCounter += 1
    localStorage.setItem('active-tags-filter', JSON.stringify({ activeTagsFilter: state.activeTagsFilter }))
    console.log('Store.modules.config.js. Mutation. ADD_ITEM_TO_USER_TAG_FILTER. activeTagsFilter:', state.activeTagsFilter, 'active-tag-filter-id', state.activeTagsFilterId)
  },
  [REMOVE_ITEM_TO_USER_TAG_FILTER] (state, index) {
    console.log('Store.modules.config.js Mutation. REMOVE_ITEM_TO_USER_TAG_FILTER. index:', index)
    state.activeTagsFilter.splice(index, 1)
    state.filterUpdateCounter += 1
    localStorage.setItem('active-tags-filter', JSON.stringify({ activeTagsFilter: state.activeTagsFilter }))
    console.log('Store.modules.config.js. Mutation. REMOVE_ITEM_TO_USER_TAG_FILTER. activeTagsFilter:', state.activeTagsFilter, 'active-tag-filter-id', state.activeTagsFilterId)
  },
  [TAG_FILTER_VALUES_UPDATE] (state, tagFilterValues) {
    state.tagFilterValues = tagFilterValues
    console.log('Store.modules.config.js. Mutation. TAG_FILTER_VALUES_UPDATE. tagFilterValues:', state.tagFilterValues)
  },
  [FILTER_COLUMNS_UPDATE] (state, filterColumns) {
    console.log('Store.modules.config.js. Mutation. FILTER_COLUMNS_UPDATE. state.filtersMain:', state.filtersMain)
    if (filterColumns) {
      if (filterColumns.length > 0) {
        console.log('Store.modules.config.js. Mutation. FILTER_COLUMNS_UPDATE. true', filterColumns.length)
        state.filterColumns = filterColumns
      } else {
        console.log('Store.modules.config.js. Mutation. FILTER_COLUMNS_UPDATE. false')
        state.filterColumns = state.filtersMain
      }
    } else {
      state.filterColumns = state.filtersMain
    }
    state.filterColumnsUpdatedCounter += 1
    console.log('Store.modules.config.js. Mutation. FILTER_COLUMNS_UPDATE. filterColumns:', state.filterColumns)
  },
  [PUSH_ITEM_TO_USER_COLUMN_FILTER] (state, item) {
    state.filterColumns.push(item)
    localStorage.setItem('filters', JSON.stringify(state.filterColumns))
    console.log('Store.modules.config.js. Mutation. PUSH_ITEM_TO_USER_COLUMN_FILTER. state.filterColumns:', state.filterColumns)
  },
  [REMOVE_ITEM_TO_USER_COLUMN_FILTER] (state, filterName) {
    state.filterColumns = state.filterColumns.filter(x => x.id_ !== filterName)
    localStorage.setItem('filters', JSON.stringify(state.filterColumns))
    console.log('Store.modules.config.js. Mutation. REMOVE_ITEM_TO_USER_COLUMN_FILTER. state.filterColumns:', state.filterColumns)
  },
  [UPDATE_USER_COLUMNS_WIDTH_FILTER] (state) {
    const ths = document.getElementsByClassName('filter-columns')
    // const ths = document.getElementsByTagName('th').getElementByClassName('filter-columns')
    // console.log('Store.modules.config.js. Mutation. UPDATE_USER_COLUMNS_WIDTH_FILTER. ths:', ths, ths.length)
    // console.log('Store.modules.config.js. Mutation. UPDATE_USER_COLUMNS_WIDTH_FILTER. state.filterColumns:', state.filterColumns, Object.keys(state.filterColumns).length)
    for (let i = 0; i < ths.length; i++) {
      state.filterColumns[i].width = ths[i].offsetWidth
    }
    localStorage.setItem('filters', JSON.stringify(state.filterColumns))
    // console.log('Store.modules.config.js. Mutation. UPDATE_USER_COLUMNS_WIDTH_FILTER. state.filterColumns:', state.filterColumns)
    state.filterColumnsUpdatedCounter += 1
  },
  [UPDATE_NOTIFICATION_SORTING] (state) {
    state.notificationSorting.sort_type = state.notificationSorting.sort_type === 'sorted' ? 'reverse' : 'sorted'
  },
  [UPDATE_STORE_USERS] (state, usersStats) {
    state.usersList = usersStats.usersList
    console.log('Store.modules.config.js. Mutation. UPDATE_STORE_USERS. state.usersList:', state.usersList)
    state.usersDict = usersStats.usersDict
    console.log('Store.modules.config.js. Mutation. UPDATE_STORE_USERS. state.usersDict:', state.usersDict)
  },
  [TRIGGER_USER_FILTER_UPDATE] (state, newIntegration) {
    state.filterUpdateCounter += 1
    // console.log('Store.modules.config.js. Mutation. TRIGGER_USER_FILTER_UPDATE. filterUpdateCounter: ', state.filterUpdateCounter)
  },
  [TOOGLE_SHOW_ASSIGNED_TO_ME] (state) {
    state.showAssignedToMe = !state.showAssignedToMe
    state.filterUpdateCounter += 1
    console.log('Store.modules.config.js. Mutation. TOOGLE_SHOW_ASSIGNED_TO_ME. showAssignedToMe: ', state.showAssignedToMe)
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
