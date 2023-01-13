<template>
  <Tooltip :tooltipText="'Triggered PagerDuty'">
    <button class="button__icon-transparent" @click="btnStateChange">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 24" width="16px" height="16px" fill="none">
        <path d="M17 3c-1.6-.8-2.7-1-5.2-1H6v12.1h5.8c2.3 0 4-.1 5.5-1.1 1.6-1.1 2.6-3 2.5-5 .1-2.1-1-4-2.8-5zm-4.6 8.6H8.9v-7h3.3c3 0 4.5 1 4.5 3.4.1 2.6-1.8 3.6-4.3 3.6zM6 22h2.9v-5.3H6V22z" :fill="btnColor"/>
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
