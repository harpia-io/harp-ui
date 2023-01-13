<template>
  <div class="aside__box active">
    <div class="aside__box-title">
      <svg width="16" height="17" viewbox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect y="0.714355" width="4.92308" height="4.92308" rx="1.4" fill="white"/>
        <rect y="8.09912" width="4.92308" height="4.92308" rx="1.4" fill="white"/>
        <rect x="7.38477" y="0.714355" width="4.92308" height="4.92308" rx="1.4" fill="white"/>
        <rect x="7.38477" y="8.09912" width="8.61538" height="8.61538" rx="1.4" fill="white"/>
      </svg>
      <span>Environments</span>
      <div @click="showEnvCheckList = !showEnvCheckList">
        <svg class="arrow" width="11" height="6" viewbox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.49999 6L0.736847 0H10.2631L5.49999 6Z" fill="white"/>
        </svg>
      </div>
    </div>

    <div v-if="showEnvCheckList" class="aside__box-main">
      <div class="check__box" v-for="(envObj, index) in environmentList" :key="index">
        <p class="checkbox">
          <input
            type="checkbox"
            :id="envObj.id + envObj.name"
            :name="envObj.name"
            :checked="envObj.checked"
            @change="updateEnvFilter(envObj)"
          >
          <label :for="envObj.id + envObj.name">{{ envObj.name }}</label>
        </p>
        <span>{{getStatsValue(envObj.id, 'active')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { UPDATE_ENV_FILTER } from '@/store/actions/config'

export default {
  props: ['envStats'],
  data () {
    return {
      showEnvCheckList: true
    }
  },
  computed: {
    environmentList () {
      // console.log('environmentsCheckBox. environmentList. from getter:', this.$store.getters.userEnvListWithFilter)
      return this.$store.getters.userEnvListWithFilter
    }
  },
  mounted () {
    console.log(this.environmentList)
    if (this.environmentList.filter(x => x.checked).length === 0) {
      this.environmentList.forEach(x => this.updateEnvFilter(x))
    }
  },
  methods: {
    updateEnvFilter (envObj) {
      // console.log('environmentCheckBox. updateEnvFilter. envObj: ', envObj)
      this.$store.commit(UPDATE_ENV_FILTER, envObj)
    },
    getStatsValue (envId, dst) {
      // console.log(envId, dst)
      if (this.envStats) {
        if (envId in this.envStats) {
          return this.envStats[envId][dst]
        }
        return '-'
      }
      return '-'
    }
  }
}
</script>

<style scoped>

</style>
