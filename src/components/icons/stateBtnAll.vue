<template>
  <button class="button__text-icon"
          :class="{
             red: severity(3),
             yellow: severity(2),
             green: severity(1)}"
  >
    All
    {{ count }}
  </button>
</template>

<script>
export default {
  props: ['count', 'colorId'],
  methods: {
    severity (id) {
      return this.colorId === id
    }
  }
}
</script>

<style scoped>

</style>
