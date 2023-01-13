<template>
  <div
    class="update-msg-popup"
    :class="{ok: loadingObj.status === 0, error: loadingObj.status === 1}"
  >
    <div class="update-msg-popup__resource">
      {{loadingId}}: {{ loadingObj.remoteResource }}
    </div>
    <div class="update-msg-popup__message">
      {{ loadingObj.message }}
    </div>
    <button
      class="update-msg-popup__button"
      @click="closePopup">
      Close
    </button>
  </div>
</template>

<script>
import { REMOVE_LOADING_ITEM } from '@/store/actions/remoteActions'

export default {
  props: {
    loadingObj: Object,
    loadingId: String
  },
  data () {
    return {
    }
  },
  methods: {
    closePopup () {
      this.$store.commit(REMOVE_LOADING_ITEM, this.loadingId)
    }
  }
}
</script>

<style scoped>
.update-msg-popup {
  border-width: 2px;
  border-style: solid;
  border-color: #565656;
  border-radius: var(--r-radius);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 4;
  margin: 5px;
  padding: 5px;
  background: #3abb3a;
  color: white;
}
.update-msg-popup.ok {
  background: #3abb3a;
}

.update-msg-popup.error {
  background: red;
}

.update-msg-popup__resource {
  margin: 2px;
  padding: 2px;
  height: 20px;
  align-content: center;
}
.update-msg-popup__message {
  margin: 2px;
  padding: 2px;
  height: 30px;
  align-content: center;
}
.update-msg-popup__button {
  background: #9CA2AC;
}
</style>
