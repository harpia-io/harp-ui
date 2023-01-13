<template>
  <div v-if="isBlur" class="local-backdrop"></div>
</template>

<script>
export default {
  props: ['isBlur'],
  watch: {
    isBlur () {

    }
  }
}
</script>

<style scoped>
.local-backdrop {
  z-index: 6;
}
</style>
