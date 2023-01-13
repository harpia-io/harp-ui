<template>
  <div style="position:relative;"
       :style="{width: maxLength + 'px', 'max-width': maxWidth, 'min-width': minWidth}">
    <!--    changes started-->
    <input class="form-control-local" type="text" v-click-outside="updateIsFocused"
           v-model="selection"
           @keydown.enter = 'enter'
           @keydown.down = 'down'
           @keydown.up = 'up'
           @input = 'change'
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
    'enter-press'
  ],

  data () {
    return {
      open: false,
      current: 0,
      selection: '',
      selected: '',
      isFocused: false
      // labelsWidth: 400/
    }
  },
  props: {
    suggestions: {
      type: Array,
      required: true
    },
    // selected: {
    //   type: String,
    //   required: false,
    //   default: ''
    // },
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
    minWidth: {
      type: String,
      required: false,
      default: '120px'
    },
    maxWidth: {
      type: String,
      required: false,
      default: '400px'
    }
  },
  computed: {
    matches () {
      return this.suggestions.filter((str) => {
        // console.log('matches', str.indexOf(this.selection))
        return str.indexOf(this.selection) >= 0
      })
    },
    maxLength () {
      let maxLength = 0
      this.matches.forEach(label => {
        console.log('suggestInput. maxLabelLength. maxLength:', maxLength, 'label:', label)
        if (label.length > maxLength) {
          maxLength = label.length
        }
      })
      console.log('suggestInput. maxLength:', maxLength)
      return maxLength * 8
    },
    openSuggestion () {
      // console.log('suggestInput. openSuggestion', this.selection, this.matches.length, this.open)
      return this.open === true
      // this.selection !== '' &&
      // this.matches.length !== 0 &&
    }
  },
  beforeMount () {
    // this.labelsWidth = this.maxLabelLength() * 8
    // console.log('suggestInput. beforeMount. labelsWidth:', this.labelsWidth)
    this.selection = this.selected
  },
  methods: {
    closeSelect () {
      console.log('suggestInput. methods. closeSelect')
      if (!this.isFocused) {
        this.open = false
      }
    },
    updateIsFocused () {
      this.isFocused = false
    },
    enter () {
      // console.log('enter key pressed')
      if (this.matches.length === 0) {
        if (this.addTag) {
          // console.log('suggestInput. methods. enter. addTag:', this.selection)
          this.$emit('enter-press', this.selection)
          this.open = false
        } else {
          // console.log('suggestInput. methods. enter. not selected:', this.selection)
        }
      } else {
        // console.log('suggestInput. methods. enter. selected:', this.selection)
        // this.$emit('update:modelValue', this.matches[this.current])
        this.selection = this.matches[this.current]
        this.$emit('enter-press', this.selection)

        // this.modelValue = this.matches[this.current]
        // this.$emit('update-', this.modelValue)
        this.open = false
      }
    },
    up () {
      // console.log('up key pressed')
      if (this.current > 0) {
        this.current--
      }
    },
    down () {
      // console.log('down key pressed')
      if (this.current < this.matches.length - 1) {
        this.current++
      }
    },
    isActive (index) {
      // console.log('isActive. index:', index, 'current', this.current)
      return index === this.current
    },
    change (event) {
      // console.log('change. selection:', this.selection)
      if (this.open === false) {
        this.open = true
        this.current = 0
      }
      // this.$emit('update:modelValue', event.target.value)
    },
    onFocus () {
      // console.log('suggestInput. methods. onFocus. open:', this.open, 'matches', this.matches)
      if (this.matches.length > 0) {
        this.open = true
      } else if (this.matches === 1 && this.selection !== this.matches[0]) {
        this.open = true
      }
      this.isFocused = true
      // console.log('suggestInput. methods. onFocus. open:', this.open, 'isFocused', this.isFocused)
    },
    suggestionClick (index) {
      // console.log('suggestionClick. methods. suggestionClick. selection:', this.selection, 'index', index)
      this.selection = this.matches[index]
      this.$emit('enter-press', this.selection)
      // this.selection = this.matches[index]
      // this.$emit('update:modelValue', this.matches[index])
      this.open = false
    }
    // maxLabelLength () {
    //   let maxLength = 0
    //   this.matches.forEach(label => {
    //     console.log('suggestInput. maxLabelLength. maxLength:', maxLength, 'label:', label)
    //     if (label.length > maxLength) {
    //       maxLength = label.length
    //     }
    //   })
    //   return maxLength
    // }
  }
}

</script>

<style scoped>
.form-control-local {
  display: block;
  width: 100%;
  height: 18px;
  padding: 2px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #cfdfec;
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
  /*padding: 5px 2px;*/
  /*margin: 2px 0 0;*/
  font-size: 14px;
  text-align: left;
  list-style: none;
  background-color: #fff;
  -webkit-background-clip: padding-box;
  background-clip: padding-box;
  /*border: 1px solid #ccc;*/
  border-radius: 4px;
  -webkit-box-shadow: 0 6px 12px rgba(0,0,0,.175);
  box-shadow: 0 6px 12px rgba(0,0,0,.175);
  max-height: 600px;
  overflow-y: auto;
}
.active {
  background: #c3c3c3;;
  border-radius: 4px;
}
.dropdown-menu-local__item {
  cursor: pointer;
  padding: 5px 10px 7px;
  color: black;
}
.dropdown-menu-local__item:hover {
  background-color: #f1f1f1;
}
</style>
