/* eslint-disable promise/param-names */
import {
  SELECT_MULTIPLE_NOTIFICATIONS,
  UNSELECT_MULTIPLE_NOTIFICATIONS,
  FILTER_MULTIPLE_NOTIFICATIONS_IDS,
  REMOVE_ALL_SELECTED_MULTIPLE_NOTIFICATIONS,
  ADD_SELECTED_MULTIPLE_NOTIFICATIONS,
  REMOVE_SELECTED_MULTIPLE_NOTIFICATIONS,
  UPDATE_REPORT_OBJ,
  HANDLE_NOTIFICATION,
  CANCEL_HANDLE_NOTIFICATION,
  OPEN_NOTIFICATION_HANDLE_DIALOG,
  SHOW_HANDLE_DIALOG,
  HIDE_HANDLE_DIALOG,
  RESOLVE_NOTIFICATION,
  OPEN_NOTIFICATION_RESOLVE_DIALOG,
  SHOW_RESOLVE_DIALOG,
  HIDE_RESOLVE_DIALOG,
  SNOOZE_NOTIFICATION,
  CANCEL_SNOOZE_NOTIFICATION,
  OPEN_NOTIFICATION_SNOOZE_DIALOG,
  SHOW_SNOOZE_DIALOG,
  HIDE_SNOOZE_DIALOG,
  ACKNOWLEDGE_NOTIFICATION,
  CANCEL_ACKNOWLEDGE_NOTIFICATION,
  OPEN_NOTIFICATION_ACKNOWLEDGE_DIALOG,
  SHOW_ACKNOWLEDGE_DIALOG,
  HIDE_ACKNOWLEDGE_DIALOG,
  ASSIGN_NOTIFICATION,
  OPEN_NOTIFICATION_ASSIGN_DIALOG,
  SHOW_ASSIGN_DIALOG,
  HIDE_ASSIGN_DIALOG,
  COMMENT_NOTIFICATION,
  OPEN_NOTIFICATION_COMMENT_DIALOG,
  SHOW_COMMENT_DIALOG,
  HIDE_COMMENT_DIALOG,
  SAVE_TAG_FILTER,
  UPDATE_TAG_FILTER_ID,
  OPEN_SAVE_TAG_FILTER_DIALOG,
  SHOW_SAVE_TAG_FILTER_DIALOG,
  HIDE_SAVE_TAG_FILTER_DIALOG,
  UPDATE_NOTIFICATION_OBJ,
  LOAD_NOTIFICATION_OBJ,
  SHOW_BACKDROP,
  HIDE_BACKDROP, HIDE_ALL_DIALOGS, FILTER_MULTIPLE_NOTIFICATIONS
} from '../actions/notificationActions'
import store from '@/store/index'
import { REMOTE_REQUEST } from '@/store/actions/remoteActions'
import { UPDATE_USER_TAG_FILTER, UPDATE_USER_TAG_FILTER_ID } from '@/store/actions/config'
const state = {
  notificationsSelected: [],
  showHandleDialog: false,
  showResolveDialog: false,
  showSnoozeDialog: false,
  showAcknowledgeDialog: false,
  showAssignDialog: false,
  showCommentDialog: false,
  showSettingsSecondDialog: false,
  showSaveFilterDialog: false,
  notificationObj: null,
  notificationHistoryUpdateTrigger: 0,
  // tagFilterId: null,
  tagFilterSaveAsCounter: 0,
  reportObj: null,
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
  ]
}

const getters = {
  showHandleDialog: state => state.showHandleDialog,
  showResolveDialog: state => state.showResolveDialog,
  showSnoozeDialog: state => state.showSnoozeDialog,
  showAcknowledgeDialog: state => state.showAcknowledgeDialog,
  showAssignDialog: state => state.showAssignDialog,
  showCommentDialog: state => state.showCommentDialog,
  showSettingsSecondDialog: state => state.showSettingsSecondDialog,
  showSaveFilterDialog: state => state.showSaveFilterDialog,
  showBackdrop (state) {
    const showDialogStatuses = [
      state.showHandleDialog,
      state.showResolveDialog,
      state.showSnoozeDialog,
      state.showAcknowledgeDialog,
      state.showCommentDialog,
      state.showAssignDialog,
      state.showSaveFilterDialog
    ]
    return showDialogStatuses.some(actionToShow => actionToShow)
  },
  tagFilterSaveAsCounter: state => state.tagFilterSaveAsCounter,
  notificationHistoryUpdateTrigger: state => state.notificationHistoryUpdateTrigger
}

const actions = {
  [SELECT_MULTIPLE_NOTIFICATIONS]: ({ commit }, ids) => {
    for (let i = 0; i < ids.length; i++) {
      if (state.notificationsSelected.includes(ids[i])) {
        commit(REMOVE_SELECTED_MULTIPLE_NOTIFICATIONS, ids[i])
      } else {
        commit(ADD_SELECTED_MULTIPLE_NOTIFICATIONS, ids[i])
      }
    }
  },
  [UNSELECT_MULTIPLE_NOTIFICATIONS]: ({ commit }) => {
    commit(REMOVE_ALL_SELECTED_MULTIPLE_NOTIFICATIONS)
  },
  [FILTER_MULTIPLE_NOTIFICATIONS]: ({ commit }, ids) => {
    commit(FILTER_MULTIPLE_NOTIFICATIONS_IDS, ids)
  },
  [UPDATE_REPORT_OBJ]: ({ commit, getters }, report) => {
    commit(UPDATE_REPORT_OBJ, report)
  },
  [OPEN_NOTIFICATION_HANDLE_DIALOG]: ({ commit, getters }, notificationObj) => {
    console.log('notificationActions. actions. OPEN_NOTIFICATION_HANDLE_DIALOG. notificationObj:', notificationObj)
    commit(UPDATE_NOTIFICATION_OBJ, notificationObj)
    commit(SHOW_HANDLE_DIALOG)
  },
  [HANDLE_NOTIFICATION]: ({ commit }, body) => {
    console.log('notificationActions. actions. HANDLE_NOTIFICATION. body:', body)
    const requestObj = {
      service: 'actions',
      path: '/actions/handle',
      method: 'POST',
      body: JSON.stringify({
        alert_ids: state.notificationObj,
        action_ts: body.action_ts,
        assign_to: body.assign_to
      }),
      options: { reportError: true }
    }
    const msg = 'Handle notification'
    const popupOptions = {
      showDialog: true,
      alert: { scenario: 'notification_handle' }
    }
    store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
      .then(response => {
        console.log('notificationActions. actions. HANDLE_NOTIFICATION. response:', response.msg)
        commit(HIDE_HANDLE_DIALOG)
      })
      .catch((error) => {
        console.error('notificationActions. actions. HANDLE_NOTIFICATION. Error:', error)
      })
  },
  [CANCEL_HANDLE_NOTIFICATION]: ({ commit }, alertIds) => {
    console.log('notificationActions. actions. CANCEL_HANDLE_NOTIFICATION. body:', alertIds)
    const requestObj = {
      service: 'actions',
      path: '/actions/cancel-handle',
      method: 'POST',
      body: JSON.stringify({
        alert_ids: alertIds
      }),
      options: { reportError: true }
    }
    const msg = 'Cancel handle notification'
    const popupOptions = {
      showDialog: true,
      alert: { scenario: 'cancel_notification_handle' }
    }
    store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
      .then(response => {
        console.log('notificationActions. actions. CANCEL_HANDLE_NOTIFICATION. response:', response.msg)
      })
      .catch((error) => {
        console.error('notificationActions. actions. CANCEL_HANDLE_NOTIFICATION. Error:', error)
      })
  },
  [OPEN_NOTIFICATION_RESOLVE_DIALOG]: ({ commit, getters }, notificationObj) => {
    console.log('notificationActions. actions. OPEN_NOTIFICATION_RESOLVE_DIALOG. notificationObj:', notificationObj)
    commit(UPDATE_NOTIFICATION_OBJ, notificationObj)
    commit(SHOW_RESOLVE_DIALOG)
  },
  [RESOLVE_NOTIFICATION]: ({ commit }, body) => {
    console.log('notificationActions. actions. RESOLVE_NOTIFICATION. body:', body)
    const requestObj = {
      service: 'actions',
      path: '/actions/resolve',
      method: 'POST',
      body: JSON.stringify({
        alert_ids: state.notificationObj,
        comment: body.comment
      }),
      options: { reportError: true }
    }
    const msg = 'Resolve notification'
    const popupOptions = {
      showDialog: true,
      alert: { scenario: 'notification_resolve' }
    }
    store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
      .then(response => {
        console.log('notificationActions. actions. RESOLVE_NOTIFICATION. response:', response.msg)
        commit(HIDE_RESOLVE_DIALOG)
      })
      .catch((error) => {
        console.error('notificationActions. actions. RESOLVE_NOTIFICATION. Error:', error)
      })
  },
  [OPEN_NOTIFICATION_SNOOZE_DIALOG]: ({ commit, getters }, notificationObj) => {
    console.log('notificationActions. actions. OPEN_NOTIFICATION_SNOOZE_DIALOG. notificationObj:', notificationObj)
    commit(UPDATE_NOTIFICATION_OBJ, notificationObj)
    commit(SHOW_SNOOZE_DIALOG)
  },
  [SNOOZE_NOTIFICATION]: ({ commit, state }, body) => {
    console.log('notificationActions. actions. SNOOZE_NOTIFICATION. body:', body)
    const requestObj = {
      service: 'actions',
      path: '/actions/snooze',
      method: 'POST',
      body: JSON.stringify({
        alert_ids: state.notificationObj,
        action_ts: body.action_ts,
        comment: body.comment,
        sticky_severity: Number(body.sticky_severity),
        sticky_output: Number(body.sticky_output)
      }),
      options: { reportError: true }
    }
    const msg = 'Snooze notification'
    const popupOptions = {
      showDialog: true,
      alert: { scenario: 'notification_snooze' }
    }
    store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
      .then(response => {
        console.log('notificationActions. actions. SNOOZE_NOTIFICATION. response:', response.msg)
        commit(HIDE_SNOOZE_DIALOG)
      })
      .catch((error) => {
        console.error('notificationActions. actions. SNOOZE_NOTIFICATION. Error:', error)
      })
  },
  [CANCEL_SNOOZE_NOTIFICATION]: ({ commit }, alertIds) => {
    console.log('notificationActions. actions. CANCEL_SNOOZE_NOTIFICATION. body:', alertIds)
    const requestObj = {
      service: 'actions',
      path: '/actions/cancel-snooze',
      method: 'POST',
      body: JSON.stringify({
        alert_ids: alertIds,
        comment: ''
      }),
      options: { reportError: true }
    }
    const msg = 'Cancel snooze notification'
    const popupOptions = {
      showDialog: true,
      alert: { scenario: 'cancel_notification_snooze' }
    }
    store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
      .then(response => {
        console.log('notificationActions. actions. CANCEL_SNOOZE_NOTIFICATION. response:', response.msg)
      })
      .catch((error) => {
        console.error('notificationActions. actions. CANCEL_SNOOZE_NOTIFICATION. Error:', error)
      })
  },
  [OPEN_NOTIFICATION_ACKNOWLEDGE_DIALOG]: ({ commit, getters }, notificationObj) => {
    console.log('notificationActions. actions. OPEN_NOTIFICATION_ACKNOWLEDGE_DIALOG. notificationObj:', notificationObj)
    commit(UPDATE_NOTIFICATION_OBJ, notificationObj)
    commit(SHOW_ACKNOWLEDGE_DIALOG)
  },
  [ACKNOWLEDGE_NOTIFICATION]: ({ commit }, body) => {
    console.log('notificationActions. actions. ACKNOWLEDGE_NOTIFICATION. body:', body)
    const requestObj = {
      service: 'actions',
      path: '/actions/acknowledge',
      method: 'POST',
      body: JSON.stringify({
        alert_ids: state.notificationObj,
        comment: body.comment
      }),
      options: { reportError: true }
    }
    const msg = 'Acknowledge notification'
    const popupOptions = {
      showDialog: true,
      alert: { scenario: 'notification_acknowledge' }
    }
    store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
      .then(response => {
        console.log('notificationActions. actions. ACKNOWLEDGE_NOTIFICATION. response:', response.msg)
        commit(HIDE_ACKNOWLEDGE_DIALOG)
      })
      .catch((error) => {
        console.error('notificationActions. actions. ACKNOWLEDGE_NOTIFICATION. Error:', error)
      })
  },
  [CANCEL_ACKNOWLEDGE_NOTIFICATION]: ({ commit }, alertIds) => {
    console.log('notificationActions. actions. CANCEL_ACKNOWLEDGE_NOTIFICATION. alertIds:', alertIds)
    const requestObj = {
      service: 'actions',
      path: '/actions/cancel-acknowledge',
      method: 'POST',
      body: JSON.stringify({
        alert_ids: alertIds,
        comment: ''
      }),
      options: { reportError: true }
    }
    const msg = 'Cancel acknowledge notification'
    const popupOptions = {
      showDialog: true,
      alert: { scenario: 'cancel_notification_acknowledge' }
    }
    store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
      .then(response => {
        console.log('notificationActions. actions. CANCEL_ACKNOWLEDGE_NOTIFICATION. response:', response.msg)
        commit(HIDE_ACKNOWLEDGE_DIALOG)
      })
      .catch((error) => {
        console.error('notificationActions. actions. CANCEL_ACKNOWLEDGE_NOTIFICATION. Error:', error)
      })
  },

  [OPEN_NOTIFICATION_ASSIGN_DIALOG]: ({ commit, getters }, notificationObj) => {
    console.log('notificationActions. actions. OPEN_NOTIFICATION_ASSIGN_DIALOG. notificationObj:', notificationObj)
    commit(UPDATE_NOTIFICATION_OBJ, notificationObj)
    commit(SHOW_ASSIGN_DIALOG)
  },
  [ASSIGN_NOTIFICATION]: ({ commit }, body) => {
    console.log('notificationActions. actions. ASSIGN_NOTIFICATION. body:', body)
    const requestObj = {
      service: 'actions',
      path: '/actions/assign',
      method: 'POST',
      body: JSON.stringify({
        alert_ids: state.notificationObj,
        description: '',
        resubmit: 8,
        time_to: body.action_ts,
        notification_type: 1,
        notification_fields: { recipients: body.recipients },
        sticky_severity: body.sticky_severity,
        sticky_output: body.sticky_output
      }),
      options: { reportError: true }
    }
    const msg = 'Assign notification'
    const popupOptions = {
      showDialog: true,
      alert: { scenario: 'notification_assign' }
    }
    store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
      .then(response => {
        console.log('notificationActions. actions. ASSIGN_NOTIFICATION. response:', response.msg)
        commit(HIDE_ASSIGN_DIALOG)
      })
      .catch((error) => {
        console.error('notificationActions. actions. ASSIGN_NOTIFICATION. Error:', error)
      })
  },

  [OPEN_NOTIFICATION_COMMENT_DIALOG]: ({ commit, getters }, notificationObj) => {
    console.log('notificationActions. actions. OPEN_NOTIFICATION_COMMENT_DIALOG. notificationObj:', notificationObj)
    commit(UPDATE_NOTIFICATION_OBJ, notificationObj)
    commit(SHOW_COMMENT_DIALOG)
  },
  [COMMENT_NOTIFICATION]: ({ commit }, body) => {
    console.log('notificationActions. actions. COMMENT_NOTIFICATION. body:', body)
    const requestObj = {
      service: 'actions',
      path: '/actions/add-comment',
      method: 'POST',
      body: JSON.stringify({
        alert_ids: [state.notificationObj.notification_id],
        comment: body.comment
      }),
      options: { reportError: true }
    }
    const msg = 'Comment notification'
    const popupOptions = {
      showDialog: true,
      alert: { scenario: 'notification_comment' }
    }
    store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
      .then(response => {
        console.log('notificationActions. actions. COMMENT_NOTIFICATION. response:', response.msg)
        commit(HIDE_COMMENT_DIALOG)
      })
      .catch((error) => {
        console.error('notificationActions. actions. COMMENT_NOTIFICATION. Error:', error)
      })
  },

  [OPEN_SAVE_TAG_FILTER_DIALOG]: ({ commit, getters }, tagFilterId) => {
    console.log('notificationActions. actions. OPEN_SAVE_TAG_FILTER_DIALOG. tagFilterId:', tagFilterId)
    commit(SHOW_SAVE_TAG_FILTER_DIALOG)
    // commit(UPDATE_TAG_FILTER_ID, tagFilterId)
  },
  [SAVE_TAG_FILTER]: ({ commit, state }, body) => {
    console.log('notificationActions. actions. SAVE_TAG_FILTER. body:', body)
    let requestObj = {}
    let msg = ''
    let popupOptions = {}
    let columns = localStorage.getItem('filters')
    if (columns) {
      columns = JSON.parse(columns)
    } else {
      columns = JSON.parse(JSON.stringify(state.filtersMain))
    }
    if (body.newFilter) {
      requestObj = {
        service: 'filters',
        path: '/filters/config',
        method: 'PUT',
        body: JSON.stringify({
          filter_name: body.filter_name,
          filter_config: body.filter_config,
          filter_status: body.filter_status,
          columns: columns,
          grouping: store.getters.userFilterGrouping
        }),
        options: { reportError: true }
      }
      msg = 'Add tag filter'
      popupOptions = {
        showDialog: true,
        alert: { scenario: 'save_tag_filter' }
      }
    } else {
      requestObj = {
        service: 'filters',
        path: '/filters/config/' + store.state.config.activeTagsFilterId,
        method: 'POST',
        body: JSON.stringify({
          filter_name: body.filter_name,
          filter_config: body.filter_config,
          filter_status: body.filter_status,
          columns: columns,
          grouping: store.getters.userFilterGrouping
        }),
        options: { reportError: true }
      }
      msg = 'Save tag filter'
      popupOptions = {
        showDialog: true,
        alert: { scenario: 'save_tag_filter' }
      }
    }
    // console.log(requestObj)
    // console.log(msg)
    // console.log(popupOptions)
    store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
      .then(response => {
        console.log('notificationActions. actions. SAVE_TAG_FILTER. response:', response)
        const activeTagsFilterObj = {
          activeFilter: response.filter_config,
          activeFilterId: String(response.filter_id)
        }
        store.commit(UPDATE_USER_TAG_FILTER, activeTagsFilterObj)
        commit(HIDE_SAVE_TAG_FILTER_DIALOG)
      })
      .catch((error) => {
        console.error('notificationActions. actions. SAVE_TAG_FILTER. Error:', error)
      })
  },
  [LOAD_NOTIFICATION_OBJ]: ({ commit }, notificationId) => {
    console.log('notificationActions. actions. LOAD_NOTIFICATION_OBJ. body:', notificationId)
    const requestObj = {
      service: 'actions',
      path: '/notifications/notification-details/' + notificationId,
      method: 'GET',
      body: null,
      options: { reportError: true }
    }
    const msg = 'Get notification'
    const popupOptions = {
      showDialog: true
    }
    return store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
      .then(response => {
        console.log('notificationActions. actions. LOAD_NOTIFICATION_OBJ. response:', response.msg)
      })
      .catch((error) => {
        console.error('notificationActions. actions. LOAD_NOTIFICATION_OBJ. Error:', error)
      })
  }
}

const mutations = {
  [FILTER_MULTIPLE_NOTIFICATIONS_IDS] (state, ids) {
    state.notificationsSelected = state.notificationsSelected.filter(x => ids.includes(x))
  },
  [ADD_SELECTED_MULTIPLE_NOTIFICATIONS] (state, id) {
    state.notificationsSelected.push(id)
  },
  [REMOVE_SELECTED_MULTIPLE_NOTIFICATIONS] (state, id) {
    state.notificationsSelected = state.notificationsSelected.filter(x => x !== id)
  },
  [REMOVE_ALL_SELECTED_MULTIPLE_NOTIFICATIONS] (state) {
    state.notificationsSelected = []
  },
  [SHOW_HANDLE_DIALOG] (state) {
    state.showHandleDialog = true
  },
  [HIDE_HANDLE_DIALOG] (state) {
    state.showHandleDialog = false
    state.notificationObj = null
  },
  [SHOW_RESOLVE_DIALOG] (state) {
    state.showResolveDialog = true
  },
  [HIDE_RESOLVE_DIALOG] (state) {
    state.showResolveDialog = false
    state.notificationObj = null
  },
  [SHOW_SNOOZE_DIALOG] (state) {
    state.showSnoozeDialog = true
  },
  [HIDE_SNOOZE_DIALOG] (state) {
    state.showSnoozeDialog = false
    state.notificationObj = null
  },
  [SHOW_ACKNOWLEDGE_DIALOG] (state) {
    state.showAcknowledgeDialog = true
  },
  [HIDE_ACKNOWLEDGE_DIALOG] (state) {
    state.showAcknowledgeDialog = false
    state.notificationObj = null
  },
  [SHOW_ASSIGN_DIALOG] (state) {
    state.showAssignDialog = true
  },
  [HIDE_ASSIGN_DIALOG] (state) {
    state.showAssignDialog = false
    state.notificationObj = null
  },
  [SHOW_COMMENT_DIALOG] (state) {
    state.showCommentDialog = true
  },
  [HIDE_COMMENT_DIALOG] (state) {
    state.showCommentDialog = false
    state.notificationHistoryUpdateTrigger += 1
    // state.notificationObj = null
  },
  [UPDATE_TAG_FILTER_ID] (state, tagFilterObj) {
    store.commit(UPDATE_USER_TAG_FILTER_ID, tagFilterObj)
    // state.tagFilterId = tagFilterId
  },
  [SHOW_SAVE_TAG_FILTER_DIALOG] (state) {
    state.showSaveFilterDialog = true
  },
  [HIDE_SAVE_TAG_FILTER_DIALOG] (state) {
    state.tagFilterSaveAsCounter += 1
    state.showSaveFilterDialog = false
  },
  [SHOW_BACKDROP] (state) {
    state.showSettingsSecondDialog = true
  },
  [HIDE_BACKDROP] (state) {
    state.showSettingsSecondDialog = false
  },
  [UPDATE_NOTIFICATION_OBJ] (state, notificationObj) {
    state.notificationObj = notificationObj
  },
  [UPDATE_REPORT_OBJ] (state, report) {
    state.reportObj = report
  },
  [HIDE_ALL_DIALOGS] (state) {
    state.showAssignDialog = false
    state.showHandleDialog = false
    state.showResolveDialog = false
    state.showAcknowledgeDialog = false
    state.showSnoozeDialog = false
    state.showCommentDialog = false
    state.showSaveFilterDialog = false
    state.notificationObj = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
