<template>
  <div class="time-selector" @click.stop="onTimeSelectorClick">
    <div class="time-selector__custom-time-add-form"
         v-show="showNewTimeForm">
      <input type="text"
             placeholder="15m"
             class="input__text input"
             v-model="newTimeDelay"
      >
      <btn-save :active="newTimeDelay.length > 2" @click="saveCustomDelayTime"/>
      <btn-cancel :active="true" @click="cancelCustomDelayTime"/>
    </div>

    <div
      v-show="!showNewTimeForm"
      class="global-search-controls-block__select"
      :id="selectorId"></div>
    <confirmation-popup ref="confirmation"></confirmation-popup>
  </div>
</template>

<script>
import { TimeSelector } from '@/tools/time-selector/timeSelect'
import '@/tools/select-plugin/select.scss'
import btnSave from '@/components/icons/btnSave'
import btnCancel from '@/components/icons/btnCancel'
import ConfirmationPopup from '@/components/popups/confirmationPopup'
import { ref } from 'vue'

// import useVuelidate from '@vuelidate/core'
// import { helpers } from '@vuelidate/validators'

const pattern = new RegExp(/^\d*[smhd]$/)
export default {
  props: ['selectorId', 'triggerDelay'],
  emits: ['update-trigger-delay'],
  components: {
    btnSave,
    btnCancel,
    ConfirmationPopup
  },
  data () {
    return {
      // v$: useVuelidate(),
      selectedTime: null,
      showNewTimeForm: false,
      customTimeId: '0',
      selectedId: '1',
      newTimeDelay: '',
      lastSelectedValue: '',
      ids_counter: 7,
      timeOptions: [
        { id: '0', value: 'Custom' },
        { id: '1', value: '0s' },
        { id: '2', value: '5m' },
        { id: '3', value: '15m' },
        { id: '4', value: '30m' },
        { id: '5', value: '1h' },
        { id: '6', value: '12h' },
        { id: '7', value: '1d' }
      ],
      select: null
    }
  },
  // validators () {
  //   return {
  //     newTimeDelay: {
  //       isCorrectTimeFormatValid: helpers.withMessage(
  //         'Should be in format like: 1s, 3m, 4d',
  //         this.isTimeFormatValid
  //       )
  //     }
  //   }
  // },
  methods: {
    isTimeFormatValid (delayTime) {
      const isValid = pattern.test(delayTime)
      console.log('timeSelector. isTimeFormatValid:', isValid)
      return isValid
    },
    updateTime (item) {
      console.log('Time changed to:', item)
      if (item === 'Custom') {
        this.showNewTimeForm = true
        console.log('timeSelector. updateTime. Custom time period chosen')
      } else {
        this.lastSelectedValue = item
        this.$emit('update-trigger-delay', item)
      }
    },
    findSelectedId (initialSetup) {
      let selectedId = this.customTimeId
      const triggerDelay = initialSetup ? this.triggerDelay : this.newTimeDelay
      this.timeOptions.forEach(time => {
        if (time.value === triggerDelay) {
          selectedId = time.id
        }
      })
      console.log('timeSelector. findSelectedId:', selectedId)
      this.selectedId = selectedId
    },
    setupTagSelect (initialSetup) {
      const updateTime = this.updateTime
      this.findSelectedId(initialSetup)
      this.select = new TimeSelector('#' + this.selectorId, {
        placeholder: 'Select time',
        data: this.timeOptions,
        selectedId: this.selectedId,
        onSelect (item) {
          console.log('Selected Item', item)
          updateTime(item.value)
        }
      })
    },
    saveCustomDelayTime () {
      console.log('timerSelector. saveCustomDelayTime. newValue:', this.newTimeDelay)
      // this.v$.newTimeDelay.$touch()
      if (this.isTimeFormatValid(this.newTimeDelay)) {
        this.ids_counter += 1
        this.selectedId = String(this.ids_counter)
        this.timeOptions.push({
          id: this.selectedId,
          value: this.newTimeDelay
        })
        console.log('timerSelector. timeOptions after update:', this.timeOptions)
        this.select.destroy()
        this.setupTagSelect()
        this.$emit('update-trigger-delay', this.newTimeDelay)
        this.showNewTimeForm = false
      } else {
        this.$refs.confirmation.showScenario('wrongTimeFormat')
        // alert('Wrong time format. Time should be like one of the following formats: 40s, 12m, 4d')
      }
      // this.ids_counter += 1
      // this.selectedId = String(this.ids_counter)
      // this.timeOptions.push({
      //   id: this.selectedId,
      //   value: this.newTimeDelay
      // })
      // console.log('timerSelector. timeOptions after update:', this.timeOptions)
      // this.select.destroy()
      // this.setupTagSelect()
      // this.showNewTimeForm = false
    },
    cancelCustomDelayTime () {
      const lastSelectedItem = this.timeOptions.find(item => item.value === this.lastSelectedValue)
      this.select.select(lastSelectedItem.id)
      this.showNewTimeForm = false
    },
    onTimeSelectorClick () {
      // console.log('Timer clicked')
    }
  },
  setup () {
    const confirmation = ref(null)
    return { confirmation }
  },
  mounted () {
    const delayTimeInOptions = this.timeOptions.find(item => item.value === this.triggerDelay)
    if (!delayTimeInOptions) {
      this.ids_counter += 1
      this.timeOptions.push({
        id: String(this.ids_counter),
        value: this.triggerDelay
      })
    }
    this.setupTagSelect(true)
  }
}
</script>

<style scoped>
.time-selector {
  /*border: solid 1px grey;*/
  display: flex;
  /*z-index: 2;*/
}
.time-selector input {
  width: 200px;
  height: 28px;
  padding: 0 5px;
  color: black;
}
.global-search-controls-block__select {
  width: 100px;
}
.time-selector__custom-time-add-form {
  display: flex;
  border: grey 1px solid;
  border-radius: 5px;
  margin: 0 4px;
  align-items: center;
}
/*.time-selector__custom-time-add-form input {*/
/*  height: 28px;*/
/*  width: 40px;*/
/*  font-size: large;*/
/*}*/
</style>
