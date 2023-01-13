<template>
  <div class="environments-drop-down input__select">
    <select class="input fieldset-select" v-model="chosenEnv"
    >
      <option
        v-for="(envName, envId) in environmentsDict" :key="envId"
        :value="envId"
      >
        {{ envName }} {{ envId }}
      </option>
    </select>
    <!--
    <div @click="menuOpen = true" class="select-dropdown-input" style="position: relative">
      {{ chosenEnv }}
      <div class="status-menu user__box-menu date-time-picker-shortcuts-menu"
           v-if="menuOpen"
           @mouseleave="menuOpen = false">
        <button @click.stop="chosenEnv = envId"
                :key="envId"
                v-html="envName + ' ' + envId"
                :class="{'date-time-picker-shortcuts-menu-selected': activeEnvId === envId }"
                v-for="(envName, envId) in environmentsDict">
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
    'activeEnvId'
  ],
  emits: [
    'emit-active-env-id'
  ],
  data () {
    return {
      menuOpen: false
    }
  },
  computed: {
    environmentsDict () {
      return store.getters.getEnv
    },
    chosenEnv: {
      get () { return this.activeEnvId },
      set (v) { this.$emit('emit-active-env-id', v) }
      // return this.activeEnvId
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
