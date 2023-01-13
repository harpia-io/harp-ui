<template>
  <div class="popup__box-header">
    <h4 class="popup__box-title">{{ title }}</h4>
    <button class="popup__box-close">
      <icon-popup-close @click="$emit('close')"></icon-popup-close>
    </button>
  </div>
  <div class="popup__box-main">
    <slot></slot>
  </div>
</template>

<script>
import IconPopupClose from '@/components/icons/iconPopupClose'
export default {
  components: { IconPopupClose },
  props: ['title'],
  watch: {
    isBlur () {

    }
  }
}
</script>
