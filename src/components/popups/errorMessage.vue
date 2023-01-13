<template>
<!--  <div class="error-modal-content">-->
<!--    <div class="error-modal-header dialog-header-error">-->
<!--      <button type="button" class="close" ng-click="close()">×</button>-->
<!--      <h4 class="error-modal-title text-danger"><span class="glyphicon glyphicon-warning-sign"></span> Error</h4>-->
<!--    </div>-->
<!--    <div class="error-modal-body text-danger ng-binding" ng-bind-html-unsafe="msg">This is my error message</div>-->
<!--    <div class="error-modal-footer">-->
<!--      <button type="button" class="btn btn-primary" ng-click="close()">Close</button>-->
<!--    </div>-->
<!--  </div>-->
  <div class="global-message">
    <div class="popup__box-header">
      <h4 class="popup__box-title alert-title">Error</h4>
      <button class="popup__box-close" @click="closeErrorDialog">
        <svg width="15" height="14" viewbox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.87424 6.99995L14.715 1.54847C15.0951 1.19388 15.0951 0.620543 14.715 0.265947C14.335 -0.088649 13.7207 -0.088649 13.3408 0.265947L7.49993 5.71743L1.65922 0.265947C1.27911 -0.088649 0.665003 -0.088649 0.285078 0.265947C-0.0950259 0.620543 -0.0950259 1.19388 0.285078 1.54847L6.12579 6.99995L0.285078 12.4514C-0.0950259 12.806 -0.0950259 13.3794 0.285078 13.734C0.474418 13.9108 0.723371 13.9997 0.972147 13.9997C1.22092 13.9997 1.4697 13.9108 1.65922 13.734L7.49993 8.28248L13.3408 13.734C13.5303 13.9108 13.7791 13.9997 14.0279 13.9997C14.2767 13.9997 14.5254 13.9108 14.715 13.734C15.0951 13.3794 15.0951 12.806 14.715 12.4514L8.87424 6.99995Z"
            fill="#3C3C3C" />
        </svg>
      </button>
    </div>

    <div class="alert-body-box">
<!--      <div class="alert">-->
        <div class="alert__title">
          {{ message }}
<!--        </div>-->
      </div>
    </div>
    <!-- popup buttons -->
    <div class="error-buttons">
      <button
        class="error-button button__accent"
        type="submit"
        @click="closeErrorDialog"
      >Close</button>
    </div>
  </div>
</template>

<script>
import { CLOSE_ERROR } from '@/store/actions/errorHandler'

export default {
  props: ['message'],
  methods: {
    closeErrorDialog () {
      this.$store.commit(CLOSE_ERROR)
    }
  }
}
</script>

<style scoped>
/*!* Fix for Bootstrap 3 with Angular UI Bootstrap *!*/

/*.dialog-header-error { background-color: #d2322d; }*/
/*.dialog-header-wait { background-color: #428bca; }*/
/*.dialog-header-notify { background-color: #eeeeee; }*/
/*.dialog-header-confirm { background-color: #333333; }*/
/*.dialog-header-error span, .dialog-header-error h4,*/
/*.dialog-header-wait span, .dialog-header-wait h4,*/
/*.dialog-header-confirm span, .dialog-header-confirm h4 { color: #ffffff; }*/
.global-message {
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  /*border-radius: 8px;*/
  position: absolute;
  background: var(--c-red);
  max-width: 700px;
  min-width: 400px;
  height: 300px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;

}
.alert-title {
  color: red;
  flex-grow: 1;
  width: 100%;
  text-align: center;
}
.alert-body-box {
  background: var(--c-white);
  padding: 20px;
  border-radius: var(--r-radius);
  margin: 0 20px;
  margin-top: 30px;
  height: 110px;
}
.error-button {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--s-regular-large);
  font-weight: var(--w-medium);
  color: var(--c-white);
  /*border-radius: var(--r-radius);*/
  background: var(--c-accent);
  padding: 10px 40px;
  width: 100%;
  transition: background ease-out var(--a-transition-fast);
}

.error-buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 20px;
}

</style>
