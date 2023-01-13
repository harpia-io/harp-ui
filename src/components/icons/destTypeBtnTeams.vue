<template>
  <Tooltip :tooltipText="'Sent to Microsoft Teams'">
    <button class="button__icon-transparent" @click="btnStateChange">
      <svg width="19" height="16" viewbox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 14.2494L9.97806 16V0L0 1.75059V14.2494Z" :fill="btnColor"/>
        <path d="M10.6963 13.3489C11.0693 13.6503 11.5438 13.8312 12.0607 13.8312C13.2607 13.8312 14.2335 12.8583 14.2335 11.6584V6.43414H10.6963L10.6963 13.3489Z" :fill="btnColor"/>
        <path d="M12.0607 5.62151C13.0141 5.62151 13.787 4.84862 13.787 3.89514C13.787 2.94171 13.0141 2.16876 12.0607 2.16876C11.5056 2.16876 11.012 2.43103 10.6963 2.83807V4.9522C11.0121 5.3593 11.5056 5.62151 12.0607 5.62151Z" :fill="btnColor"/>
        <path d="M18.7001 7.55353H14.9482V12.1682C15.3426 12.6323 15.9304 12.9267 16.5864 12.9267C17.1604 12.9267 17.7105 12.6971 18.1142 12.289C18.5178 11.881 18.7414 11.3284 18.7351 10.7545L18.7001 7.55353Z" :fill="btnColor"/>
        <path d="M16.5513 6.74955C17.4943 6.74955 18.2588 5.98507 18.2588 5.04204C18.2588 4.09901 17.4943 3.33453 16.5513 3.33453C15.6082 3.33453 14.8438 4.09901 14.8438 5.04204C14.8438 5.98507 15.6082 6.74955 16.5513 6.74955Z" :fill="btnColor"/>
        <path d="M6.95734 6.21107H5.46885V10.56H4.57052V6.21107H3.08203V5.31769H6.95728V6.21107H6.95734Z" fill="white"/>
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
