<template>
  <div class="have-folder" @click="consolidationBlockOpen = !consolidationBlockOpen"
       @mouseleave="onMouseLeave"
       @mouseover="showAlertBtn = true">
    <div class="linked-alerts__box folder active"
         :class="{
           red: severity(3),
           yellow: severity(2),
           green: severity(1)}">
      <div class="linked-alerts__box-folder notification__buttons-block">
        <svg class="arrow" width="11" height="6" viewbox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.50002 6L10.2631 0H0.736877L5.50002 6Z" fill="#3C3C3C"/>
        </svg>
        <svg width="16" height="16" viewbox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.6133 2.6792H4.36053C4.10488 2.6792 3.89762 2.47195 3.89762 2.21629V1.98466C3.89762 1.72401 3.68631 1.5127 3.42566 1.5127H0.943937C0.422625 1.5127 0 1.93529 0 2.45663V10.3992L1.21116 4.50682C1.25541 4.29157 1.44484 4.1371 1.66459 4.1371H13.5573V3.62313C13.5573 3.10179 13.1346 2.6792 12.6133 2.6792Z" fill="#3C3C3C"/>
          <path d="M15.0561 5.06299H2.04217L0.220701 13.9245C0.160951 14.2152 0.383013 14.4876 0.679857 14.4876H14.2223C14.7034 14.4876 15.1076 14.1257 15.1605 13.6474L15.9943 6.11074C16.0561 5.55171 15.6185 5.06299 15.0561 5.06299Z" fill="#3C3C3C"/>
        </svg>
      </div>
      <div class="linked-alerts__box-role consolidation-role-block">{{ consolidationObj.body.consolidation_name }}</div>
      <div class="linked-alerts__box-host consolidation-host-block">{{ consolidationString() }}</div>
<!--      <div class="linked-alerts__box-time">4m</div>-->
      <div class="alerts__buttons" v-show="showAlertBtn" :style="{'z-index': 'unset'}">
        <!--Handle notification-->
        <div class="alert__button">

          <button class="button__icon-transparent" @click.stop="handleNotification">
            <Tooltip tooltipText="Handle" :position="index === 0 ? 'bottom' : 'top'">
              <icon-handled/>
            </Tooltip>
            <!--          <svg width="16" height="16" viewbox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">-->
            <!--            <path d="M11.4046 7.53154H12.1407C11.9244 5.60738 10.3927 4.07567 8.46857 3.85938V4.59551H7.53154V3.85938C5.60738 4.07567 4.07567 5.60738 3.85938 7.53154H4.59551V8.46857H3.85938C4.07567 10.3927 5.60738 11.9244 7.53154 12.1407V11.4046H8.46857V12.1407C10.3927 11.9244 11.9244 10.3927 12.1407 8.46857H11.4046V7.53154ZM8.9959 9.65848L7.53154 8.19411V5.5326H8.46857V7.806L9.65848 8.99593L8.9959 9.65848Z" fill="#3C3C3C"/>-->
            <!--            <path d="M16 9.85398V6.14605H14.8246C14.6673 5.56462 14.4368 5.00853 14.1364 4.48551L14.9678 3.65411L12.3459 1.0322L11.5145 1.86363C10.9915 1.56319 10.4354 1.33274 9.85398 1.17541V0H6.14602V1.17538C5.56462 1.33271 5.00853 1.56319 4.48548 1.8636L3.65408 1.03217L1.03217 3.65411L1.8636 4.48551C1.56319 5.00853 1.33274 5.56462 1.17541 6.14605H0V9.85398H1.17541C1.33274 10.4355 1.56316 10.9914 1.8636 11.5145L1.03217 12.3459L3.65408 14.9678L4.48548 14.1364C5.00853 14.4368 5.56462 14.6673 6.14602 14.8247V16H9.85395V14.8247C10.4353 14.6673 10.9914 14.4368 11.5145 14.1364L12.3459 14.9678L14.9678 12.3459L14.1364 11.5145C14.4368 10.9915 14.6672 10.4355 14.8246 9.85398H16ZM8 13.1042C5.18553 13.1042 2.8958 10.8145 2.8958 8C2.8958 5.18553 5.18553 2.8958 8 2.8958C10.8145 2.8958 13.1042 5.18553 13.1042 8C13.1042 10.8145 10.8145 13.1042 8 13.1042Z" fill="#3C3C3C"/>-->
            <!--          </svg>-->
          </button>

        </div>
        <div class="alert__button">
          <button class="button__icon-transparent" @click.stop="resolveNotification">
            <Tooltip tooltipText="Resolve" :position="index === 0 ? 'bottom' : 'top'">
              <icon-resolve/>
              <!--              <svg width="16" height="16" viewbox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">-->
              <!--                <path d="M8 0C3.58897 0 0 3.58897 0 8C0 12.411 3.58897 16 8 16C12.411 16 16 12.411 16 8C16 3.58897 12.411 0 8 0ZM12.4712 5.89474L7.3584 10.9674C7.05764 11.2682 6.57644 11.2882 6.25564 10.9875L3.54887 8.5213C3.22807 8.22055 3.20802 7.7193 3.48872 7.3985C3.78947 7.07769 4.29073 7.05764 4.61153 7.3584L6.75689 9.32331L11.3283 4.75188C11.6491 4.43108 12.1504 4.43108 12.4712 4.75188C12.792 5.07268 12.792 5.57393 12.4712 5.89474Z" fill="#3C3C3C"/>-->
              <!--              </svg>-->
            </Tooltip>
          </button>
        </div>
        <div class="alert__button">
          <button class="button__icon-transparent" @click.stop="snoozeNotification">
            <Tooltip tooltipText="Snooze" :position="index === 0 ? 'bottom' : 'top'">
              <icon-snoozed/>
            </Tooltip>
            <!--          <svg width="16" height="16" viewbox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">-->
            <!--            <path d="M15.1665 11.623L13.6935 10.7767L15.0803 9.97412C15.2393 9.88134 15.293 9.67725 15.2003 9.51822L14.8644 8.94247C14.7716 8.78344 14.5675 8.72975 14.4085 8.8225L12.3589 10.0098L11.4461 9.19656L13.4684 8.305C13.5889 8.25163 13.667 8.13216 13.667 8C13.667 7.86784 13.5889 7.74837 13.4684 7.695L11.4187 6.79134L12.3591 6.25897L14.4183 7.45803C14.5774 7.55081 14.7814 7.49709 14.8742 7.33806L15.21 6.76231C15.3028 6.60328 15.2491 6.39919 15.09 6.30641L13.6925 5.49281L15.1665 4.64587C15.3264 4.55378 15.3811 4.34994 15.2888 4.1905L14.9546 3.61316C14.8624 3.45372 14.658 3.39909 14.4981 3.49116L13.0227 4.33891L13.021 2.72278C13.0202 2.53869 12.8703 2.39013 12.6862 2.39097L12.0196 2.39394C11.8355 2.39475 11.687 2.54466 11.6878 2.72875L11.6913 5.10394L10.667 5.68378L10.665 3.70362C10.6793 3.57178 10.6136 3.44384 10.4984 3.37844C10.3825 3.31269 10.2392 3.32178 10.1338 3.40156L8.66695 4.41675V3.05316L10.7369 1.86822C10.8968 1.77688 10.9523 1.57325 10.861 1.41344L10.5303 0.834687C10.439 0.674844 10.2354 0.619313 10.0755 0.710625L8.66701 1.51706V0.333344C8.66698 0.149219 8.51773 0 8.33367 0H8.00032H7.66698C7.48288 0 7.33364 0.14925 7.33364 0.333344V1.52194L5.9251 0.710656C5.76526 0.619312 5.56167 0.674844 5.47032 0.834687L5.13964 1.41344C5.04829 1.57328 5.10382 1.77691 5.26367 1.86822L7.33367 3.05931V4.40997L5.8812 3.40862C5.82195 3.36369 5.75098 3.34091 5.68001 3.34091C5.67479 3.34025 5.67023 3.34059 5.66698 3.34091C5.48273 3.34091 5.33364 3.49 5.33364 3.67425C5.33364 3.71919 5.33364 5.73859 5.33364 5.73859L4.31379 4.83759L4.32257 2.44822C4.32342 2.26413 4.17482 2.11422 3.99076 2.11341L3.32423 2.11044C3.14014 2.10962 2.99023 2.25819 2.98939 2.44225L2.98348 4.07319L1.50251 3.22228C1.34267 3.13025 1.13829 3.18484 1.04601 3.34428L0.711823 3.92162C0.619542 4.08106 0.674292 4.28494 0.834135 4.377L2.3071 5.22334L0.920385 6.02588C0.761354 6.11866 0.707667 6.32275 0.800385 6.48178L1.13623 7.05753C1.22901 7.21656 1.4331 7.27025 1.59214 7.1775L3.6417 5.99016L4.55454 6.80344L2.5322 7.695C2.41176 7.74837 2.33364 7.86784 2.33364 8C2.33364 8.13216 2.41176 8.25163 2.5322 8.305L4.58192 9.20866L3.64157 9.74103L1.58232 8.54197C1.42329 8.44919 1.2192 8.50291 1.12648 8.66194L0.790635 9.23772C0.697854 9.39675 0.751573 9.60084 0.910604 9.69363L2.3081 10.5072L0.834135 11.3542C0.674292 11.4462 0.619542 11.6501 0.711823 11.8095L1.04601 12.3869C1.13829 12.5463 1.3427 12.6009 1.50251 12.5089L2.97795 11.6611L2.9796 13.2773C2.98042 13.4613 3.13032 13.6099 3.31442 13.6091L3.98101 13.6061C4.1651 13.6053 4.31367 13.4554 4.31282 13.2713L4.30935 10.8961L5.33364 10.3162L5.3356 12.2964C5.32129 12.4282 5.38704 12.5562 5.50226 12.6216C5.61813 12.6873 5.76139 12.6783 5.86685 12.5985L7.33367 11.5833V12.9468L5.26367 14.1318C5.10382 14.2231 5.04829 14.4267 5.13964 14.5866L5.47032 15.1653C5.56167 15.3252 5.76529 15.3807 5.9251 15.2894L7.33364 14.4829V15.6667C7.33364 15.8508 7.48288 16 7.66698 16H8.00032H8.33367C8.51776 16 8.66701 15.8507 8.66701 15.6667V14.4781L10.0755 15.2893C10.2354 15.3807 10.439 15.3252 10.5303 15.1653L10.861 14.5866C10.9524 14.4267 10.8968 14.2231 10.737 14.1318L8.66698 12.9407V11.59L10.1194 12.5914C10.1787 12.6363 10.2497 12.6591 10.3206 12.6591C10.3259 12.6597 10.3304 12.6594 10.3337 12.6591C10.5179 12.6591 10.667 12.51 10.667 12.3258C10.667 12.2808 10.667 10.2614 10.667 10.2614L11.6869 11.1624L11.6781 13.5518C11.6772 13.7359 11.8258 13.8858 12.0099 13.8866L12.6764 13.8896C12.8605 13.8904 13.0104 13.7418 13.0113 13.5577L13.0172 11.9268L14.4982 12.7777C14.658 12.8697 14.8624 12.8151 14.9547 12.6557L15.2889 12.0783C15.3811 11.9189 15.3263 11.7151 15.1665 11.623Z" fill="#3C3C3C"/>-->
            <!--          </svg>-->
          </button>
        </div>
        <div class="alert__button">
          <button class="button__icon-transparent" @click.stop="acknowledgeNotification">
            <Tooltip tooltipText='Ack' :position="index === 0 ? 'bottom' : 'top'">
              <icon-acknowledged/>
            </Tooltip>
            <!--          <svg width="16" height="16" viewbox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">-->
            <!--            <path d="M14.854 14.1473L1.854 1.14625C1.659 0.95125 1.342 0.95125 1.147 1.14625C0.952 1.34125 0.952 1.65825 1.147 1.85325L3.44 4.14625C2.656 5.07125 2.132 6.22225 2.025 7.50025H0.5C0.224 7.50025 0 7.72425 0 8.00025C0 8.27625 0.224 8.50025 0.5 8.50025H2.025C2.267 11.4102 4.59 13.7333 7.5 13.9753V15.5002C7.5 15.7762 7.724 16.0002 8 16.0002C8.276 16.0002 8.5 15.7762 8.5 15.5002V13.9753C9.778 13.8693 10.929 13.3442 11.854 12.5612L14.147 14.8542C14.244 14.9513 14.372 15.0002 14.5 15.0002C14.628 15.0002 14.756 14.9513 14.854 14.8542C15.049 14.6593 15.049 14.3422 14.854 14.1473Z" fill="#3C3C3C"/>-->
            <!--            <path d="M15.4997 7.5H13.9747C13.7327 4.59 11.4097 2.267 8.49966 2.025V0.5C8.49966 0.224 8.27566 0 7.99966 0C7.72366 0 7.49966 0.224 7.49966 0.5V2.025C6.57866 2.101 5.72866 2.405 4.97266 2.852L13.1477 11.027C13.5937 10.271 13.8977 9.421 13.9747 8.5H15.4997C15.7757 8.5 15.9997 8.276 15.9997 8C15.9997 7.724 15.7757 7.5 15.4997 7.5Z" fill="#3C3C3C"/>-->
            <!--          </svg>-->
          </button>
        </div>
      </div>
    </div>

    <!-- child -->
    <div class="child" v-if="consolidationBlockOpen">
      <div v-for="(item, index) in consolidationObj.body.notifications" :key="index">
        <notification
          :notification="item"
          :index="index"
          :columns="columns"
          @showNotificationPopup="$emit('showNotificationPopup', item)"
        />
      </div>
    </div>
  </div>

</template>

<script>
import Notification from '@/components/notifications/alert'
import Tooltip from '@/components/Tooltip'
import iconHandled from '@/components/icons/iconHandled'
import iconSnoozed from '@/components/icons/iconSnoozed'
import iconAcknowledged from '@/components/icons/iconAcknowledged'
import iconResolve from '@/components/icons/iconResolve'
import {
  OPEN_NOTIFICATION_ACKNOWLEDGE_DIALOG,
  OPEN_NOTIFICATION_HANDLE_DIALOG,
  OPEN_NOTIFICATION_RESOLVE_DIALOG,
  OPEN_NOTIFICATION_SNOOZE_DIALOG
} from '@/store/actions/notificationActions'

export default {
  props: ['consolidationObj', 'index'],
  components: {
    Notification,
    Tooltip,
    iconHandled,
    iconSnoozed,
    iconAcknowledged,
    iconResolve
  },
  data () {
    return {
      consolidationBlockOpen: false,
      showAlertBtn: false
    }
  },
  computed: {
    columns () {
      return this.$store.getters.userFilterColumns
    }
  },
  methods: {
    severity (id) {
      return this.consolidationObj.body.severity === id
    },
    onMouseLeave () {
      this.showAlertBtn = false
    },
    consolidationString () {
      return JSON.stringify(this.consolidationObj.body.consolidation_fields).slice(1, -1)
    },
    notificationIDs () {
      const notificationList = []
      this.consolidationObj.body.notifications.forEach(notification => {
        notificationList.push(Number(notification.notification_id))
      })
      console.log(notificationList)
      return notificationList
    },
    handleNotification () {
      this.$store.dispatch(OPEN_NOTIFICATION_HANDLE_DIALOG, this.notificationIDs())
    },
    resolveNotification () {
      this.$store.dispatch(OPEN_NOTIFICATION_RESOLVE_DIALOG, this.notificationIDs())
    },
    snoozeNotification () {
      this.$store.dispatch(OPEN_NOTIFICATION_SNOOZE_DIALOG, this.notificationIDs())
    },
    acknowledgeNotification () {
      this.$store.dispatch(OPEN_NOTIFICATION_ACKNOWLEDGE_DIALOG, this.notificationIDs())
    }
  }
}
</script>

<style scoped>
.notification__buttons-block {
  min-width: 103px;
}
.consolidation-role-block {
  width: 360px;
}
</style>
