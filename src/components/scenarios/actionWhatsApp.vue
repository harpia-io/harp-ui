<template>
  <div class="scenario__action-fields">
    <fieldset class="scenario-section__block-row-item">
      <legend>Action name</legend>
      <input type="text" name="action-name" placeholder="Name of the action"
             class="input__text input" :value="actionName"
             @input="$emit('update:action-name', $event.target.value)">
    </fieldset>
<!--    <fieldset class="scenario-section__block-row-item">-->
<!--      <legend>Start after seconds</legend>-->
<!--      <input type="number" min="0" :value="time"-->
<!--             class="input"-->
<!--             @input="$emit('update:time', $event.target.value)">-->
<!--    </fieldset>-->
    <fieldset class="scenario-section__block-row-item" id="risks3">
      <legend>Risks</legend>
      <input type="text" name="risks" placeholder="Risks of unhandled notification" class="input__text input">
    </fieldset>
    <fieldset class="scenario-section__block-row-item" id="impact3">
      <legend>Customer impact</legend>
      <input type="text" name="impact" placeholder="Customers impact" class="input__text input">
    </fieldset>
    <fieldset class="scenario-section__block-row-item">
      <legend>Field 2</legend>
      <input type="text" name="field2" placeholder="Field 2 notes" class="input__text input">
    </fieldset>
  </div>
  <div class="scenario__action-fields">
    <fieldset class="scenario-section__block-row-item">
      <legend>Channel IDs</legend>
      <div v-for="(id, index) in actionDetails.ids" :key="index"
           class="scenario__action-multiple-input">
        <input type="text" name="teams" placeholder="Teams channel ID"
               class="input__text input" v-model="actionDetails.ids[index]">
      </div>
    </fieldset>
  </div>
</template>

<script>
export default {
  props: ['actionName', 'time', 'actionObj'],
  emits: ['update:actionName', 'update:time'],
  computed: {
    actionDetails () {
      return this.actionObj
    }
  }
}
</script>
<style>
</style>
