<template>
  <div class="environments-drop-down input__select">
    <select class="input fieldset-select" v-model="chosenScenario"
    >
      <option
        v-for="scenarioObj in scenariosDict" :key="scenarioObj.scenario_id"
        :value="scenarioObj.scenario_id"
      >
        {{ scenarioObj.scenario_name }}
      </option>
    </select>
    <!--
    <div @click="menuOpen = true" class="select-dropdown-input" style="position: relative">
      {{ chosenScenario }}
      <div class="status-menu user__box-menu date-time-picker-shortcuts-menu"
           v-if="menuOpen"
           @mouseleave="menuOpen = false">
        <button @click.stop="chosenEnv = scenarioObj.scenario_id"
                :key="scenarioObj.scenario_id"
                v-html="scenarioObj.scenario_name"
                :class="{'date-time-picker-shortcuts-menu-selected': chosenScenario === scenarioObj.scenario_name }"
                v-for="scenarioObj in scenariosDict">
        </button>
      </div>
    </div>
    -->
  </div>
</template>

<script>
import store from '@/store'

export default {
  props: [
    'activeScenarioId'
  ],
  emits: [
    'emit-active-scenario-id'
  ],
  data(){
    return {
      menuOpen: false,
    }
  },
  computed: {
    scenariosDict () {
      return store.getters.getScenarios
    },
    chosenScenario: {
      get () { return this.activeScenarioId },
      set (v) { this.$emit('emit-active-scenario-id', v) }
    }
  }
}
</script>

<style scoped>
.input__select {
  cursor: pointer;
}
.input {
  display: block;
  width: 100%;
  padding: 9px 12px 10px;
  border: 1px solid var(--c-disable);
  border-radius: var(--r-radius-sec);
  font-family: var(--f-regular);
  color: var(--c-text);
  font-size: var(--s-input);
  transition: all ease-out var(--a-transition-fast);
}
.fieldset-select{
  margin: 0 0;
  background-color: white;
  padding: 8px 12px
}
.environments-drop-down {
  width: 250px;
  padding: 0 0;
}
.select-dropdown-input {
  display: block;
  width: 100%;
  padding: 5px 12px 5px;
  border: 1px solid var(--c-disable);
  border-radius: var(--r-radius-sec);
  font-family: var(--f-regular);
  color: var(--c-text);
  font-size: var(--s-input);
  transition: all ease-out var(--a-transition-fast);
}
.select-dropdown-input .status-menu {
  top: 28px;
}
</style>
