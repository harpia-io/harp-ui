<template>
  <Tooltip :tooltip-text="description" position="top">
    <button class="button__icon">
      <svg width="16" height="16" viewbox="0 0 16 16" fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6.48962 13.0001C4.92761 13.0001 3.65625 11.7288 3.65625 10.1667V3.3335H2.48962C1.47827 3.3335 0.65625 4.1554 0.65625 5.16675V14.1667C0.65625 15.1781 1.47827 16.0001 2.48962 16.0001H10.8229C11.8342 16.0001 12.6562 15.1781 12.6562 14.1667V13.0001H6.48962Z"
          fill="#3C3C3C" />
        <path
          d="M15.3229 1.83337C15.3229 0.820679 14.5022 0 13.4896 0H6.48962C5.47693 0 4.65625 0.820679 4.65625 1.83337V10.1666C4.65625 11.1793 5.47693 12 6.48962 12H13.4896C14.5022 12 15.3229 11.1793 15.3229 10.1666V1.83337Z"
          fill="#3C3C3C" />
      </svg>
    </button>
  </Tooltip>
</template>

<script>
import Tooltip from '@/components/Tooltip'
export default {
  props: {
    description: {
      required: false,
      default: 'Copy details'
    }
  },
  components: {
    Tooltip
  }
}
</script>

<style scoped>

</style>
