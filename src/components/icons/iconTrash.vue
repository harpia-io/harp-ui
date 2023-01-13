<template>
  <div>
    <Tooltip :tooltipText="description" :position="position">
      <button class="button__text-icon trash-button">
        <svg class="delete-icon" width="20" height="23" viewBox="0 0 20 23" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7 4L7.75 1H12.25L13 4M19 4H2.5L4 22H16L17.5 4H1H19ZM10 8.5V17.5V8.5ZM13.75 8.5L13 17.5L13.75 8.5ZM6.25 8.5L7 17.5L6.25 8.5Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
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
/*.delete-icon:hover path{*/
/*  stroke: #d52d0e;*/
/*}*/
.trash-button:hover{
  background: #E23E34;
}
</style>
