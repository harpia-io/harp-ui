const stopProp = function (event) {
  event.stopPropagation()
}
export default {
  name: 'click-outside',
  mounted (el, binding) {
    binding.event = function (event) {
    }
    el.addEventListener('click', stopProp)
    document.body.addEventListener('click', binding.value)
  },
  unmounted (el, binding) {
    el.removeEventListener('click', stopProp)
    document.body.removeEventListener('click', binding.value)
  }
}
