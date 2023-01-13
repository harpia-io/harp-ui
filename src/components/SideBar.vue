<template>
    <aside>
      <!--      <a class="logo" href="/">-->
      <!--        <img src="images/logo.png" alt="logo">-->
      <!--      </a>-->
      <!--      <div class="aside__box active">-->
      <!--        <div class="aside__box-title">-->
      <!--          <svg width="16" height="16" viewbox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">-->
      <!--            <path d="M4 6.28467H0.572385C0.257741 6.28467 0.00334728 6.53906 0 6.85705V15.4261C0 15.7441 0.257741 15.9985 0.572385 15.9985H4C4.31799 15.9985 4.57239 15.7407 4.57239 15.4261V6.85705C4.57239 6.53906 4.31464 6.28467 4 6.28467Z" fill="white"/>-->
      <!--            <path d="M9.71385 0.00146484H6.28625C5.97161 0.00146484 5.71387 0.255858 5.71387 0.570502V15.4257C5.71387 15.7437 5.97161 15.9981 6.28625 15.9981H9.71385C10.0318 15.9981 10.2862 15.7404 10.2862 15.4257V0.57385C10.2862 0.255858 10.0285 0.00146484 9.71385 0.00146484Z" fill="white"/>-->
      <!--            <path d="M15.4277 4.5708H12.0001C11.6821 4.5708 11.4277 4.82519 11.4277 5.14319V15.426C11.4277 15.744 11.6855 15.9984 12.0001 15.9984H15.4277C15.7457 15.9984 16.0001 15.7407 16.0001 15.426V5.14319C16.0001 4.82519 15.7424 4.5708 15.4277 4.5708Z" fill="white"/>-->
      <!--          </svg>-->
      <!--          <span>Graph</span>-->
      <!--          <svg class="arrow" width="11" height="6" viewbox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">-->
      <!--            <path d="M5.49999 6L0.736847 0H10.2631L5.49999 6Z" fill="white"/>-->
      <!--          </svg>-->
      <!--        </div>-->
      <!--        <div class="aside__box-main">-->
      <!--          this chart-->
      <!--        </div>-->
      <!--      </div>-->
      <div class="divider"></div>
      <environments-check-box
        v-if="page === 'Notifications'"
        :envStats="envStats"/>
      <div class="divider"></div>
      <environments-table
        v-if="!historyMode && page === 'Motifications'"
        :envStats="envStats"/>
      <div class="divider"></div>
      <reports-list v-if="page === 'Reports'"></reports-list>
    </aside>
</template>

<script>
import environmentsCheckBox from '@/components/sidebar/environmentsCheckBox'
import environmentsTable from '@/components/sidebar/environmentsTable'
import ReportsList from './sidebar/reportsList'

export default {
  props: ['envStats'],
  components: {
    ReportsList,
    environmentsCheckBox,
    environmentsTable
  },
  computed: {
    page () {
      return this.$route.name
    },
    historyMode () {
      return this.$store.getters.historyMode
    }
  }
}
</script>

<style scoped>

</style>
