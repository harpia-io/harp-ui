<template>
  <div style="position:relative">
    <!--    changes started-->
    <input class="form-control-local" type="text"
           :value="modelValue"
           @keydown.enter = 'enter'
           @keydown.down = 'down'
           @keydown.up = 'up'
           @input = 'change'
           @change='change'
           @focus="onFocus"
           :placeholder='placeholder'
    />
    <ul class="dropdown-menu-local" v-if="openSuggestion" style="width:100%" v-click-outside="closeSelect">
      <li v-for="(suggestion, index) in matches" :key="index"
          :class="{'active': isActive(index)}"
          class="dropdown-menu-local__item"
          @click="suggestionClick(index)"
      >
        {{ suggestion }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  emits: [
    'update:modelValue',
    'enter-press'
  ],

  data () {
    return {
      open: false,
      current: 0
      // selection: ''
    }
  },
  props: {
    suggestions: {
      type: Array,
      required: true
    },
    addTag: {
      type: Boolean,
      required: false,
      default: false
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    },
    fieldFocus: {
      type: Boolean,
      required: false,
      default: false
    },
    modelValue: String
    // selection: {
    //   type: String,
    //   required: true,
    //   twoWay: true
    // }
  },
  computed: {
    matches () {
      return this.suggestions.filter((str) => {
        console.log('matches', str.indexOf(this.modelValue))
        return str.indexOf(this.modelValue) >= 0
      })
    },
    openSuggestion () {
      // console.log('openSuggestion', this.selection, this.matches.length, this.open)
      return this.modelValue !== '' &&
        this.matches.length !== 0 &&
        this.open === true
    }
  },
  beforeMount () {
    if (this.fieldFocus) {
      this.onFocus()
    }
  },
  methods: {
    closeSelect () {
      this.open = false
    },
    enter () {
      if (this.matches.length === 0) {
        if (this.addTag) {
          console.log('suggestInput. methods. enter. addTag:', this.modelValue)
          this.open = false
        } else {
          console.log('suggestInput. methods. enter. not selected:', this.modelValue)
        }
      } else {
        console.log('suggestInput. methods. enter. selected:', this.modelValue)
        this.$emit('update:modelValue', this.matches[this.current])
        this.$emit('enter-press')
        // this.modelValue = this.matches[this.current]
        // this.$emit('update-', this.modelValue)
        this.open = false
      }
    },
    up () {
      if (this.current > 0) {
        this.current--
      }
    },
    down () {
      if (this.current < this.matches.length - 1) {
        this.current++
      }
    },
    isActive (index) {
      // console.log('isActive. index:', index, 'current', this.current)
      return index === this.current
    },
    change (event) {
      console.log('suggestInput. methods. change. modelValue:', event.target.value)
      if (this.open === false) {
        this.open = true
        this.current = 0
      }
      this.$emit('update:modelValue', event.target.value)
    },
    onFocus () {
      if (this.matches > 1) {
        this.open = true
      } else if (this.matches === 1 && this.modelValue !== this.matches[0]) {
        this.open = true
      }
    },
    suggestionClick (index) {
      console.log('suggestionClick', this.modelValue, index)
      // this.selection = this.matches[index]
      this.$emit('update:modelValue', this.matches[index])
      this.open = false
    }
  }
}

</script>

<style scoped>
.form-control-local {
  display: block;
  width: 100%;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  box-shadow: inset 0 1px 1px rgba(0,0,0,.075);
  -webkit-transition: border-color ease-in-out .15s,-webkit-box-shadow ease-in-out .15s;
  -o-transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
}
.dropdown-menu-local {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  /*display: none;*/
  float: left;
  min-width: 160px;
  padding: 5px 0;
  margin: 2px 0 0;
  font-size: 14px;
  text-align: left;
  list-style: none;
  background-color: #fff;
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  /*border: 1px solid #ccc;*/
  border: 1px solid rgba(0,0,0,.15);
  border-radius: 4px;
  -webkit-box-shadow: 0 6px 12px rgba(0,0,0,.175);
  box-shadow: 0 6px 12px rgba(0,0,0,.175);
}
.active {
  background: #2c3e50;
}
.dropdown-menu-local__item {
  cursor: pointer;
  color: black;
}
</style>
