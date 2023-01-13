<template>
  <Tooltip :tooltipText="'Sent to Telegram'">
    <button class="button__icon-transparent" @click="btnStateChange">
      <svg width="20" height="16" viewbox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.79823 10.3857L7.50048 14.5738C7.92649 14.5738 8.11098 14.3908 8.33223 14.171L10.3295 12.2623L14.468 15.293C15.227 15.716 15.7617 15.4933 15.9665 14.5948L18.683 1.86575L18.6837 1.865C18.9245 0.742999 18.278 0.304249 17.5385 0.579499L1.57098 6.69275C0.481235 7.11575 0.497735 7.72325 1.38573 7.9985L5.46798 9.26825L14.9502 3.335C15.3965 3.0395 15.8022 3.203 15.4685 3.4985L7.79823 10.3857Z" :fill="btnColor"/>
      </svg>
    </button>
  </Tooltip>
</template>

<script>
import Tooltip from '@/components/Tooltip'
export default {
  components: {
    Tooltip
  },
  props: { active: Boolean },
  data () {
    return {
    }
  },
  computed: {
    btnColor () {
      return this.active ? '#04B404' : '#3C3C3C'
    }
  },
  methods: {
    btnStateChange () {
      this.$emit('updateBtnState')
    }
  }
}
</script>

<style scoped>

</style>
