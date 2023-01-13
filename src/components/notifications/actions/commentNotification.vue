<template>
  <!-- popup code -->
  <div id="comment-notification" class="notification-action-popup__box notification-action-popup">
    <div class="popup__box-header">
      <h4 class="popup__box-title">Comment notification</h4>
      <button class="popup__box-close" @click="close">
        <svg width="15" height="14" viewbox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.87424 6.99995L14.715 1.54847C15.0951 1.19388 15.0951 0.620543 14.715 0.265947C14.335 -0.088649 13.7207 -0.088649 13.3408 0.265947L7.49993 5.71743L1.65922 0.265947C1.27911 -0.088649 0.665003 -0.088649 0.285078 0.265947C-0.0950259 0.620543 -0.0950259 1.19388 0.285078 1.54847L6.12579 6.99995L0.285078 12.4514C-0.0950259 12.806 -0.0950259 13.3794 0.285078 13.734C0.474418 13.9108 0.723371 13.9997 0.972147 13.9997C1.22092 13.9997 1.4697 13.9108 1.65922 13.734L7.49993 8.28248L13.3408 13.734C13.5303 13.9108 13.7791 13.9997 14.0279 13.9997C14.2767 13.9997 14.5254 13.9108 14.715 13.734C15.0951 13.3794 15.0951 12.806 14.715 12.4514L8.87424 6.99995Z"
            fill="#3C3C3C" />
        </svg>
      </button>
    </div>

    <div class="popup__box-main" style="height: unset">

      <fieldset>
        <textarea class="input input__area" placeholder="Write your comment that will be visible in alert history..." v-model="comment"></textarea>
        <span v-if="v$.comment.$invalid" class="input form-validation-error">
          The comment message is too short
        </span>
      </fieldset>

      <!-- popup buttons -->
      <div class="popup__box-buttons">
        <button class="button__large button__default close" @click="close">Close</button>
        <button class="button__large button__accent handle"
                @click="submit"
                :disabled="formInvalid"
                :class="{'button__accent': true, 'disabled': formInvalid}"
        >Comment</button>
      </div>

    </div>
  </div>
</template>

<script>
import { HIDE_COMMENT_DIALOG, COMMENT_NOTIFICATION } from '@/store/actions/notificationActions'
import { minLength, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
export default {
  data () {
    return {
      comment: '',
      v$: useVuelidate()
    }
  },
  computed: {
    formInvalid () {
      return this.v$.$invalid
    }
  },
  validations () {
    return {
      comment: {
        required,
        minLength: minLength(3)
      }
    }
  },
  methods: {
    close () {
      this.$store.commit(HIDE_COMMENT_DIALOG)
    },
    submit () {
      const body = {
        comment: this.comment
      }
      this.$store.dispatch(COMMENT_NOTIFICATION, body)
    }
  }
}
</script>

<style scoped>
#comment-notification {
  max-width: 750px;
}
.notification-action-popup {
  background: var(--c-white);
  margin: 20px;
}
.notification-action-popup__box {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--c-background);
  width: 100%;
  max-height: 100vh;
  z-index: 6;
}
.disabled {
  background-color: dimgrey;
}
</style>
