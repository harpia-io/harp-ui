<template>
  <div class="linked-alerts__box red">
    <div class="linked-alerts__box-buttons">
      <icon-new v-if="notification.new_alert" />
      <button class="button__icon lamp">
        <svg width="14" height="14" viewbox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.083 10.5H2.91634C2.59418 10.5 2.33301 10.7612 2.33301 11.0833V11.6667C2.33301 11.9888 2.59418 12.25 2.91634 12.25H11.083C11.4052 12.25 11.6663 11.9888 11.6663 11.6667V11.0833C11.6663 10.7612 11.4052 10.5 11.083 10.5Z" fill="#E23E34"/>
          <path d="M6.41699 0.583339C6.41699 0.26117 6.67816 0 7.00033 0C7.3225 0 7.58367 0.26117 7.58367 0.583339V1.16666C7.58367 1.48883 7.3225 1.75 7.00033 1.75C6.67816 1.75 6.41699 1.48883 6.41699 1.16666V0.583339Z" fill="#E23E34"/>
          <path d="M3.28678 1.7346C3.1257 1.4556 3.22129 1.09885 3.50028 0.937764C3.77928 0.776681 4.13603 0.872268 4.29711 1.15126L4.58878 1.65643C4.74986 1.93543 4.65428 2.29218 4.37528 2.45327C4.09629 2.61435 3.73953 2.51876 3.57845 2.23977L3.28678 1.7346Z" fill="#E23E34"/>
          <path d="M1.15165 4.29687C0.872656 4.13579 0.777068 3.77903 0.938151 3.50004C1.09923 3.22104 1.45599 3.12545 1.73499 3.28654L2.24015 3.5782C2.51915 3.73929 2.61474 4.09604 2.45365 4.37504C2.29257 4.65403 1.93581 4.74962 1.65682 4.58854L1.15165 4.29687Z" fill="#E23E34"/>
          <path d="M0 7C0 6.67783 0.26117 6.41666 0.583339 6.41666H1.16666C1.48883 6.41666 1.75 6.67783 1.75 7C1.75 7.32216 1.48883 7.58333 1.16666 7.58333H0.583339C0.26117 7.58333 0 7.32216 0 7Z" fill="#E23E34"/>
          <path d="M9.62428 2.45342C9.3453 2.29235 9.24972 1.93562 9.41079 1.65664L9.70249 1.15141C9.86357 0.872431 10.2203 0.776849 10.4993 0.937922C10.7783 1.099 10.8738 1.45573 10.7128 1.73471L10.4211 2.23993C10.26 2.51891 9.90326 2.6145 9.62428 2.45342Z" fill="#E23E34"/>
          <path d="M11.5466 4.37478C11.3855 4.09578 11.4811 3.73903 11.76 3.57795L12.2652 3.28628C12.5442 3.1252 12.901 3.22079 13.0621 3.49978C13.2231 3.77878 13.1276 4.13553 12.8486 4.29661L12.3434 4.58828C12.0644 4.74936 11.7076 4.65377 11.5466 4.37478Z" fill="#E23E34"/>
          <path d="M12.25 7C12.25 6.67783 12.5112 6.41666 12.8333 6.41666H13.4167C13.7388 6.41666 14 6.67783 14 7C14 7.32216 13.7388 7.58333 13.4167 7.58333H12.8333C12.5112 7.58333 12.25 7.32216 12.25 7Z" fill="#E23E34"/>
          <path d="M7 3.5C6.07207 3.50106 5.18245 3.87015 4.5263 4.5263C3.87015 5.18244 3.50106 6.07206 3.5 6.99999V9.91665H10.5V6.99999C10.499 6.07206 10.1299 5.18243 9.47372 4.52628C8.81757 3.87012 7.92794 3.50104 7 3.5Z" fill="#E23E34"/>
        </svg>
      </button>
    </div>
    <div class="linked-alerts__box-name flex-4">Number of files in / folder increased</div>
    <div class="linked-alerts__box-source flex-2">zabbix.local.1</div>
    <div class="linked-alerts__box-object flex-3">local-storage-1.local</div>
    <div class="linked-alerts__box-system flex-2">Zabbix</div>
    <div class="linked-alerts__box-env flex-2">Foxtrot Prod</div>
    <div class="linked-alerts__box-time">4m</div>
  </div>
</template>

<script>
import Eye from '@/components/icons/destTypeBtnUi'
import Teams from '@/components/icons/destTypeBtnTeams'
import Email from '@/components/icons/destTypeBtnEmail'
import Telegram from '@/components/icons/destTypeBtnTelegram'
import WatsUp from '@/components/icons/destTypeBtnWhatsApp'
import Signl4 from '@/components/icons/destTypeBtnSignl4p'

export default {
  name: 'foldedNotification',
  props: ['notification'],
  components: {
    Eye,
    Teams,
    Email,
    Telegram,
    WatsUp,
    Signl4
  }
}
</script>

<style scoped>

</style>
