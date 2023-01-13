<template>
<!--  <div class="backdrop" v-if="showNotificationDetails"></div>-->
  <div class="app-block__main-body">
    <div class="backdrop backdrop-second" style="z-index: 5" v-if="showBackDrop"
         @click="closeNotificationActionDialog"></div>
    <!--Main settings-->
    <!--    <div v-if="showOrgSettings" class="org-settings-test">-->
    <org-settings v-if="showSettings"/>
    <bots-dialog v-if="showBots"/>
    <!--    <integrations-dialog v-if="showIntegrations"></integrations-dialog>-->
    <!--    </div>-->
    <!--Handle notification-->
    <handle-notification v-if="showHandleNotificationDialog"/>
    <resolve-notification v-if="showResolveNotificationDialog"/>
    <snooze-notification v-if="showSnoozeNotificationDialog"/>
    <acknowledge-notification v-if="showAcknowledgeNotificationDialog"/>
    <assign-notification v-if="showAssignNotificationDialog"/>
    <comment-notification v-if="showCommentNotificationDialog"/>
    <save-tag-filter v-if="showSaveFilterDialog"/>
    <!--Side bar-->
    <div class="app-block__main-body-sidebar" v-show="showSideBar">
      <side-bar :envStats="notificationPerEnvStats" />
    </div>
    <!--Main content-->
    <!--Preloader-->
<!--    <loading :transparent="true" v-if="showLoader"/>-->
    <div :class="['app-block__main-body-content', { 'app-block__main-body-content-with-sidebar': showSideBar}]">
      <!--Notification details dialog-->
      <div class="main-notification-popup" v-if="showNotificationDetails">
<!--      <div class="main-notification-popup" v-if="showNotificationDetails" ref="notificationDetailsDialog">-->
        <notification-details
          :notificationBaseObj="notificationBaseObj"
          @close="closeNotificationDialog"
        />
      </div>
      <!--Notification list with header and filters-->
      <div>
        <!-- Notifications header -->
        <notification-header
          :notificationStats="notificationStats"
          :notificationStatesFilter="notificationStatesFilter"
          :destinationFilter="destinationFilter"
          :timeFrame="timeFrame"
          :globalSearch="directionModel.filtering.globally"
          @onUpdateGlobalSearch="updateGlobalSearch($event)"
          @on-update-search-period="updateHistorySelectPeriod"
        />
        <!-- Notification filters -->
          <notification-filter
            @on-columns-resize="onColumnsResize($event)"
            @on-filter-change-gl="onFilterChange($event)"
            @on-filter-remove-gl="onFilterRemove($event)"
            @on-grouping-change-gl="onGroupingChange($event)"
            @on-order-by-changed="onOrderByChanged($event)"
          />
          <!-- Notifications list -->
          <!-- v-if="!loading" -->
          <!--
          <div class="main__list" v-if="historyMode ? !loading : !loading">
            <div v-for="(item, index) in alerts_list.slice(0, 600)" :key="index">
              <notification
                v-if="item.panel_type === 'single_alert'"
                :notification="item"
                :index="index"
                @showNotificationPopup="showNotificationPopup(item)"
              />
              <consolidation
                v-if="item.panel_type === 'consolidation'"
                :consolidation-obj="item"
                :index="index"
                @showNotificationPopup="showNotificationPopup"
              />
            </div>
          </div>
          -->
          <div class="main__list" v-if="historyMode ? !loading : !loading">
            <div v-for="(item, index) in alerts_list.slice(0, 600)" :key="index">
              <notification
                v-if="item.panel_type === 'single_alert'"
                :notification="item"
                :index="index"
                @showNotificationPopup="showNotificationPopup(item)"
              />
              <consolidation
                v-if="item.panel_type === 'consolidation'"
                :consolidation-obj="item"
                :index="index"
                @showNotificationPopup="showNotificationPopup"
              />
              <grouping
                v-if="item.panel_type === 'grouping_alert'"
                :consolidation-obj="item"
                :index="index"
                :selectPressed="selectPressed"
                @openGroup="openGroup"
                @closeGroup="closeGroup"
                :openGroups="openGroups"
                @showNotificationPopup="showNotificationPopup"
              />
            </div>
          </div>
        <loading-spinner :zIndex="0" :opacity="0" height="400px" v-if="historyMode ? loading : loading"></loading-spinner>
      </div>
    </div>
  </div>
  <div v-if="notificationsSelected.length > 0" class="notifications-multiple-actions" >
    <div class="notifications-multiple-selected">
      {{ notificationsSelected.length }} Alerts Selected
    </div>
    <div style="display: inline-block; vertical-align: middle">
      <div class="alerts__buttons" v-show="true">
        <!--Handle notification-->

        <div class="alert__button">

          <button class="button__icon-transparent" @click.stop="handleNotification">
            <Tooltip tooltipText="Handle" :position="'top'">
              <icon-handled btnColor="#ffffff"/>
            </Tooltip>
            <!--          <svg width="16" height="16" viewbox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">-->
            <!--            <path d="M11.4046 7.53154H12.1407C11.9244 5.60738 10.3927 4.07567 8.46857 3.85938V4.59551H7.53154V3.85938C5.60738 4.07567 4.07567 5.60738 3.85938 7.53154H4.59551V8.46857H3.85938C4.07567 10.3927 5.60738 11.9244 7.53154 12.1407V11.4046H8.46857V12.1407C10.3927 11.9244 11.9244 10.3927 12.1407 8.46857H11.4046V7.53154ZM8.9959 9.65848L7.53154 8.19411V5.5326H8.46857V7.806L9.65848 8.99593L8.9959 9.65848Z" fill="#3C3C3C"/>-->
            <!--            <path d="M16 9.85398V6.14605H14.8246C14.6673 5.56462 14.4368 5.00853 14.1364 4.48551L14.9678 3.65411L12.3459 1.0322L11.5145 1.86363C10.9915 1.56319 10.4354 1.33274 9.85398 1.17541V0H6.14602V1.17538C5.56462 1.33271 5.00853 1.56319 4.48548 1.8636L3.65408 1.03217L1.03217 3.65411L1.8636 4.48551C1.56319 5.00853 1.33274 5.56462 1.17541 6.14605H0V9.85398H1.17541C1.33274 10.4355 1.56316 10.9914 1.8636 11.5145L1.03217 12.3459L3.65408 14.9678L4.48548 14.1364C5.00853 14.4368 5.56462 14.6673 6.14602 14.8247V16H9.85395V14.8247C10.4353 14.6673 10.9914 14.4368 11.5145 14.1364L12.3459 14.9678L14.9678 12.3459L14.1364 11.5145C14.4368 10.9915 14.6672 10.4355 14.8246 9.85398H16ZM8 13.1042C5.18553 13.1042 2.8958 10.8145 2.8958 8C2.8958 5.18553 5.18553 2.8958 8 2.8958C10.8145 2.8958 13.1042 5.18553 13.1042 8C13.1042 10.8145 10.8145 13.1042 8 13.1042Z" fill="#3C3C3C"/>-->
            <!--          </svg>-->
          </button>

        </div>
        <div class="alert__button">
          <button class="button__icon-transparent" @click.stop="resolveNotification">
            <Tooltip tooltipText="Resolve" :position="'top'">
              <icon-resolve btnColor="#ffffff"/>
            </Tooltip>
          </button>
        </div>
        <div class="alert__button">
          <button class="button__icon-transparent" @click.stop="snoozeNotification">
            <Tooltip tooltipText="Snooze" :position="'top'">
              <icon-snoozed btnColor="#ffffff"/>
            </Tooltip>
          </button>
        </div>
        <div class="alert__button">
          <button class="button__icon-transparent" @click.stop="acknowledgeNotification">
            <Tooltip tooltipText='Ack' :position="'top'">
              <icon-acknowledged btnColor="#ffffff"/>
            </Tooltip>
          </button>
        </div>
      </div>
    </div>
    <div style="display: inline-block; vertical-align: middle; padding-left: 30px">
      <button class="button__icon-transparent" @click.stop="unselectAllNotifications()">
        <Tooltip tooltipText='Unselect All' :position="'top'">
          <icon-close btnColor="#ffffff"/>
        </Tooltip>
      </button>
    </div>
  </div>
</template>

<script>
import SideBar from '@/components/SideBar'
import notification from '@/components/notifications/alert'
import consolidation from '@/components/notifications/consolidation'
import grouping from '@/components/notifications/grouping'
import notificationHeader from '@/components/notifications/notificationHeader'
import notificationFilter from '@/components/notifications/notificationFilter'
import notificationDetails from '@/components/notifications/notificationDetails'
import OrgSettings from '@/views/OrgSettings'
import HandleNotification from '@/components/notifications/actions/handleNotification'
import ResolveNotification from '@/components/notifications/actions/resolveNotification'
import SnoozeNotification from '@/components/notifications/actions/snoozeNotification'
import AcknowledgeNotification from '@/components/notifications/actions/acknowledgeNotification'
import saveTagFilter from '@/components/notifications/actions/saveTagFilter'
import iconHandled from '@/components/icons/iconHandled'
import iconSnoozed from '@/components/icons/iconSnoozed'
import iconAcknowledged from '@/components/icons/iconAcknowledged'
import iconResolve from '@/components/icons/iconResolve'
import Tooltip from '@/components/Tooltip'
import store from '@/store'
import assignNotification from '@/components/notifications/actions/assignNotification'
import commentNotification from '@/components/notifications/actions/commentNotification'
import { REMOTE_REQUEST } from '@/store/actions/remoteActions'
import { TRIGGER_ALERT_SCENARIO } from '@/store/actions/clientStatus'
import { ENABLE_HISTORY_MODE, DISABLE_HISTORY_MODE, CLEAR_GROUPING } from '@/store/actions/config'
import {
  HIDE_FIRST_BACKDROP,
  SHOW_NOTIFICATION_DETAILS,
  HIDE_NOTIFICATION_DETAILS
} from '@/store/actions/localActions'
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'
import LoadingSpinner from '@/components/LoadingSpinner'
import {
  FILTER_MULTIPLE_NOTIFICATIONS,
  HIDE_ALL_DIALOGS,
  OPEN_NOTIFICATION_ACKNOWLEDGE_DIALOG,
  OPEN_NOTIFICATION_HANDLE_DIALOG,
  OPEN_NOTIFICATION_RESOLVE_DIALOG,
  OPEN_NOTIFICATION_SNOOZE_DIALOG, SELECT_MULTIPLE_NOTIFICATIONS, UNSELECT_MULTIPLE_NOTIFICATIONS
} from '@/store/actions/notificationActions'
import IconClose from '@/components/icons/iconClose'
import BotsDialog from "../components/bots/botsDialog";
const { DateTime } = require('luxon')
const { Manager } = require('socket.io-client')
// import integrationsDialog from '@/components/integrations/integrationsDialog'

// const manager = new Manager('ws://bridge.dev.harpia.io', {
// const manager = new Manager('ws://bridge-v2.dev.harpia.io', {
//   reconnectionDelayMax: 10000
//   // query: {
//   //   'my-key': 'my-value'
//   // }
// })

export default {
  name: 'mainNotifications',
  components: {
    BotsDialog,
    IconClose,
    iconAcknowledged,
    iconResolve,
    iconHandled,
    iconSnoozed,
    Tooltip,
    grouping,
    LoadingSpinner,
    AcknowledgeNotification,
    SnoozeNotification,
    ResolveNotification,
    HandleNotification,
    SideBar,
    notification,
    consolidation,
    notificationHeader,
    notificationFilter,
    notificationDetails,
    OrgSettings,
    assignNotification,
    commentNotification,
    saveTagFilter
    // integrationsDialog
    // UserProfile
  },
  data: () => ({
    openGroups: [],
    selectPressed: false,
    showSidePanel: false,
    showLoader: false,
    notification_id: null,
    showOrgSettingDialog: false,
    // showIntegrationsDialog: false,
    alerts_list: [],
    loading: false,
    full_alerts_list: [],
    directionModel: {
      filtering: {
        globally: ''
      },
      sorting: {
        field: 'current_duration',
        order: true
      },
      historyFilters: {
        from: DateTime.now().minus({ minutes: 180 }).toISO(),
        to: DateTime.now().toISO()
      }
    },
    notificationObj: null,
    notificationBaseObj: null,
    // showNotificationDetails: false,
    notificationStats: {
      active: '',
      handled: '',
      snoozed: '',
      acknowledged: ''
    },
    // columns: [],
    notificationPerEnvStats: null,
    notificationStatesFilter: {},
    destinationFilter: {},
    environments: [1, 3],
    timeFrame: '0',
    // socketConnectionTimer: 0,
    socket: null,
    statsSocket: null,
    joined_room: '',
    highlightNotificationId: 0,
    ping_pong_start_time: null,
    ping_pong_timer_id: null,
    ping_pong_delay: 10000, // 10 seconds
    pingServerErrorDialog: null,
    socketTimeout: null,
    notification: {
      alert_type: 'active',
      room_prefix: '1'
    }
    // notificationDetailsDialog: ref(null)
  }),
  computed: {
    columns () {
      return this.$store.getters.filters
    },
    notificationsSelected () {
      return this.$store.state.notificationActions.notificationsSelected
    },
    notifications_ids () {
      let ids = []
      for (let i = 0; i < this.alerts_list.length; i++) {
        if (this.alerts_list[i].panel_type === 'single_alert') {
          ids.push(this.alerts_list[i].notification_id)
        } else if (this.alerts_list[i].panel_type === 'grouping_alert') {
          ids = ids.concat(this.alerts_list[i].group_notifications.map(x => x.notification_id))
        }
      }
      return ids
    },
    serviceConnectionTimeout () {
      return this.$store.getters.serviceConnectionTimeoutConfig
    },
    userFilters () {
      // console.log('mainNotifications. computed. filterUpdateCounter', this.$store.state.config.filterUpdateCounter)
      return this.$store.state.config.filterUpdateCounter
      // return this.$store.getters.userFilterForBridge
    },
    showSideBar () {
      return this.$store.state.config.showSideBar
    },
    showOrgSettings () {
      return this.$store.state.localActions.showOrgSettings
    },
    showSettings () {
      return this.$store.getters.showSettings
    },
    showIntegrations () {
      return this.$store.getters.showIntegrations
    },
    showBots () {
      return this.$store.getters.showBots
    },
    showUserProfile () {
      return this.$store.state.localActions.showUserProfile
    },
    showHandleNotificationDialog () {
      return this.$store.getters.showHandleDialog
    },
    showResolveNotificationDialog () {
      return this.$store.getters.showResolveDialog
    },
    showSnoozeNotificationDialog () {
      return this.$store.getters.showSnoozeDialog
    },
    showAcknowledgeNotificationDialog () {
      return this.$store.getters.showAcknowledgeDialog
    },
    showAssignNotificationDialog () {
      return this.$store.getters.showAssignDialog
    },
    showCommentNotificationDialog () {
      return this.$store.getters.showCommentDialog
    },
    showSaveFilterDialog () {
      return this.$store.getters.showSaveFilterDialog
    },
    showBackDrop () {
      return this.$store.getters.showBackdrop
    },
    showNotificationDetails () {
      return this.$store.getters.showNotificationDetails
    },
    historyMode () {
      console.log('mainNotifications. computed. historyMode. trigger', this.$store.getters.historyMode)
      return this.$store.getters.historyMode
    }
  },
  watch: {
    notifications_ids (ids) {
      this.$store.dispatch(FILTER_MULTIPLE_NOTIFICATIONS, ids)
    },
    showNotificationDetails (val) {
      if (!val) {
        this.highlightNotification()
      }
    },
    userFilters: 'msgSocket',
    $route (to, from) {
      // console.log('mainNotifications. watch. $route to:', to)
      // console.log('mainNotifications. watch. $route from:', from)
      const historyMode = this.$route.query.history
      if (historyMode) {
        this.$store.commit(ENABLE_HISTORY_MODE)
        console.log('mainNotifications. Switch to history mode', this.historyMode)
      } else {
        this.$store.commit(DISABLE_HISTORY_MODE)
        console.log('mainNotifications. Switch to real-time mode', this.historyMode)
      }
      // this.getScenarioId()
      // this.loadScenario()
    },
    historyMode () {
      console.log('historyMode changed to: ', this.historyMode)
      this.loadPage()
    }
    // showNotificationDetails () {
    //   this.$store.commit(UPDATE_BLUR_STATE, this.showNotificationDetails)
    // }
  },
  beforeMount () {
    this.parseRouteQuery()
    this.loadPage()
    this.socketConnectionTimer = new Date().getTime()
  },
  beforeUnmount () {
    // this.destroySocket()
  },
  mounted () {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 17 || e.keyCode === 90 || e.key === 'Meta' || e.key === 'Control' || e.keyIdentifier === 'Meta' || e.keyIdentifier === 'Control') {
        this.selectPressed = true
      }
    })
    document.addEventListener('keyup', (e) => {
      if (e.keyCode === 17 || e.keyCode === 90 || e.key === 'Meta' || e.key === 'Control' || e.keyIdentifier === 'Meta' || e.keyIdentifier === 'Control') {
        this.selectPressed = false
      }
    })
  },
  setup () {
    const notificationDetailsDialog = ref(null)
    onClickOutside(notificationDetailsDialog, (event) => {
      console.log('mainNotifications. setup. onClickOutside')
      store.commit(HIDE_NOTIFICATION_DETAILS)
    })
    return { notificationDetailsDialog }
  },
  methods: {
    unselectAllNotifications () {
      this.$store.dispatch(UNSELECT_MULTIPLE_NOTIFICATIONS)
    },
    openGroup (params) {
      this.openGroups.push(params.group)
      if (this.selectPressed) {
        this.$store.dispatch(SELECT_MULTIPLE_NOTIFICATIONS, params.ids)
      }
    },
    closeGroup (params) {
      if (this.selectPressed) {
        this.$store.dispatch(SELECT_MULTIPLE_NOTIFICATIONS, params.ids)
      } else {
        this.openGroups = this.openGroups.filter(x => x !== params.group)
        this.$store.dispatch(UNSELECT_MULTIPLE_NOTIFICATIONS)
      }
    },
    handleNotification () {
      this.$store.dispatch(OPEN_NOTIFICATION_HANDLE_DIALOG, this.notificationsSelected)
    },
    resolveNotification () {
      this.$store.dispatch(OPEN_NOTIFICATION_RESOLVE_DIALOG, this.notificationsSelected)
    },
    snoozeNotification () {
      this.$store.dispatch(OPEN_NOTIFICATION_SNOOZE_DIALOG, this.notificationsSelected)
    },
    acknowledgeNotification () {
      this.$store.dispatch(OPEN_NOTIFICATION_ACKNOWLEDGE_DIALOG, this.notificationsSelected)
    },
    highlightNotification () {
      if (this.highlightNotificationId !== 0) {
        const child = document.getElementById('notificationId-' + this.highlightNotificationId)
        console.log('mainNotifications. highlightNotification. id:', this.highlightNotificationId, 'child', child)
        if (child === null) {
          console.log('mainNotifications. highlightNotification. highlight ignored as the notification not in list')
          return
        }
        const parent = document.getElementsByClassName('main__list')[0]
        parent.scrollTop = child.offsetTop - parent.offsetTop - 10
        child.style.backgroundColor = '#00C284'
        child.getElementsByClassName('alerts__buttons')[0].backgroundColor = '#00C284'
        // child.style.boxShadow = '0 10px 20px rgba(0, 194, 132, 0.2)'
        setTimeout(() => {
          child.style.backgroundColor = 'white'
          child.getElementsByClassName('alerts__buttons')[0].backgroundColor = 'white'
        }, 750)
        this.highlightNotificationId = 0
      }
    },
    updateFilters () {
      this.destinationFilter = store.state.config.filters.destinationFilter
      this.notificationStatesFilter = store.state.config.filters.stateFilter
    },
    updateHistorySelectPeriod (time) {
      if (Array.isArray(time)) {
        this.directionModel.historyFilters.from = time[0]
        this.directionModel.historyFilters.to = time[1]
      } else {
        this.directionModel.historyFilters.from = time
        this.directionModel.historyFilters.to = DateTime.now().toISO()
      }
      this.notificationsHistoryGet()
    },
    showNotificationPopup (item) {
      if (this.selectPressed) {
        this.$store.dispatch(SELECT_MULTIPLE_NOTIFICATIONS, [item.notification_id])
        return
      } else {
        this.$store.dispatch(UNSELECT_MULTIPLE_NOTIFICATIONS)
      }
      this.highlightNotificationId = item.notification_id
      console.log('mainNotifications. showNotificationPopup. item:', item)
      this.notificationBaseObj = item
      if (this.historyMode) {
        this.$router.push({ query: { history: 'true', notification_id: String(item.notification_id) } })
      } else {
        this.$router.push({ query: { notification_id: String(item.notification_id) } })
      }
      // this.$store.commit(SHOW_FIRST_BACKDROP)
      this.$store.commit(SHOW_NOTIFICATION_DETAILS)
      // this.showNotificationDetails = true
    },
    closeNotificationDialog () {
      // this.showNotificationDetails = false
      this.$store.commit(HIDE_NOTIFICATION_DETAILS)
      this.$store.commit(HIDE_FIRST_BACKDROP)
      if (this.historyMode) {
        this.$router.push({ query: { history: 'true' } })
      } else {
        delete this.$router.push({ query: {} })
      }
      this.notificationObj = null
    },
    closeNotificationActionDialog () {
      this.$store.commit(HIDE_ALL_DIALOGS)
    },
    parseRouteQuery () {
      const query = this.$route.query
      this.history = query.history
      console.log('mainNotifications. parseRouteQuery. history', this.history)
      if (this.history) {
        console.log('mainNotifications. parseRouteQuery. Go in history mode')
        this.$store.commit(ENABLE_HISTORY_MODE)
      }
      this.notification_id = this.$route.query.notification_id
      console.log('mainNotifications. parseRouteQuery. notification_id', this.notification_id)
      if (this.notification_id) {
        // const obj = await this.$store.dispatch(LOAD_NOTIFICATION_OBJ, this.notification_id).then()
        // console.log('mainNotifications. parseRouteQuery. notificationObj', obj)
        this.showNotificationPopup({ notification_id: this.notification_id })
      }
      this.showOrgSettingDialog = this.$route.query.org_settings
      console.log('mainNotifications. parseRouteQuery', query)
      // this.showIntegrationsDialog = this.$route.query.showintegrations
      // if (this.showIntegrationsDialog) {
      //   console.log('mainNotifications. parseRouteQuery. SHOW_INTEGRATIONS')
      //   this.$store.commit(SHOW_INTEGRATIONS)
      // }
    },
    loadPage () {
      if (this.historyMode) {
        console.log('mainNotifications. loadPage. Real time mode:', this.historyMode, 'switching to history mode')
        this.destroySocket()
        this.notificationsHistoryGet()
      } else {
        this.loading = true
        console.log('mainNotifications. loadPage. Real time mode::', this.historyMode, 'switching to real time mode')
        this.createSocket()
        this.updateFilters()
        // this.parseRouteQuery()
      }
    },
    notificationsHistoryGet () {
      this.loading = true
      console.log('mainNotifications. notificationsHistoryGet. Collect')
      const userFilters = this.$store.getters.userFilterForBridge
      const body = {
        environment_id: userFilters.environments,
        tagGrouping: userFilters.tagGrouping,
        notification_type: this.$store.getters.dstTypeIdList,
        pattern: this.directionModel.filtering.globally,
        monitoring_system: this.directionModel.filtering.monitoring_system ? this.directionModel.filtering.monitoring_system : '',
        service: this.directionModel.filtering.service ? this.directionModel.filtering.service : '',
        source: this.directionModel.filtering.source ? this.directionModel.filtering.source : '',
        name: this.directionModel.filtering.name ? this.directionModel.filtering.name : '',
        object: this.directionModel.filtering.object ? this.directionModel.filtering.object : '',
        from: this.directionModel.historyFilters.from,
        to: this.directionModel.historyFilters.to,
        scenario_id: ''
      }
      const filters = Object.keys(this.directionModel.filtering)
      filters.forEach((val) => {
        if (val !== 'globally') {
          body[val] = this.directionModel.filtering[val] ? this.directionModel.filtering[val] : ''
        }
      })
      const requestObj = {
        service: 'actions',
        path: '/history/',
        method: 'POST',
        body: JSON.stringify(body),
        options: {}
      }
      const msg = 'Collect notifications history'
      console.log('mainNotifications. notificationsHistoryGet. filter:', JSON.stringify(body))
      const popupOptions = {
        showDialog: true
      }
      this.$store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
        .then(response => {
          this.loading = false
          console.log('mainNotifications. notificationsHistoryGet. response:', response)
          this.transformAlertsData(response.notifications)
        })
        .catch((error) => {
          this.loading = false
          console.error('mainNotifications. notificationsHistoryGet. Error:', error)
        })
    },
    trackSocketTimeout () {
      this.socketTimeout = setTimeout(() => {
        this.$store.dispatch(TRIGGER_ALERT_SCENARIO, { scenario: 'socket_connection' })
      }, this.serviceConnectionTimeout)
    },
    unTrackSocketTimeout () {
      clearTimeout(this.socketTimeout)
    },
    createSocket: function () {
      // this.socketConnectionTimer = new Date().getTime()
      // this.socket = manager.socket('/my-namespace', {
      //   auth: {
      //     token: '123'
      //   }
      // })
      console.log('mainNotifications. createSocket. before create:', this.socket)
      if (this.socket == null) {
        this.trackSocketTimeout()
        const manager = new Manager(window.Config.domain, {
          reconnectionDelayMax: 10000,
          path: '/harp-bridge/socket.io'
        })
        const socket = manager.socket('/harp-bridge/notifications', {
        })
        console.log('mainNotifications. Socket create. Socket:', socket)
        this.socket = socket
        this.socket.on('connect', () => {
          this.unTrackSocketTimeout()
          // console.log('socket connection took:', ((-this.socketConnectionTimer + new Date().getTime()) / 1000), 'seconds')
          console.log('mainNotifications. createSocket. Socket notification on connect', this.socket.id)
          console.log('mainNotifications. createSocket. Before update filter. Filter', this.$store.state.user.profile.username, this.$store.getters.userFilterForBridge)
          this.socket.emit('update_filter', {
            user_name: this.$store.state.user.profile.username,
            user_data: this.$store.getters.userFilterForBridge
          })
          this.pingServer()
          // if (Object.keys(this.$route.query).length === 0) {
          //   this.joinRoom()
          // }
        })
        this.socket.on('notifications', (response) => {
          // console.log('mainNotifications. Socket on notifications =', response)
          this.transformAlertsData(response.data)
          this.loading = false
        })
        this.socket.on('statistics', (response) => {
          // console.log('socket initial data load took:', ((-this.socketConnectionTimer + new Date().getTime()) / 1000), 'seconds')
          // console.log('mainNotifications. Socket on statistics =', response)
          this.parseNotificationStats(response.data.environments, 'ui')
        })
        this.socket.on('my_pong', () => {
          // const currentTime = new Date().getTime()
          // const latency = currentTime - this.ping_pong_start_time
          // console.log('mainNotifications. Socket notification pong', latency)
          this.ping_pong_start_time = null
        })
        this.socket.on('my_response', (response) => {
          console.log('mainNotifications. Socket on my_response = ', response)
        })
      }
    },
    parseNotificationStats (stats, dst) {
      const EnvStatsDict = {}
      const notificationStatsPerState = {
        active: 0,
        handled: 0,
        snoozed: 0,
        acknowledged: 0
      }
      for (const [envId, envStats] of Object.entries(stats)) {
        EnvStatsDict[envId] = envStats[dst]
        if (this.$store.state.config.filters.environmentFilter.includes(Number(envId))) {
          notificationStatsPerState.active += envStats[dst].active
          notificationStatsPerState.handled += envStats[dst].handled
          notificationStatsPerState.snoozed += envStats[dst].snoozed
          notificationStatsPerState.acknowledged += envStats[dst].acknowledged
        } else {
          // console.log('mainNotifications. parseNotificationStats. envId/environmentFilter:', envId, this.$store.state.config.filters.environmentFilter)
        }
      }
      // console.log('mainNotifications. parseNotificationStats. notificationStatsPerState:', notificationStatsPerState)
      this.notificationPerEnvStats = EnvStatsDict
      this.notificationStats = notificationStatsPerState
      // console.log('socket initial data processing took:', ((-this.socketConnectionTimer + new Date().getTime()) / 1000), 'seconds')
    },
    destroySocket: function () {
      console.log('mainNotifications. destroySocket. before. destroySocket', this.socket)
      if (this.socket != null) {
      // if (this.socket != null && this.socket.connected) {
        console.log('mainNotifications. destroySocket. Socket notification disconnect', this.socket)
        this.socket.disconnect()
      }
      this.socket = null
    },
    msgSocket () {
      this.loading = true
      if (this.socket == null && !this.historyMode) return
      if (this.historyMode) {
        console.log('mainNotifications. msgSocket. historyMode. userFilters: ', JSON.stringify(this.$store.getters.userFilterForBridge))
        this.notificationsHistoryGet()
      } else {
        console.log('mainNotifications. msgSocket. userFilters: ', JSON.stringify(this.$store.getters.userFilterForBridge))
        this.socket.emit('update_filter', {
          user_name: this.$store.state.user.profile.username,
          user_data: this.$store.getters.userFilterForBridge
        })
      }
    },
    joinRoom: function () {
      this.leaveRoom()

      if (this.socket == null) return
      if (!this.socket.connected) return
      if (Object.keys(this.notification).length === 0) return

      if (this.notification.alert_type === 'history') {
        // this.clearPingInterval()
        console.log('mainNotifications. clearPingInterval')
      } else {
        // this.pingServer()
        // this.joined_room = this.notification.room_prefix + '_' + this.notification.alert_type
        this.joined_room = this.$store.state.user.profile.username
        console.log('mainNotifications. Socket notification join ', this.joined_room)
        this.socket.emit('join', { room: this.joined_room })
        console.log('mainNotifications. JoinRoom. data:', JSON.stringify(this.$store.getters.userFilterForBridge))
        this.socket.emit('my_room_event', {
          room: this.$store.state.user.profile.username,
          data: this.$store.getters.userFilterForBridge
        })
      }
    },
    leaveRoom: function () {
      if (this.socket == null) return
      if (!this.socket.connected) return
      if (this.joined_room.length === 0) return

      console.log('mainNotifications. Socket notification leave', this.joined_room)
      this.socket.emit('leave', { room: this.joined_room })

      // if (this.ping_pong_start_time == null) {
      //   this.clearAlertsData()
      // }
    },
    transformAlertsData: function (data) {
      this.alerts_list.length = 0
      this.full_alerts_list.length = 0
      this.full_alerts_list = data
      this.onFilterAlerts()
    },
    onFilterAlerts: function () {
      this.alerts_list = this.filterAlerts(this.full_alerts_list)
      if (!this.historyMode) {
        // this.sortAlertsData()
      }
    },
    filterAlerts: function (source) {
      const self = this
      return source.filter(function (alert) {
        let result = true
        if (alert.panel_type === 'consolidation') {
          const innerItems = self.filterAlerts(alert.body.notifications)
          alert.body.notifications = innerItems
          result = innerItems.length > 0
        } else if (alert.panel_type === 'grouping_alert') {
          const innerItems = self.filterAlerts(alert.group_notifications)
          alert.group_notifications = innerItems
          result = innerItems.length > 0
        } else if (alert.panel_type === 'single_alert') {
          // single_alert
          if (Object.keys(self.directionModel.filtering).length > 0) {
            for (let index = 0; result && index < Object.keys(self.directionModel.filtering).length; index++) {
              const field = Object.keys(self.directionModel.filtering)[index]
              const pattern = self.directionModel.filtering[field]
              if (field === 'notification_status') {
                result = pattern.indexOf(alert.notification_status) >= 0
              }
              if (result) {
                if (field === 'globally') {
                  result = false
                  for (let bodyIndex = 0; bodyIndex < Object.keys(alert.body).length; bodyIndex++) {
                    const field_ = Object.keys(alert.body)[bodyIndex]
                    if (self.filterAlert(alert, field_, pattern)) {
                      result = true
                    }
                  }
                } else {
                  result = self.filterAlert(alert, field, pattern)
                }
              }
            }
          }
        } else {
          // unknown alert panel type
          result = false
        }
        return result
      })
    },
    filterAlert: function (alert, field, pattern) {
      if (field === 'notification_status') return true
      if (pattern === '') {
        return true
      }
      let fieldValue = null
      if (Object.keys(alert.body).includes(field)) {
        fieldValue = alert.body[field]
      } else {
        fieldValue = alert.body.additional_fields[field]
      }
      let result = false
      if (fieldValue != null) {
        if (field === 'department') {
          // array
          result = fieldValue.join('').toLowerCase().indexOf(pattern.toLowerCase()) >= 0
        } else if (field === 'current_duration' || field === 'total_duration') {
          // timestamp
          const formatedValue = this.timeFormated(parseInt(fieldValue))
          result = formatedValue.toLowerCase().indexOf(pattern.toLowerCase()) >= 0
        } else if (field === 'severity') {
          if (pattern.length > 0) {
            result = pattern.indexOf(fieldValue) >= 0
          } else {
            result = true
          }
        } else {
          // string
          // result = ''.isString(fieldValue) ? fieldValue.toLowerCase().indexOf(pattern.toLowerCase()) >= 0 : false
          if (typeof (fieldValue) === 'string') {
            // console.log('True. fieldValue: ', fieldValue.toLowerCase(), 'pattern:', pattern.toLowerCase())
          } else {
            // console.log('False. fieldValue: ', fieldValue)
          }
          result = typeof (fieldValue) === 'string' ? fieldValue.toLowerCase().indexOf(pattern.toLowerCase()) >= 0 : false
        }
      }
      return result
    },
    onOrderByChanged (params) {
      console.log('mainNotifications. onOrderByChange. params', params)
      this.directionModel.sorting = params
      if (!this.historyMode) {
        // this.sortAlertsData()
      }
      this.msgSocket()
    },
    sortAlertsData: function () {
      console.log(this.directionModel.sorting)
      const field = this.directionModel.sorting.field
      const order = this.directionModel.sorting.order ? 1 : -1
      const self = this
      // sorting single alerts
      this.alerts_list.sort(function (item1, item2) {
        return self.compareAlertItems(item1, item2, field, order)
      })
      // sorting alerts in consolidation group
      for (var index = 0; index < this.alerts_list.length; index++) {
        if (this.alerts_list[index].panel_type === 'consolidation') {
          this.alerts_list[index].body.notifications.sort(function (item1, item2) {
            return self.compareAlertItems(item1, item2, field, order)
          })
        }
      }
    },
    compareAlertItems: function (item1, item2, field, order) {
      const value1 = item1.body[field]
      const value2 = item2.body[field]
      if ((value1 === undefined || value2 === undefined)) return 0
      // for integer fields
      if (field === 'current_duration') {
        return order * (parseInt(value1) - parseInt(value2))
      }
      // for string fields
      return order * value1.localeCompare(value2)
    },
    timeFormated: function (durationInSec) {
      if (durationInSec === 0) return 'Now'

      const PARTS_MAX_COUNT = 2
      const sourceDate = new Date(durationInSec * 1000)
      const year = sourceDate.getUTCFullYear()
      const month = sourceDate.getUTCMonth()
      const day = sourceDate.getUTCDate()
      const hours = sourceDate.getUTCHours()
      const min = sourceDate.getUTCMinutes()
      const sec = sourceDate.getUTCSeconds()
      let parts = 0
      let result = ''

      if (year > 1970 && parts < PARTS_MAX_COUNT) {
        if (result.length > 0) result += ' '
        result += (year - 1970) + 'y'
        parts++
      }
      if (month > 0 && parts < PARTS_MAX_COUNT) {
        if (result.length > 0) result += ' '
        result += month + 'mo'
        parts++
      }
      if (day > 1 && parts < PARTS_MAX_COUNT) {
        if (result.length > 0) result += ' '
        result += day + 'd'
        parts++
      }
      if (hours > 0 && parts < PARTS_MAX_COUNT) {
        if (result.length > 0) result += ' '
        result += hours + 'h'
        parts++
      }
      if (min > 0 && parts < PARTS_MAX_COUNT) {
        if (result.length > 0) result += ' '
        result += min + 'm'
        parts++
      }
      if (sec > 0 && result.length === 0) {
        result += sec + 's'
      }
      return result
    },

    updateDestBtnState (btnName) {
      console.log('mainNotification. updateDestBtnState. btnName: ', btnName)
      // store.commit(UPDATE_DESTINATION_FILTER, btnName)
      // this.destinationFilter[btnName] = !this.destinationFilter[btnName]
    },
    updateNotificationStateFilter (stateName) {
      console.log('mainNotification. updateNotificationStateFilter. stateName: ', stateName)
      // store.commit(UPDATE_STATE_FILTER, stateName)
      // this.notificationStatesFilter[stateName] = !this.notificationStatesFilter[stateName]
    },
    updateGlobalSearch (pattern) {
      console.log('mainNotifications. updateGlobalSearch. pattern:', pattern)
      this.directionModel.filtering.globally = pattern
      if (this.historyMode) {
        this.notificationsHistoryGet()
      } else {
        this.onFilterAlerts()
      }
    },
    onColumnsResize (columns) {
      console.log('mainNotifications. onColumnsResize. columns:', columns)
      // this.columns = columns
    },
    onFilterRemove (filterName) {
      this.$store.dispatch(CLEAR_GROUPING, filterName)
      delete this.directionModel.filtering[filterName.filter]
      if (this.historyMode) {
        this.notificationsHistoryGet()
      } else {
        this.onFilterAlerts()
      }
    },
    onGroupingChange () {
      this.openGroups = []
      this.msgSocket()
    },
    onFilterChange (params) {
      const filterName = params.filter
      const pattern = params.pattern
      // current_duration: 1
      // department: []
      // monitoring_system: "newrelic"
      // name: "Response time (web) (High) - 2"
      // notification_type: 1
      // object: "AlertID:69217382 - 3"
      // service: "GameServer"
      // severity: 3
      // source: "Game Prod - 3"
      // studio: "Unassigned"
      console.log('mainNotifications. onFilterChange. filterName:', filterName, 'pattern:', pattern)
      this.directionModel.filtering[params.filter] = params.pattern
      if (this.historyMode) {
        this.notificationsHistoryGet()
      } else {
        this.onFilterAlerts()
      }
      // this.directionModel.filtering.globally = pattern
      // this.onFilterAlerts()
    },
    // changeDestinationBtnState (btnName) {
    //   console.log('mainNotification. changeDestinationBtnState. for: ', btnName)
    //   this.destinationFilter[btnName] = !this.destinationFilter[btnName]
    // }
    // showPingServerErrorDialog : function () {
    //   if(this.pingServerErrorDialog != null) return;
    //   console.log("Socket error: Timeout exceeded !");
    //
    //   self = this;
    //   this.pingServerErrorDialog = bootbox.dialog({
    //     message     : '<h4 class="text-center">The wait interval is exceeded. Current information is not relevant.</h4>',
    //     className   : "ping-server-error-dialog",
    //     closeButton : false,
    //     onEscape    : function() { self.hidePingServerErrorDialog(); }
    //   });
    // },
    // hidePingServerErrorDialog() {
    //   if(this.pingServerErrorDialog != null) {
    //     this.pingServerErrorDialog.modal('hide');
    //     this.pingServerErrorDialog = null;
    //   }
    // },
    pingServer: function () {
      if (this.ping_pong_timer_id != null) return
      this.ping_pong_timer_id = setInterval(() => {
        let error = false
        const currentTime = new Date().getTime()
        if (this.ping_pong_start_time != null) {
          const latency = currentTime - this.ping_pong_start_time
          console.log('Socket ping request, latency', latency)
          // error = latency >= this.ping_pong_delay
          error = latency >= this.serviceConnectionTimeout
        }
        if (error) {
          this.$store.dispatch(TRIGGER_ALERT_SCENARIO, { scenario: 'socket_ping' })
        }
        if (this.socket != null) {
          this.socket.emit('my_ping')
          if (this.ping_pong_start_time == null) {
            this.ping_pong_start_time = currentTime
          }
        }
      }, this.ping_pong_delay)
    }
    // if (error) {
    //   this.showPingServerErrorDialog();
    // } else {
    //   this.hidePingServerErrorDialog();
    // }
    // clearPingInterval : function () {
    //   this.hidePingServerErrorDialog();
    //
    //   if(this.ping_pong_timer_id != null) {
    //     console.log("Clear notification ping interval");
    //     clearInterval(this.ping_pong_timer_id);
    //     this.ping_pong_timer_id   = null;
    //     this.ping_pong_start_time = null;
    //   }
    // },
  }
}
</script>

<style scoped>
.main-notification-popup {
  position: absolute;
  /*margin-top: 70px;*/
  /*min-height: calc(100vh - 70px);*/
  /*height: 700px;*/
  /*min-height: 800vh;*/
  /*width: 1200px;*/
  /*top: 450px;*/
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /*background: #999;*/
  z-index: 4;

}
.main-notification-popup > .popup__box {
  margin-top: -35px;
}
.backdrop {
  position: fixed;
  width: 100%;
  height: 100%;
  /*background-color: black;*/
  /*opacity: 30%;*/
  backdrop-filter: blur(2px) brightness(70%);
  -webkit-backdrop-filter: blur(2px) brightness(70%);
  z-index: 2;
}
.notifications-multiple-actions {
  border: 1px solid #232323;
  background-color: #232323;
  border-radius: 100px;
  color: white;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 20px;
  padding: 7px 20px 5px;
  margin: 0 auto;
  width: fit-content;
}
.notifications-multiple-actions .alerts__buttons {
  display: flex;
  width: 100px;
  margin: 0 auto;
}

.org-settings-test {
  /*border: 2px solid black*/
;
}
.notifications-multiple-selected {
  text-align: center;
  font-weight: bold;
  display: inline-block;
  padding-right: 40px;
}
.notifications-multiple-actions .alert__button{
  flex: 1 0;
  text-align: center;
}
</style>
