<template>
  <svg width="16" height="16" viewbox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 8.15094C16 8.90566 15.3962 9.50943 14.6415 9.50943H9.20755V14.6415C9.20755 15.3962 8.60377 16 7.84906 16C7.09434 16 6.49057 15.3962 6.49057 14.6415V9.50943H1.35849C0.603774 9.50943 0 8.90566 0 8.15094C0 7.39623 0.603774 6.79245 1.35849 6.79245H6.49057V1.35849C6.49057 0.603774 7.09434 0 7.84906 0C8.60377 0 9.20755 0.603774 9.20755 1.35849V6.79245H14.6415C15.3962 6.79245 16 7.39623 16 8.15094Z" :fill="btnColor"/>
  </svg>
</template>

<script>
export default {
  name: 'iconPlus',
  props: {
    btnColor: {
      type: String,
      default: '#00C284'
    }
  }
  // fill="#00C284"
}
</script>

<style scoped>

</style>
