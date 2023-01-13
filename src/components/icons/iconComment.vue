<template>
  <svg width="16" height="14" viewbox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13.43 0.078125H2.55441C1.41733 0.078125 0.492188 1.00327 0.492188 2.14035V8.79596C0.492188 9.93085 1.4133 10.8543 2.54709 10.8582V13.8786L6.88733 10.8585H13.43C14.567 10.8585 15.4922 9.93332 15.4922 8.79596V2.14035C15.4922 1.00327 14.567 0.078125 13.43 0.078125ZM11.4774 7.81277H4.50696V6.93387H11.4774V7.81277ZM11.4774 5.93777H4.50696V5.05887H11.4774V5.93777ZM11.4774 4.06277H4.50696V3.18387H11.4774V4.06277Z" :fill="btnColor"/>
  </svg>
</template>

<script>
export default {
  // #00C284
  name: 'iconComment',
  props: {
    btnColor: {
      type: String,
      default: '#00C284'
    }
  }
}
</script>

<style scoped>

</style>
