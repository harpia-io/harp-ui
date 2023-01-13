<template>
  <Tooltip :tooltip-text="'Acknowledged notifications'">
    <button class="button__text-icon"
            :class="{
             red: severity(3),
             yellow: severity(2),
             green: severity(1)}"
            @click="btnStateChange"
    >
      <svg width="28" height="28" viewbox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.0002 21C15.0563 21 15.9401 20.2474 16.143 19.25H11.8564C12.0602 20.2474 12.944 21 14.0002 21Z" :fill="btnColor"/>
        <path d="M19.4701 16.8655C18.588 16.1202 18.0824 15.0299 18.0824 13.8757V12.25C18.0824 10.1973 16.5573 8.49792 14.5824 8.21359V7.58362C14.5833 7.26083 14.3216 7 13.9996 7C13.6777 7 13.416 7.26083 13.416 7.58362V8.21359C11.4402 8.49792 9.91602 10.1973 9.91602 12.25V13.8765C9.91602 15.0307 9.41016 16.1202 8.52298 16.8709C8.29633 17.0651 8.16602 17.3477 8.16602 17.6461C8.16602 18.2088 8.6236 18.6672 9.18713 18.6672H18.8121C19.3748 18.6672 19.8333 18.2097 19.8333 17.6461C19.8333 17.3477 19.7029 17.0651 19.4701 16.8655Z" :fill="btnColor"/>
        <path d="M20.4163 20.9998C20.2668 20.9998 20.1179 20.943 20.0042 20.8291L7.17063 7.99548C6.94312 7.76797 6.94312 7.39883 7.17063 7.17046C7.39814 6.9421 7.76728 6.94296 7.99564 7.17046L20.8293 20.0041C21.0568 20.2316 21.0568 20.6007 20.8293 20.8291C20.7156 20.943 20.5659 20.9998 20.4163 20.9998Z" :fill="btnColor"/>
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
