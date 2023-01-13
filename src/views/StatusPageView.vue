<template>
  <div class="app-block__main-body">
    <div class="backdrop backdrop-second" style="z-index: 3" v-if="showBackDrop"></div>
<!--    <div class="app-block__main-body-sidebar" v-show="showSideBar">-->
<!--      <side-bar></side-bar>-->
<!--    </div>-->
    <div :class="['app-block__main-body-content', { 'app-block__main-body-content-with-sidebar': showSideBar}]">
      <status-page></status-page>
    </div>
  </div>
</template>

<script>
// import SideBar from '../components/SideBar'
import StatusPage from '../components/StatusPage'
export default {
  components: { StatusPage },
  computed: {
    // showSideBar () {
    //   return this.$store.state.config.showSideBar
    // },
    showBackDrop () {
      return this.$store.getters.showBackdrop
    }
  }
}
</script>

<style scoped>

</style>
