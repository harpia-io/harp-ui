const getTemplate = (data = [], placeholder, selectedId) => {
  let text = placeholder ?? 'Choose value'
  const items = data.map(item => {
    // console.log('select.js getTemplate item:', item, 'selectedId', selectedId)
    let cls = ''
    if (item.id === selectedId) {
      text = item.value
      cls = 'selected'
    }
    return `
      <li class="select__item ${cls}" data-type="item" data-id="${item.id}">
        <div class="select__item_container" data-type="item-container" data-id="${item.id}">
          ${item.value}
        </div>
      </li>
    `
  })
  // console.log(selected)
  return `
    <div class="select__backdrop" data-type="backdrop"></div>
    <div class="select__input" data-type="input">
      <span data-type="value">${text}</span>
      <i class="select__input_filter_status_icon" id="filter-status-icon" aria-hidden="true"></i>
      <i class="fa fa-chevron-down" data-type="arrow"></i>
    </div>
    <div class="select__dropdown">
      <ul class="select__list">
        ${items.join('')}
      </ul>
    </div>
  `
}

export class TimeSelector {
  constructor (selector, options) {
    this.$el = document.querySelector(selector)
    this.options = options
    this.unselectOptionEnabled = false
    this.selectedId = options.selectedId
    this.render()
    this.setup()
  }

  render () {
    const { placeholder, data } = this.options
    this.$el.classList.add('select')
    this.$el.innerHTML = getTemplate(data, placeholder, this.selectedId)
  }

  setup () {
    this.clickHandler = this.clickHandler.bind(this)
    this.$el.addEventListener('click', this.clickHandler)
    this.$arrow = this.$el.querySelector('[data-type="arrow"]')
    this.$value = this.$el.querySelector('[data-type="value"]')
  }

  clickHandler (event) {
    const { type } = event.target.dataset
    // console.log('select.js clickHandler event:', type)
    if (type === 'input' || type === 'value' || type === 'arrow') {
      this.toggle()
    } else if (type === 'item' || type === 'item-icon' || type === 'item-container') {
      const id = event.target.dataset.id
      this.select(id)
    } else if (type === 'backdrop') {
      this.close()
    }
  }

  get isOpen () {
    return this.$el.classList.contains('open')
  }

  get current () {
    console.log('select.js current selectedId:', this.selectedId)
    return this.options.data.find(item => item.id === this.selectedId)
  }

  select (id) {
    const previousSelectedID = this.selectedId
    this.selectedId = id
    const isCurrent = this.current
    if (!isCurrent) {
      console.log('select.js select current value is undefined. selectedId:', this.selectedId)
      this.$value.textContent = this.options.placeholder
      this.$el.querySelectorAll('[data-type="item"]').forEach(el => {
        el.classList.remove('selected')
      })
      this.$el.querySelector('#filter-status-icon').classList.add('placeholder')
      return
    }
    console.log('select.js select. id:', id, 'current', isCurrent.id, 'previousId', previousSelectedID)
    if (id !== previousSelectedID) {
      // console.log('select.js select. id === previousId: false')
      // console.log('select.js select. el:', this.$el)
      this.$value.textContent = isCurrent.value
      this.$el.querySelectorAll('[data-type="item"]').forEach(el => {
        el.classList.remove('selected')
      })
      const filterIconEl = this.$el.querySelector('#filter-status-icon')
      filterIconEl.classList.remove('placeholder')
      this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected')
      this.options.onSelect(isCurrent)
    } else {
      if (this.unselectOptionEnabled) {
        // console.log('select.js select. id === previousId: true')
        this.$value.textContent = this.options.placeholder
        this.$el.querySelectorAll('[data-type="item"]').forEach(el => {
          el.classList.remove('selected')
        })
        this.$el.querySelector('#filter-status-icon').classList.add('placeholder')
        this.options.onSelect({ id: 'null', value: 'None' })
        this.selectedId = 'null'
      }
    }
    this.close()
  }

  toggle () {
    this.isOpen ? this.close() : this.open()
  }

  open () {
    this.$el.classList.add('open')
    this.$arrow.classList.remove('fa-chevron-down')
    this.$arrow.classList.add('fa-chevron-up')
    // this.$backdrop
  }

  close () {
    this.$el.classList.remove('open')
    this.$arrow.classList.add('fa-chevron-down')
    this.$arrow.classList.remove('fa-chevron-up')
  }

  destroy () {
    this.$el.removeEventListener('click', this.clickHandler)
    this.$el.innerHTML = ''
  }
}
