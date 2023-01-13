<template>
  <div>
    <Tooltip :tooltipText="description" :position="position">
      <button class="button__text-icon">
        <svg class="icon-save-as-svg" width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M15.56 0.994998L18.065 3.5L18.5 4.565V5.06H17.75L17 5.81V4.565L14.495 2.06H14V8.06H5V2.06H2V17.06H6.5L5.75 18.56H2L0.5 17.06V2.06L2 0.559998H14.495L15.56 0.994998V0.994998ZM9.5 6.5H12.5V2H9.5V6.5ZM19.25 6.5L21.5 8.75L21.47 9.785L13.22 18.035L13.025 18.215L12.47 18.77L12.32 18.905L7.82 21.155L6.815 20.15L9.065 15.65L9.2 15.5L9.755 14.945L9.935 14.75L18.185 6.5H19.25V6.5ZM9.92 17.36L9.14 18.86L10.7 18.14L9.92 17.36V17.36ZM10.955 15.815L12.14 17L19.865 9.275L18.68 8.09L10.955 15.815Z" fill="black"/>
        </svg>
      </button>
    </Tooltip>
  </div>
</template>

<script>
import Tooltip from '@/components/Tooltip'
export default {
  props: {
    description: {
      type: String,
      required: false,
      default: 'Save as'
    },
    position: {
      type: String,
      required: false,
      default: 'left'
    }
  },
  components: {
    Tooltip
  }
}
</script>

<style scoped>
/*.icon-save-as-svg:hover path {*/
/*  fill: green;*/
/*}*/
</style>
