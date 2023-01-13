<template>
  <div class="loading-spinner" :style="`height: ${height}`">
    <!-- https://www.npmjs.com/package/vue-loading-overlay -->
    <loading :active="true"
             :can-cancel="false"
             :opacity="opacity"
             color="#00C284"
             :width="spinnerWidth"
             :height="spinnerHeight"
             :loader="loader"
             :zIndex="isFullPage ? 999 : zIndex"
             :lock-scroll="true"
             :is-full-page="isFullPage"></loading>
  </div>

</template>

<script>
export default {
  name: 'loading-spinner',
  props: {
    isFullPage: {
      default: false
    },
    loader: {
      default: 'dots'
    },
    opacity: {
      default: 0.1
    },
    zIndex: {
      default: 2
    },
    spinnerWidth: {
      default: 60
    },
    spinnerHeight: {
      default: 60
    },
    height: {
      default: '100%'
    }
  },
  data () {
    return {}
  }
}
</script>

<style>
  .loading-spinner {
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>
