<template>
  <Tooltip :tooltip-text="'Handled notifications'">
    <button class="button__text-icon"
            :class="{
             red: severity(3),
             yellow: severity(2),
             green: severity(1)}"
            @click="btnStateChange"
    >
      <svg width="28" height="28" viewbox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.8332 21C13.8893 21 14.7731 20.2474 14.976 19.25H10.6895C10.8932 20.2474 11.7762 21 12.8332 21Z" :fill="btnColor"/>
        <path d="M17.2524 15.4561C17.2375 15.4561 17.2227 15.4586 17.2078 15.4586C14.6345 15.4586 12.5414 13.3647 12.5414 10.7922C12.5414 9.78159 12.8678 8.8472 13.4164 8.08243V7.58362C13.4164 7.26083 13.1555 7 12.8336 7C12.5117 7 12.25 7.26083 12.25 7.58362V8.21359C10.2742 8.49792 8.75 10.1973 8.75 12.25V13.8765C8.75 15.0307 8.24435 16.1202 7.35696 16.8709C7.13031 17.0651 7 17.3477 7 17.6461C7 18.2088 7.45758 18.6672 8.02112 18.6672H17.6461C18.2088 18.6672 18.6672 18.2097 18.6672 17.6461C18.6672 17.3477 18.5369 17.0651 18.3049 16.8664C17.8439 16.4772 17.4895 15.9933 17.2524 15.4561Z" :fill="btnColor"/>
        <path d="M17.2084 7C15.1181 7 13.417 8.70108 13.417 10.7914C13.417 12.8817 15.1181 14.5828 17.2084 14.5828C19.2987 14.5828 20.9998 12.8825 20.9998 10.7914C20.9998 8.70023 19.2987 7 17.2084 7Z" :fill="btnColor"/>
        <path d="M17.5676 9.08515H16.8836L16.9156 11.1651H17.5316L17.5676 9.08515ZM16.9716 11.5171C16.8396 11.6571 16.8396 11.8811 16.9716 12.0211C17.1116 12.1531 17.3356 12.1531 17.4756 12.0211C17.6156 11.8811 17.6156 11.6571 17.4756 11.5171C17.3356 11.3771 17.1116 11.3771 16.9716 11.5171Z" fill="white"/>
      </svg>
      {{ count }}
    </button>
  </Tooltip>
</template>

<script>
import Tooltip from '@/components/Tooltip'
export default {
  props: ['active', 'count', 'colorId'],
  components: {
    Tooltip
  },
  computed: {
    btnColor () {
      return this.active ? '#04B404' : '#3C3C3C'
    }
  },
  methods: {
    severity (id) {
      return this.colorId === id
    },
    btnStateChange () {
      this.$emit('onUpdateNotificationState')
    }
  }
}
</script>

<style scoped>

</style>
