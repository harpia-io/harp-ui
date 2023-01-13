<template>
  <div class="env__box">
    <button class="env__box-draggable button__svg">
      <svg width="10" height="16" viewbox="0 0 10 16" fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0H4V4H0V0Z" fill="#3C3C3C" />
        <path d="M0 6H4V10H0V6Z" fill="#3C3C3C" />
        <path d="M0 12H4V16H0V12Z" fill="#3C3C3C" />
        <path d="M6 0H10V4H6V0Z" fill="#3C3C3C" />
        <path d="M6 6H10V10H6V6Z" fill="#3C3C3C" />
        <path d="M6 12H10V16H6V12Z" fill="#3C3C3C" />
      </svg>
    </button>
    <div class="env__box-title">{{ env_name }}</div>
  </div>

</template>

<script>
export default {
  props: ['env_name', 'env_id']
}
</script>
