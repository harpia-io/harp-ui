<template>
  <Tooltip :tooltipText="'Sent Email'">
    <button class="button__icon-transparent" @click="btnStateChange">
      <svg width="19" height="18" viewbox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.667 9.09224L18.7352 12.9285V5.09399L12.667 9.09224Z" :fill="btnColor"/>
        <path d="M0.735352 5.09399V12.9285L6.8036 9.09224L0.735352 5.09399Z" :fill="btnColor"/>
        <path d="M17.6108 2.8125H1.86078C1.29941 2.8125 0.853906 3.231 0.769531 3.76988L9.73578 9.67725L18.702 3.76988C18.6177 3.231 18.1722 2.8125 17.6108 2.8125Z" :fill="btnColor"/>
        <path d="M11.6367 9.77169L10.0449 10.8202C9.95036 10.8821 9.84348 10.9124 9.73548 10.9124C9.62748 10.9124 9.52061 10.8821 9.42611 10.8202L7.83423 9.77057L0.771484 14.2379C0.858109 14.7723 1.30136 15.1874 1.86048 15.1874H17.6105C18.1696 15.1874 18.6129 14.7723 18.6995 14.2379L11.6367 9.77169Z" :fill="btnColor"/>
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
