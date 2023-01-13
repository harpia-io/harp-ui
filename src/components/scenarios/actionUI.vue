<template>
    <div class="scenario__action-fields">
      <fieldset class="scenario-section__block-row-item">
        <legend>Action name</legend>
        <input type="text"
               name="action-name"
               placeholder="Name of the action"
               class="input__text input"
               :class="{'form-invalid': v$.actionDetails.action_name.$invalid}"
               @blur="v$.actionDetails.action_name.$touch"
               v-model="actionDetails.action_name"/>
        <span v-if="v$.actionDetails.action_name.minLength.$invalid"
              class="input form-validation-error"
        >{{ v$.actionDetails.action_name.minLength.$message }}</span>
      </fieldset>
      <fieldset class="scenario-section__block-row-item" id="impact3">
        <legend>Environment impact</legend>
        <input type="text" name="impact" placeholder="Environment impact"
               class="input__text input" v-model="actionDetails.environment_impact">
      </fieldset>
      <fieldset class="scenario-section__block-row-item">
        <legend>Comment</legend>
        <input type="text" name="description" placeholder="Description"
               class="input__text input" v-model="actionDetails.description">
      </fieldset>
    </div>
    <div class="scenario__action-fields">
      <!--Reserved section-->
      <fieldset class="scenario-section__block-row-item" id="risks2">
        <legend>Risks</legend>
        <input type="text" name="risks2" placeholder="Risks of unhandled notification"
               class="input__text input" v-model="actionDetails.risks">
      </fieldset>
<!--      <fieldset class="scenario-section__block-row-item" id="impact2">-->
<!--        <legend>Reserved field</legend>-->
<!--        <input type="text" name="impact" placeholder="Reserved field" class="input__text input">-->
<!--      </fieldset>-->
<!--      <fieldset class="scenario-section__block-row-item">-->
<!--        <legend>Reserved field</legend>-->
<!--        <input type="text" name="environment" placeholder="Reserved field" class="input__text input">-->
<!--      </fieldset>-->
    </div>
    <div class="scenario-section__block">
      <!--Action list-->
      <div class="scenario-section__block-row">
        <fieldset class="scenario-section__block-row-item full-width">
          <legend>Operator instructions</legend>
          <div v-for="(actionToCheck, index) in actionDetails.should_check" :key="index" class="scenario-section__block-row">
            <div class="scenario-section__block-row-item list-item-number">
              {{index + 1}}.
            </div>
            <input type="text" name="action" placeholder="Action to do"
                   class="input__text input"
                   v-model="actionDetails.should_check[index]"
            >
            <button
              @click="actionDetails.should_check.splice(index, 1)"
              class="scenario-section__block-row-delete-btn">
              <svg width="16" height="16" viewbox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.66797 0.96582H9.34204V1.41577H10.3077V0.902832C10.3079 0.405029 9.90308 0 9.40552 0H6.60449C6.10693 0 5.70215 0.405029 5.70215 0.902832V1.41577H6.66797V0.96582Z" fill="#3C3C3C"/>
                <path d="M12.5382 5.24219H3.47224C3.22382 5.24219 3.02827 5.4541 3.04829 5.70178L3.80622 15.0739C3.84846 15.597 4.28486 16 4.80915 16H11.2011C11.7254 16 12.1618 15.597 12.204 15.0737L12.962 5.70178C12.9821 5.4541 12.7866 5.24219 12.5382 5.24219ZM5.66743 15.0004C5.65729 15.001 5.64716 15.0013 5.63715 15.0013C5.38398 15.0013 5.17145 14.8042 5.15571 14.5481L4.68073 6.85413C4.66437 6.58789 4.86689 6.35876 5.133 6.34241C5.39826 6.32629 5.62836 6.52832 5.64472 6.79468L6.11958 14.4886C6.13605 14.7549 5.93354 14.9839 5.66743 15.0004ZM8.49348 14.5184C8.49348 14.785 8.27729 15.0012 8.01057 15.0012C7.74384 15.0012 7.52766 14.785 7.52766 14.5184V6.82434C7.52766 6.55762 7.74384 6.34143 8.01057 6.34143C8.27717 6.34143 8.49348 6.55762 8.49348 6.82434V14.5184ZM11.3297 6.85278L10.8762 14.5468C10.8612 14.8033 10.6483 15.0012 10.3946 15.0012C10.3851 15.0012 10.3754 15.001 10.3658 15.0005C10.0996 14.9847 9.89643 14.7562 9.91218 14.49L10.3655 6.7959C10.3812 6.52966 10.609 6.32654 10.8759 6.34229C11.1422 6.35791 11.3453 6.58655 11.3297 6.85278Z" fill="#3C3C3C"/>
                <path d="M14.2077 3.75195L13.8906 2.80127C13.807 2.55066 13.5724 2.38159 13.3081 2.38159H2.70152C2.43736 2.38159 2.20262 2.55066 2.11912 2.80127L1.80199 3.75195C1.74083 3.9353 1.82042 4.12231 1.96898 4.21558C2.02952 4.25354 2.10118 4.27637 2.17992 4.27637H13.8298C13.9086 4.27637 13.9803 4.25354 14.0408 4.21545C14.1893 4.12219 14.2689 3.93518 14.2077 3.75195Z" fill="#3C3C3C"/>
              </svg>
            </button>
          </div>
          <!--Add button-->
          <div class="scenario-section__block-row" id="add-operator-action-btn">
            <!--        <button @click="uiActions.push('')" class="scenario-section__block-row-item scenario-section__block-row-add-btn"> Add action </button>-->
            <button @click="actionDetails.should_check.push('')" class="button__edit button__add">
              <svg width="12" height="12" viewbox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.3051 6.09995C11.3051 6.59995 10.9051 6.99995 10.4051 6.99995H6.80508V10.4C6.80508 10.9 6.40508 11.3 5.90508 11.3C5.40508 11.3 5.00508 10.9 5.00508 10.4V6.99995H1.60508C1.10508 6.99995 0.705078 6.59995 0.705078 6.09995C0.705078 5.59995 1.10508 5.19995 1.60508 5.19995H5.00508V1.59995C5.00508 1.09995 5.40508 0.699951 5.90508 0.699951C6.40508 0.699951 6.80508 1.09995 6.80508 1.59995V5.19995H10.4051C10.9051 5.19995 11.3051 5.59995 11.3051 6.09995Z" fill="#00C284"/>
              </svg>
              Add item
            </button>
          </div>
        </fieldset>
      </div>
      <!--Recipients-->
      <div class="scenario-section__block-row">
        <div class="scenario-section__block-row-item">
          <div class="scenario-section__block-row-title">Recipients:</div>
        </div>
        <div class="scenario-section__block-row-item">
          <div class="scenario-section__block-row-list ">
            <name-form
              v-for="(name, index) in actionDetails.recipients" :key="index"
              :name="name"
              @update-item="actionDetails.recipients[index] = $event"
              @remove-item="actionDetails.recipients.splice(index, 1)"/>
<!--            />-->
<!--            <div class="assign-to__input" v-for="(email, index) in actionDetails.recipients" :key="index">-->
<!--              <input type="text" name="text" placeholder="Name" class="input__text input"-->
<!--                     v-model="actionDetails.recipients[index]">-->
<!--              <button class="remove" @click="actionDetails.recipients.splice(index, 1)">-->
<!--                <svg width="16" height="16" viewbox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--                  <path d="M6.66797 0.96582H9.34204V1.41577H10.3077V0.902832C10.3079 0.405029 9.90308 0 9.40552 0H6.60449C6.10693 0 5.70215 0.405029 5.70215 0.902832V1.41577H6.66797V0.96582Z" fill="white"/>-->
<!--                  <path d="M12.5382 5.24219H3.47224C3.22382 5.24219 3.02827 5.4541 3.04829 5.70178L3.80622 15.0739C3.84846 15.597 4.28486 16 4.80915 16H11.2011C11.7254 16 12.1618 15.597 12.204 15.0737L12.962 5.70178C12.9821 5.4541 12.7866 5.24219 12.5382 5.24219ZM5.66743 15.0004C5.65729 15.001 5.64716 15.0013 5.63715 15.0013C5.38398 15.0013 5.17145 14.8042 5.15571 14.5481L4.68073 6.85413C4.66437 6.58789 4.86689 6.35876 5.133 6.34241C5.39826 6.32629 5.62836 6.52832 5.64472 6.79468L6.11958 14.4886C6.13605 14.7549 5.93354 14.9839 5.66743 15.0004ZM8.49348 14.5184C8.49348 14.785 8.27729 15.0012 8.01057 15.0012C7.74384 15.0012 7.52766 14.785 7.52766 14.5184V6.82434C7.52766 6.55762 7.74384 6.34143 8.01057 6.34143C8.27717 6.34143 8.49348 6.55762 8.49348 6.82434V14.5184ZM11.3297 6.85278L10.8762 14.5468C10.8612 14.8033 10.6483 15.0012 10.3946 15.0012C10.3851 15.0012 10.3754 15.001 10.3658 15.0005C10.0996 14.9847 9.89643 14.7562 9.91218 14.49L10.3655 6.7959C10.3812 6.52966 10.609 6.32654 10.8759 6.34229C11.1422 6.35791 11.3453 6.58655 11.3297 6.85278Z" fill="white"/>-->
<!--                  <path d="M14.2077 3.75195L13.8906 2.80127C13.807 2.55066 13.5724 2.38159 13.3081 2.38159H2.70152C2.43736 2.38159 2.20262 2.55066 2.11912 2.80127L1.80199 3.75195C1.74083 3.9353 1.82042 4.12231 1.96898 4.21558C2.02952 4.25354 2.10118 4.27637 2.17992 4.27637H13.8298C13.9086 4.27637 13.9803 4.25354 14.0408 4.21545C14.1893 4.12219 14.2689 3.93518 14.2077 3.75195Z" fill="white"/>-->
<!--                </svg>-->
<!--              </button>-->
<!--            </div>-->
            <span v-if="v$.actionDetails.recipients.$invalid" class="input form-validation-error">
              At least one recipient should be in the list
            </span>
          </div>
        </div>
        <div class="scenario-section__block-row-item align-right">
          <button class="button__edit button__add" @click="actionDetails.recipients.push('')">
            <svg width="12" height="12" viewbox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.3051 6.09995C11.3051 6.59995 10.9051 6.99995 10.4051 6.99995H6.80508V10.4C6.80508 10.9 6.40508 11.3 5.90508 11.3C5.40508 11.3 5.00508 10.9 5.00508 10.4V6.99995H1.60508C1.10508 6.99995 0.705078 6.59995 0.705078 6.09995C0.705078 5.59995 1.10508 5.19995 1.60508 5.19995H5.00508V1.59995C5.00508 1.09995 5.40508 0.699951 5.90508 0.699951C6.40508 0.699951 6.80508 1.09995 6.80508 1.59995V5.19995H10.4051C10.9051 5.19995 11.3051 5.59995 11.3051 6.09995Z" fill="#00C284"/>
            </svg>
            Add
          </button>
        </div>
      </div>
    </div>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { minLength, required } from '@vuelidate/validators'
import NameForm from '@/components/forms/nameForm'
export default {
  components: { NameForm },
  props: ['actionName', 'time', 'actionObj'],
  emits: ['update:actionName', 'update:time'],
  computed: {
    actionDetails () {
      return this.actionObj
    }
  },
  data () {
    return {
      v$: useVuelidate()
    }
  },
  validations () {
    return {
      actionDetails: {
        action_name: { required, minLength: minLength(5) },
        recipients: { required, minLength: minLength(1) }
      }
    }
  }
}
</script>

<style scoped>
#risks {
  flex-grow: 4;
}
#risks2 {
  flex-grow: 3;
}
#impact {
  flex-grow: 1;
}
#impact2 {
  flex-grow: 2;
}
#add-operator-action-btn {
  padding-top: 12px;
}
#teams-id {
  width: 100%;
}
#whats-app-id {
  width: 100%;
}
#telegram-id {
  width: 100%;
}

.dropbtn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  margin: 20px 0;
  font-size: var(--s-regular);
  color: var(--c-accent);
}
.dropbtn svg {
  margin: 0 10px 0 0;
  transition: transform ease-out var(--a-transition-slow);
}
.dropbtn:hover svg {
  transform: rotate(90deg);
}
.dropbtn:hover {
  text-decoration: underline;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content button {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content button:hover {background-color: #f1f1f1}

.dropdown:hover .dropdown-content {
  display: block;
}

/*.dropdown:hover .dropbtn {*/
/*  background-color: #3e8e41;*/
/*}*/
</style>
