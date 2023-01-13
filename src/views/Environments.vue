<template>

  <!-- center box -->
  <section class="wrapper center">

    <!-- testbox -->
    <div class="textbox"></div>

    <!-- popup code -->
    <div class="popup__box settings">
      <div class="popup__box-header">
        <h4 class="popup__box-title">Settings</h4>
        <button class="popup__box-close">
          <svg width="15" height="14" viewbox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.87424 6.99995L14.715 1.54847C15.0951 1.19388 15.0951 0.620543 14.715 0.265947C14.335 -0.088649 13.7207 -0.088649 13.3408 0.265947L7.49993 5.71743L1.65922 0.265947C1.27911 -0.088649 0.665003 -0.088649 0.285078 0.265947C-0.0950259 0.620543 -0.0950259 1.19388 0.285078 1.54847L6.12579 6.99995L0.285078 12.4514C-0.0950259 12.806 -0.0950259 13.3794 0.285078 13.734C0.474418 13.9108 0.723371 13.9997 0.972147 13.9997C1.22092 13.9997 1.4697 13.9108 1.65922 13.734L7.49993 8.28248L13.3408 13.734C13.5303 13.9108 13.7791 13.9997 14.0279 13.9997C14.2767 13.9997 14.5254 13.9108 14.715 13.734C15.0951 13.3794 15.0951 12.806 14.715 12.4514L8.87424 6.99995Z"
              fill="#3C3C3C" />
          </svg>
        </button>
      </div>

      <div class="popup__box-main">

        <!-- tabs -->
        <div class="tabs">
          <div class="tabs__bar">
            <button class="info">Info</button>
            <button class="env active">Env Settings</button>
            <button class="license">License</button>
            <button class="members">Members</button>
            <button class="integrations">Integrations</button>
            <button class="bots">Bots</button>
          </div>

          <div class="tabs__content">
            <!-- <div class="info">
                info
            </div> -->
            <div class="env active">
              <div class="tabs__box">

                <!-- BOX -->
                <div class="tabs__box-in">
                  <h4 class="tabs__box-title">Environments</h4>
                  <div class="tabs__box-content">
                    <draggable class="dragArea list-group w-full" :list="env_list" @change="log">
                      <div
                        class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
                        v-for="element in env_list"
                        :key="element.name"
                      >
                        <drag_object :env_name="element.name"
                        :env_id="element.id"/>
                      </div>
                    </draggable>

                    <button class="add__new">
                      <svg width="11" height="12" viewbox="0 0 11 12" fill="none"
                           xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M10.6 6.09995C10.6 6.59995 10.2 6.99995 9.7 6.99995H6.1V10.4C6.1 10.9 5.7 11.3 5.2 11.3C4.7 11.3 4.3 10.9 4.3 10.4V6.99995H0.9C0.4 6.99995 0 6.59995 0 6.09995C0 5.59995 0.4 5.19995 0.9 5.19995H4.3V1.59995C4.3 1.09995 4.7 0.699951 5.2 0.699951C5.7 0.699951 6.1 1.09995 6.1 1.59995V5.19995H9.7C10.2 5.19995 10.6 5.59995 10.6 6.09995Z"
                          fill="#00C284" />
                      </svg>
                      Add new environment
                    </button>

                  </div>
                </div>

                <!-- BOX -->
                <div class="tabs__box-in">
                  <h4 class="tabs__box-title">Alert columns</h4>
                  <div class="tabs__box-content">

                    <!-- environments box -->
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
                      <div class="env__box-title">Monitoring system</div>
                      <div class="env__box-settings">
                        <button class="env__box-view button__svg">
                          <svg width="16" height="10" viewbox="0 0 16 10" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M15.8805 4.68734C15.7377 4.52803 12.3026 0.78125 8.00002 0.78125C3.69745 0.78125 0.262328 4.52803 0.119484 4.68734C-0.0398281 4.86541 -0.0398281 5.13459 0.119484 5.31266C0.262328 5.47197 3.69752 9.21875 8.00002 9.21875C12.3025 9.21875 15.7377 5.47197 15.8805 5.31266C16.0398 5.13459 16.0398 4.86541 15.8805 4.68734ZM8.00002 8.28125C6.19092 8.28125 4.71877 6.80909 4.71877 5C4.71877 3.19091 6.19092 1.71875 8.00002 1.71875C9.80911 1.71875 11.2813 3.19091 11.2813 5C11.2813 6.80909 9.80911 8.28125 8.00002 8.28125Z"
                              fill="#3C3C3C" />
                            <path
                              d="M8.46875 4.0625C8.46875 3.59094 8.70284 3.17609 9.05897 2.92094C8.73941 2.75734 8.38297 2.65625 8 2.65625C6.70772 2.65625 5.65625 3.70772 5.65625 5C5.65625 6.29228 6.70772 7.34375 8 7.34375C9.157 7.34375 10.1146 6.49894 10.3038 5.39506C9.35987 5.69897 8.46875 4.98506 8.46875 4.0625Z"
                              fill="#3C3C3C" />
                          </svg>
                        </button>
                        <button class="env__box-edit button__svg">
                          <svg width="16" height="15" viewbox="0 0 16 15" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M1.63671 12.8682C1.57824 12.8098 1.52477 12.748 1.47557 12.6836C1.4381 12.6344 1.40319 12.5836 1.37133 12.5312L0.775867 14.2796C0.718616 14.4475 0.760853 14.6121 0.858753 14.7293C1.00255 14.8842 1.22264 14.9081 1.36888 14.8733L3.11632 14.2804C3.00341 14.2097 2.89745 14.1261 2.80077 14.0297L1.63671 12.8682Z"
                              fill="#3C3C3C" />
                            <path
                              d="M15.0657 2.0888C15.0657 2.0888 13.9962 1.03778 13.5759 0.654725C13.2632 0.386293 12.867 0.438417 12.6321 0.692079L11.9189 1.40753L14.2744 3.75775C14.2755 3.75884 14.2763 3.76007 14.2774 3.76116L14.3049 3.73382L15.0658 2.9743C15.3105 2.72992 15.3105 2.33319 15.0657 2.0888Z"
                              fill="#3C3C3C" />
                            <path
                              d="M11.2549 2.07007L9.95848 3.36414L12.3158 5.71606C12.3164 5.71667 12.3168 5.71716 12.3172 5.71765L13.6137 4.42346C13.6131 4.42285 13.6124 4.42236 13.6118 4.42163L11.2549 2.07007Z"
                              fill="#3C3C3C" />
                            <path
                              d="M4.32984 13.5675C4.44886 13.5275 4.56056 13.4602 4.6554 13.3655L11.6533 6.38025L9.29456 4.02686L2.2992 11.0096C2.20338 11.1051 2.13563 11.218 2.09535 11.338C1.99683 11.6323 2.06458 11.97 2.29932 12.2041L3.46339 13.3656C3.62806 13.5299 3.84376 13.6121 4.05933 13.6121C4.15089 13.6121 4.24232 13.5972 4.32984 13.5675Z"
                              fill="#3C3C3C" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <!-- environments box -->
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
                      <div class="env__box-title">Name</div>
                      <div class="env__box-settings">
                        <button class="env__box-view button__svg">
                          <svg width="16" height="10" viewbox="0 0 16 10" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M15.8805 4.68734C15.7377 4.52803 12.3026 0.78125 8.00002 0.78125C3.69745 0.78125 0.262328 4.52803 0.119484 4.68734C-0.0398281 4.86541 -0.0398281 5.13459 0.119484 5.31266C0.262328 5.47197 3.69752 9.21875 8.00002 9.21875C12.3025 9.21875 15.7377 5.47197 15.8805 5.31266C16.0398 5.13459 16.0398 4.86541 15.8805 4.68734ZM8.00002 8.28125C6.19092 8.28125 4.71877 6.80909 4.71877 5C4.71877 3.19091 6.19092 1.71875 8.00002 1.71875C9.80911 1.71875 11.2813 3.19091 11.2813 5C11.2813 6.80909 9.80911 8.28125 8.00002 8.28125Z"
                              fill="#3C3C3C" />
                            <path
                              d="M8.46875 4.0625C8.46875 3.59094 8.70284 3.17609 9.05897 2.92094C8.73941 2.75734 8.38297 2.65625 8 2.65625C6.70772 2.65625 5.65625 3.70772 5.65625 5C5.65625 6.29228 6.70772 7.34375 8 7.34375C9.157 7.34375 10.1146 6.49894 10.3038 5.39506C9.35987 5.69897 8.46875 4.98506 8.46875 4.0625Z"
                              fill="#3C3C3C" />
                          </svg>
                        </button>
                        <button class="env__box-edit button__svg">
                          <svg width="16" height="15" viewbox="0 0 16 15" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M1.63671 12.8682C1.57824 12.8098 1.52477 12.748 1.47557 12.6836C1.4381 12.6344 1.40319 12.5836 1.37133 12.5312L0.775867 14.2796C0.718616 14.4475 0.760853 14.6121 0.858753 14.7293C1.00255 14.8842 1.22264 14.9081 1.36888 14.8733L3.11632 14.2804C3.00341 14.2097 2.89745 14.1261 2.80077 14.0297L1.63671 12.8682Z"
                              fill="#3C3C3C" />
                            <path
                              d="M15.0657 2.0888C15.0657 2.0888 13.9962 1.03778 13.5759 0.654725C13.2632 0.386293 12.867 0.438417 12.6321 0.692079L11.9189 1.40753L14.2744 3.75775C14.2755 3.75884 14.2763 3.76007 14.2774 3.76116L14.3049 3.73382L15.0658 2.9743C15.3105 2.72992 15.3105 2.33319 15.0657 2.0888Z"
                              fill="#3C3C3C" />
                            <path
                              d="M11.2549 2.07007L9.95848 3.36414L12.3158 5.71606C12.3164 5.71667 12.3168 5.71716 12.3172 5.71765L13.6137 4.42346C13.6131 4.42285 13.6124 4.42236 13.6118 4.42163L11.2549 2.07007Z"
                              fill="#3C3C3C" />
                            <path
                              d="M4.32984 13.5675C4.44886 13.5275 4.56056 13.4602 4.6554 13.3655L11.6533 6.38025L9.29456 4.02686L2.2992 11.0096C2.20338 11.1051 2.13563 11.218 2.09535 11.338C1.99683 11.6323 2.06458 11.97 2.29932 12.2041L3.46339 13.3656C3.62806 13.5299 3.84376 13.6121 4.05933 13.6121C4.15089 13.6121 4.24232 13.5972 4.32984 13.5675Z"
                              fill="#3C3C3C" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <!-- environments box -->
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
                      <div class="env__box-title">Description</div>
                      <div class="env__box-settings">
                        <button class="env__box-view button__svg">
                          <svg width="16" height="10" viewbox="0 0 16 10" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M15.8805 4.68734C15.7377 4.52803 12.3026 0.78125 8.00002 0.78125C3.69745 0.78125 0.262328 4.52803 0.119484 4.68734C-0.0398281 4.86541 -0.0398281 5.13459 0.119484 5.31266C0.262328 5.47197 3.69752 9.21875 8.00002 9.21875C12.3025 9.21875 15.7377 5.47197 15.8805 5.31266C16.0398 5.13459 16.0398 4.86541 15.8805 4.68734ZM8.00002 8.28125C6.19092 8.28125 4.71877 6.80909 4.71877 5C4.71877 3.19091 6.19092 1.71875 8.00002 1.71875C9.80911 1.71875 11.2813 3.19091 11.2813 5C11.2813 6.80909 9.80911 8.28125 8.00002 8.28125Z"
                              fill="#3C3C3C" />
                            <path
                              d="M8.46875 4.0625C8.46875 3.59094 8.70284 3.17609 9.05897 2.92094C8.73941 2.75734 8.38297 2.65625 8 2.65625C6.70772 2.65625 5.65625 3.70772 5.65625 5C5.65625 6.29228 6.70772 7.34375 8 7.34375C9.157 7.34375 10.1146 6.49894 10.3038 5.39506C9.35987 5.69897 8.46875 4.98506 8.46875 4.0625Z"
                              fill="#3C3C3C" />
                          </svg>
                        </button>
                        <button class="env__box-edit button__svg">
                          <svg width="16" height="15" viewbox="0 0 16 15" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                            <path
                              d="M1.63671 12.8682C1.57824 12.8098 1.52477 12.748 1.47557 12.6836C1.4381 12.6344 1.40319 12.5836 1.37133 12.5312L0.775867 14.2796C0.718616 14.4475 0.760853 14.6121 0.858753 14.7293C1.00255 14.8842 1.22264 14.9081 1.36888 14.8733L3.11632 14.2804C3.00341 14.2097 2.89745 14.1261 2.80077 14.0297L1.63671 12.8682Z"
                              fill="#3C3C3C" />
                            <path
                              d="M15.0657 2.0888C15.0657 2.0888 13.9962 1.03778 13.5759 0.654725C13.2632 0.386293 12.867 0.438417 12.6321 0.692079L11.9189 1.40753L14.2744 3.75775C14.2755 3.75884 14.2763 3.76007 14.2774 3.76116L14.3049 3.73382L15.0658 2.9743C15.3105 2.72992 15.3105 2.33319 15.0657 2.0888Z"
                              fill="#3C3C3C" />
                            <path
                              d="M11.2549 2.07007L9.95848 3.36414L12.3158 5.71606C12.3164 5.71667 12.3168 5.71716 12.3172 5.71765L13.6137 4.42346C13.6131 4.42285 13.6124 4.42236 13.6118 4.42163L11.2549 2.07007Z"
                              fill="#3C3C3C" />
                            <path
                              d="M4.32984 13.5675C4.44886 13.5275 4.56056 13.4602 4.6554 13.3655L11.6533 6.38025L9.29456 4.02686L2.2992 11.0096C2.20338 11.1051 2.13563 11.218 2.09535 11.338C1.99683 11.6323 2.06458 11.97 2.29932 12.2041L3.46339 13.3656C3.62806 13.5299 3.84376 13.6121 4.05933 13.6121C4.15089 13.6121 4.24232 13.5972 4.32984 13.5675Z"
                              fill="#3C3C3C" />
                          </svg>
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </div>
            <!-- <div class="license">
                license
            </div>
            <div class="members">
                members
            </div>
            <div class="integrations">
                integrations
            </div> -->
          </div>
        </div>
        <!-- end tabs -->

        <!-- popup buttons -->
        <div class="popup__box-buttons">
          <button class="button__large button__default close">Close</button>
          <button class="button__large button__accent save">Save</button>
        </div>
      </div>
    </div>

  </section>
</template>

<script>
import { defineComponent } from 'vue'
const path = require('path')
import { VueDraggableNext } from 'vue-draggable-next'
import DragObject from '@/components/environment_box'
import { dataFetcher } from '@/mixins/dataFetcher'

export default defineComponent({
  components: {
    draggable: VueDraggableNext,
    drag_object: DragObject
  },
  mixins: [dataFetcher],
  data () {
    return {
      enabled: true,
      env_list: [
        { name: 'Nova', id: 1 },
        { name: 'Harp', id: 2 },
        { name: 'home', id: 3 },
        { name: 'street', id: 4 },
        { name: 'clock', id: 5 }
      ],
      env_dict: null,
      dragging: false
    }
  },
  created () {
    this.fetchUserData()
  },
  methods: {
    log () {
      console.log('order_changed')
    },
    async fetchUserData () {
      const results = await this.fetchData('/environments/client/all')
      if (results[0] === 200) {
        this.env_list = results[1]
      }
    }
  }
})
</script>

