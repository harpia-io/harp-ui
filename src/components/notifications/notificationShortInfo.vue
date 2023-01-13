<template>
  <div class="time__info-box">
    <span>Action:</span>
    <p><b>{{ notification.notification_action }}</b> by <b>Admin</b> at {{ ts }}</p>
  </div>
  <div class="time__info-box">
    <span>Out:</span>
    <p>{{ notification.notification_output }}</p>
  </div>
</template>

<script>
export default {
  name: 'notification-overflow',
  props: ['notification', 'ts']
}
</script>
