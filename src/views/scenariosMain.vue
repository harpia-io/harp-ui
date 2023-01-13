<template>
  <div class="app-block__main-body">
    <div class="scenarios-main">

      <!-- header -->
      <div class="tabs__box">
        <!-- left -->
        <div class="tabs__box-in">
          <div class="search__box">
            <input type="search" name="search" placeholder="Search"
                   class="input__search input" v-model="search">
            <button type="submit">
              <svg width="16" height="16" viewbox="0 0 16 16" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M7.3548 2.22577C4.52211 2.22577 2.22577 4.52211 2.22577 7.3548C2.22577 10.1875 4.52211 12.4838 7.3548 12.4838C10.1875 12.4838 12.4838 10.1875 12.4838 7.3548C12.4838 4.52211 10.1875 2.22577 7.3548 2.22577ZM0.225769 7.3548C0.225769 3.41755 3.41755 0.225769 7.3548 0.225769C11.2921 0.225769 14.4838 3.41755 14.4838 7.3548C14.4838 9.12768 13.8367 10.7494 12.7657 11.9966L15.3477 14.5786L13.9334 15.9928L11.2604 13.3198C10.1386 14.0558 8.79671 14.4838 7.3548 14.4838C3.41755 14.4838 0.225769 11.2921 0.225769 7.3548Z"
                      fill="#9CA2AC" />
              </svg>
            </button>
          </div>
        </div>
        <!-- right -->
        <div class="tabs__box-in">
          <button class="add__new" style="margin: 0 0 0 auto;"
                  @click="$router.push({
                name: 'Scenario edit',
                params: {scenarioId: 'new'}})"
          >
            <svg width="11" height="12" viewbox="0 0 11 12" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.6 6.09995C10.6 6.59995 10.2 6.99995 9.7 6.99995H6.1V10.4C6.1 10.9 5.7 11.3 5.2 11.3C4.7 11.3 4.3 10.9 4.3 10.4V6.99995H0.9C0.4 6.99995 0 6.59995 0 6.09995C0 5.59995 0.4 5.19995 0.9 5.19995H4.3V1.59995C4.3 1.09995 4.7 0.699951 5.2 0.699951C5.7 0.699951 6.1 1.09995 6.1 1.59995V5.19995H9.7C10.2 5.19995 10.6 5.59995 10.6 6.09995Z"
                fill="#00C284" />
            </svg>
            Add scenario
          </button>
        </div>
      </div>

      <!-- main -->
      <div class="scenario__main">
        <table class="scenarios-table">
          <thead>
          <tr>
            <th style="width: 3%"><button class="button__transparent flex-1">#</button></th>
            <th style="width: 18%"><button class="button__transparent active flex-10">Scenario name</button></th>
            <th class="scenarios-table__badge"><button class="button__transparent flex-4">UI</button></th>
            <th class="scenarios-table__badge"><button class="button__transparent flex-4">Email</button></th>
            <th class="scenarios-table__badge"><button class="button__transparent flex-4">Teams</button></th>
            <th class="scenarios-table__badge"><button class="button__transparent flex-4">Jira</button></th>
            <th class="scenarios-table__badge"><button class="button__transparent flex-4">Telegram</button></th>
            <th class="scenarios-table__badge"><button class="button__transparent flex-4">Signl4</button></th>
            <th class="scenarios-table__badge"><button class="button__transparent flex-4">PagerDuty</button></th>
            <th class="scenarios-table__badge"><button class="button__transparent flex-4">SMS</button></th>
            <th class="scenarios-table__badge"><button class="button__transparent flex-4">Voice</button></th>
            <th class="scenarios-table__badge"><button class="button__transparent flex-4">Slack</button></th>
            <th class="scenarios-table__badge"><button class="button__transparent flex-4">Teams</button></th>
            <th class="scenarios-table__badge"><button class="button__transparent flex-4">Webhook</button></th>
            <th style="width: 15%"><button class="button__transparent flex-5">Updated by</button></th>
            <th style="width: 14%"><button class="button__transparent flex-5">Update TS</button></th>
            <th style="width: 10%"><button class="button__transparent flex-5">Actions</button></th>
          </tr>
          </thead>
          <tbody>
            <loading-spinner height="500px" v-if="loading"></loading-spinner>
            <tr v-else v-for="(scenarioObj, index) in scenariosList" :key="index">
              <!--Index-->
              <td style="width: 3%"><div class="scenario__box-num">{{ index + 1}}</div></td>
              <!--Environment name-->
              <td style="width: 15%"><div class="scenario__box-name">{{ scenarioObj.scenario_name }}</div></td>
              <!--Badge UI-->
              <td class="scenarios-table__badge">
                <div class="scenario__box-status">
                  <div v-if="scenarioObj.scenario_channels.ui">
                    <svg width="16" height="16" viewbox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 0C3.58897 0 0 3.58897 0 8C0 12.411 3.58897 16 8 16C12.411 16 16 12.411 16 8C16 3.58897 12.411 0 8 0ZM12.4712 5.89474L7.3584 10.9674C7.05764 11.2682 6.57644 11.2882 6.25564 10.9875L3.54887 8.5213C3.22807 8.22055 3.20802 7.7193 3.48872 7.3985C3.78947 7.07769 4.29073 7.05764 4.61153 7.3584L6.75689 9.32331L11.3283 4.75188C11.6491 4.43108 12.1504 4.43108 12.4712 4.75188C12.792 5.07268 12.792 5.57393 12.4712 5.89474Z" fill="#00C284"/>
                    </svg>
                  </div>
                </div>
              </td>
              <!--Badge Email-->
              <td class="scenarios-table__badge">
                <div class="scenario__box-status">
                  <div v-if="scenarioObj.scenario_channels.email">
                    <svg width="16" height="16" viewbox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 0C3.58897 0 0 3.58897 0 8C0 12.411 3.58897 16 8 16C12.411 16 16 12.411 16 8C16 3.58897 12.411 0 8 0ZM12.4712 5.89474L7.3584 10.9674C7.05764 11.2682 6.57644 11.2882 6.25564 10.9875L3.54887 8.5213C3.22807 8.22055 3.20802 7.7193 3.48872 7.3985C3.78947 7.07769 4.29073 7.05764 4.61153 7.3584L6.75689 9.32331L11.3283 4.75188C11.6491 4.43108 12.1504 4.43108 12.4712 4.75188C12.792 5.07268 12.792 5.57393 12.4712 5.89474Z" fill="#00C284"/>
                    </svg>
                  </div>
                </div>
              </td>
              <!--Badge Teams-->
              <td class="scenarios-table__badge">
                <div class="scenario__box-status">
                  <div v-if="scenarioObj.scenario_channels.teams">
                    <svg width="16" height="16" viewbox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 0C3.58897 0 0 3.58897 0 8C0 12.411 3.58897 16 8 16C12.411 16 16 12.411 16 8C16 3.58897 12.411 0 8 0ZM12.4712 5.89474L7.3584 10.9674C7.05764 11.2682 6.57644 11.2882 6.25564 10.9875L3.54887 8.5213C3.22807 8.22055 3.20802 7.7193 3.48872 7.3985C3.78947 7.07769 4.29073 7.05764 4.61153 7.3584L6.75689 9.32331L11.3283 4.75188C11.6491 4.43108 12.1504 4.43108 12.4712 4.75188C12.792 5.07268 12.792 5.57393 12.4712 5.89474Z" fill="#00C284"/>
                    </svg>
                  </div>
                </div>
              </td>
              <!--Jira Teams-->
              <td class="scenarios-table__badge">
                <div class="scenario__box-status">
                  <div v-if="scenarioObj.scenario_channels.jira">
                    <svg width="16" height="16" viewbox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 0C3.58897 0 0 3.58897 0 8C0 12.411 3.58897 16 8 16C12.411 16 16 12.411 16 8C16 3.58897 12.411 0 8 0ZM12.4712 5.89474L7.3584 10.9674C7.05764 11.2682 6.57644 11.2882 6.25564 10.9875L3.54887 8.5213C3.22807 8.22055 3.20802 7.7193 3.48872 7.3985C3.78947 7.07769 4.29073 7.05764 4.61153 7.3584L6.75689 9.32331L11.3283 4.75188C11.6491 4.43108 12.1504 4.43108 12.4712 4.75188C12.792 5.07268 12.792 5.57393 12.4712 5.89474Z" fill="#00C284"/>
                    </svg>
                  </div>
                </div>
              </td>
              <!--Badge Telegram-->
              <td class="scenarios-table__badge">
                <div class="scenario__box-status">
                  <div v-if="scenarioObj.scenario_channels.telegram">
                    <svg width="16" height="16" viewbox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 0C3.58897 0 0 3.58897 0 8C0 12.411 3.58897 16 8 16C12.411 16 16 12.411 16 8C16 3.58897 12.411 0 8 0ZM12.4712 5.89474L7.3584 10.9674C7.05764 11.2682 6.57644 11.2882 6.25564 10.9875L3.54887 8.5213C3.22807 8.22055 3.20802 7.7193 3.48872 7.3985C3.78947 7.07769 4.29073 7.05764 4.61153 7.3584L6.75689 9.32331L11.3283 4.75188C11.6491 4.43108 12.1504 4.43108 12.4712 4.75188C12.792 5.07268 12.792 5.57393 12.4712 5.89474Z" fill="#00C284"/>
                    </svg>
                  </div>
                </div>
              </td>
              <!--Badge Signl4-->
              <td class="scenarios-table__badge">
                <div class="scenario__box-status">
                  <div v-if="scenarioObj.scenario_channels.signl4">
                    <svg width="16" height="16" viewbox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 0C3.58897 0 0 3.58897 0 8C0 12.411 3.58897 16 8 16C12.411 16 16 12.411 16 8C16 3.58897 12.411 0 8 0ZM12.4712 5.89474L7.3584 10.9674C7.05764 11.2682 6.57644 11.2882 6.25564 10.9875L3.54887 8.5213C3.22807 8.22055 3.20802 7.7193 3.48872 7.3985C3.78947 7.07769 4.29073 7.05764 4.61153 7.3584L6.75689 9.32331L11.3283 4.75188C11.6491 4.43108 12.1504 4.43108 12.4712 4.75188C12.792 5.07268 12.792 5.57393 12.4712 5.89474Z" fill="#00C284"/>
                    </svg>
                  </div>
                </div>
              </td>
              <!--Badge PagerDuty-->
              <td class="scenarios-table__badge">
                <div class="scenario__box-status">
                  <div v-if="scenarioObj.scenario_channels.pagerduty">
                    <svg width="16" height="16" viewbox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 0C3.58897 0 0 3.58897 0 8C0 12.411 3.58897 16 8 16C12.411 16 16 12.411 16 8C16 3.58897 12.411 0 8 0ZM12.4712 5.89474L7.3584 10.9674C7.05764 11.2682 6.57644 11.2882 6.25564 10.9875L3.54887 8.5213C3.22807 8.22055 3.20802 7.7193 3.48872 7.3985C3.78947 7.07769 4.29073 7.05764 4.61153 7.3584L6.75689 9.32331L11.3283 4.75188C11.6491 4.43108 12.1504 4.43108 12.4712 4.75188C12.792 5.07268 12.792 5.57393 12.4712 5.89474Z" fill="#00C284"/>
                    </svg>
                  </div>
                </div>
              </td>
              <!--Badge SMS-->
              <td class="scenarios-table__badge">
                <div class="scenario__box-status">
                  <div v-if="scenarioObj.scenario_channels.sms">
                    <svg width="16" height="16" viewbox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 0C3.58897 0 0 3.58897 0 8C0 12.411 3.58897 16 8 16C12.411 16 16 12.411 16 8C16 3.58897 12.411 0 8 0ZM12.4712 5.89474L7.3584 10.9674C7.05764 11.2682 6.57644 11.2882 6.25564 10.9875L3.54887 8.5213C3.22807 8.22055 3.20802 7.7193 3.48872 7.3985C3.78947 7.07769 4.29073 7.05764 4.61153 7.3584L6.75689 9.32331L11.3283 4.75188C11.6491 4.43108 12.1504 4.43108 12.4712 4.75188C12.792 5.07268 12.792 5.57393 12.4712 5.89474Z" fill="#00C284"/>
                    </svg>
                  </div>
                </div>
              </td>
              <!--Badge Voice-->
              <td class="scenarios-table__badge">
                <div class="scenario__box-status">
                  <div v-if="scenarioObj.scenario_channels.voice">
                    <svg width="16" height="16" viewbox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 0C3.58897 0 0 3.58897 0 8C0 12.411 3.58897 16 8 16C12.411 16 16 12.411 16 8C16 3.58897 12.411 0 8 0ZM12.4712 5.89474L7.3584 10.9674C7.05764 11.2682 6.57644 11.2882 6.25564 10.9875L3.54887 8.5213C3.22807 8.22055 3.20802 7.7193 3.48872 7.3985C3.78947 7.07769 4.29073 7.05764 4.61153 7.3584L6.75689 9.32331L11.3283 4.75188C11.6491 4.43108 12.1504 4.43108 12.4712 4.75188C12.792 5.07268 12.792 5.57393 12.4712 5.89474Z" fill="#00C284"/>
                    </svg>
                  </div>
                </div>
              </td>
              <!--Badge Webhook-->
              <td class="scenarios-table__badge">
                <div class="scenario__box-status">
                  <div v-if="scenarioObj.scenario_channels.webhook">
                    <svg width="16" height="16" viewbox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 0C3.58897 0 0 3.58897 0 8C0 12.411 3.58897 16 8 16C12.411 16 16 12.411 16 8C16 3.58897 12.411 0 8 0ZM12.4712 5.89474L7.3584 10.9674C7.05764 11.2682 6.57644 11.2882 6.25564 10.9875L3.54887 8.5213C3.22807 8.22055 3.20802 7.7193 3.48872 7.3985C3.78947 7.07769 4.29073 7.05764 4.61153 7.3584L6.75689 9.32331L11.3283 4.75188C11.6491 4.43108 12.1504 4.43108 12.4712 4.75188C12.792 5.07268 12.792 5.57393 12.4712 5.89474Z" fill="#00C284"/>
                    </svg>
                  </div>
                </div>
              </td>
              <!--Badge Slack-->
              <td class="scenarios-table__badge">
                <div class="scenario__box-status">
                  <div v-if="scenarioObj.scenario_channels.slack">
                    <svg width="16" height="16" viewbox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 0C3.58897 0 0 3.58897 0 8C0 12.411 3.58897 16 8 16C12.411 16 16 12.411 16 8C16 3.58897 12.411 0 8 0ZM12.4712 5.89474L7.3584 10.9674C7.05764 11.2682 6.57644 11.2882 6.25564 10.9875L3.54887 8.5213C3.22807 8.22055 3.20802 7.7193 3.48872 7.3985C3.78947 7.07769 4.29073 7.05764 4.61153 7.3584L6.75689 9.32331L11.3283 4.75188C11.6491 4.43108 12.1504 4.43108 12.4712 4.75188C12.792 5.07268 12.792 5.57393 12.4712 5.89474Z" fill="#00C284"/>
                    </svg>
                  </div>
                </div>
              </td>
              <!--Updated by-->
              <td style="width: 10%"><div class="scenario__box-type">{{ scenarioObj.edited_by}}</div></td>
              <!--Last update ts-->
              <td style="width: 13%"><div class="scenario__box-update">{{ scenarioObj.last_update_ts}}</div></td>
              <!--Actions-->
              <td style="width: 10%">
                <div class="scenario__box-buttons">
                  <!--Edit button-->
                  <button
                    class="button__icon-transparent"
                    @click="$router.push({
                  name: 'Scenario edit',
                  params: {scenarioId: scenarioObj.scenario_id}})"
                  >
                    <svg width="16" height="16" viewbox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.63671 13.8682C1.57824 13.8098 1.52477 13.748 1.47557 13.6836C1.4381 13.6344 1.40319 13.5836 1.37133 13.5312L1.00646 14.6023L0.775867 15.2796C0.718616 15.4475 0.760853 15.6121 0.858753 15.7293C1.00255 15.8842 1.22264 15.9081 1.36888 15.8733L3.11632 15.2804C3.00341 15.2097 2.89745 15.1261 2.80077 15.0297L1.63671 13.8682Z" fill="#3C3C3C"/>
                      <path d="M15.0657 3.08881C15.0657 3.08881 13.9962 2.03779 13.5759 1.65473C13.2632 1.3863 12.8671 1.43842 12.6321 1.69209L11.9189 2.40754L14.2744 4.75775C14.2755 4.75885 14.2764 4.76007 14.2775 4.76117L14.3049 4.73383L15.0658 3.97431C15.3105 3.72992 15.3105 3.3332 15.0657 3.08881Z" fill="#3C3C3C"/>
                      <path d="M11.2544 3.07007L9.95801 4.36414L12.3153 6.71606C12.3159 6.71667 12.3163 6.71716 12.3168 6.71765L13.6133 5.42346C13.6127 5.42285 13.6119 5.42236 13.6113 5.42163L11.2544 3.07007Z" fill="#3C3C3C"/>
                      <path d="M4.33001 14.5675C4.44903 14.5275 4.56073 14.4602 4.65557 14.3655L11.6535 7.38025C11.6535 7.38025 11.6535 7.38025 11.6534 7.38013L9.29473 5.02686L2.29937 12.0096C2.20355 12.1051 2.1358 12.218 2.09552 12.338C1.997 12.6323 2.06475 12.97 2.29949 13.2041L3.46356 14.3656C3.62823 14.5299 3.84393 14.6121 4.0595 14.6121C4.15106 14.6121 4.24249 14.5972 4.33001 14.5675Z" fill="#3C3C3C"/>
                    </svg>
                  </button>
                  <nd-copy-btn-transparant v-clipboard:copy="scenarioObj.scenario_id"/>
                  <button class="button__icon-transparent" @click="deleteScenario(scenarioObj.scenario_id)">
                    <svg width="16" height="16" viewbox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.66797 0.96582H9.34204V1.41577H10.3077V0.902832C10.3079 0.405029 9.90308 0 9.40552 0H6.60449C6.10693 0 5.70215 0.405029 5.70215 0.902832V1.41577H6.66797V0.96582Z" fill="#3C3C3C"/>
                      <path d="M12.5382 5.24219H3.47224C3.22382 5.24219 3.02827 5.4541 3.04829 5.70178L3.80622 15.0739C3.84846 15.597 4.28486 16 4.80915 16H11.2011C11.7254 16 12.1618 15.597 12.204 15.0737L12.962 5.70178C12.9821 5.4541 12.7866 5.24219 12.5382 5.24219ZM5.66743 15.0004C5.65729 15.001 5.64716 15.0013 5.63715 15.0013C5.38398 15.0013 5.17145 14.8042 5.15571 14.5481L4.68073 6.85413C4.66437 6.58789 4.86689 6.35876 5.133 6.34241C5.39826 6.32629 5.62836 6.52832 5.64472 6.79468L6.11958 14.4886C6.13605 14.7549 5.93354 14.9839 5.66743 15.0004ZM8.49348 14.5184C8.49348 14.785 8.27729 15.0012 8.01057 15.0012C7.74384 15.0012 7.52766 14.785 7.52766 14.5184V6.82434C7.52766 6.55762 7.74384 6.34143 8.01057 6.34143C8.27717 6.34143 8.49348 6.55762 8.49348 6.82434V14.5184ZM11.3297 6.85278L10.8762 14.5468C10.8612 14.8033 10.6483 15.0012 10.3946 15.0012C10.3851 15.0012 10.3754 15.001 10.3658 15.0005C10.0996 14.9847 9.89643 14.7562 9.91218 14.49L10.3655 6.7959C10.3812 6.52966 10.609 6.32654 10.8759 6.34229C11.1422 6.35791 11.3453 6.58655 11.3297 6.85278Z" fill="#3C3C3C"/>
                      <path d="M14.2077 3.75195L13.8906 2.80127C13.807 2.55066 13.5724 2.38159 13.3081 2.38159H2.70152C2.43736 2.38159 2.20262 2.55066 2.11912 2.80127L1.80199 3.75195C1.74083 3.9353 1.82042 4.12231 1.96898 4.21558C2.02952 4.25354 2.10118 4.27637 2.17992 4.27637H13.8298C13.9086 4.27637 13.9803 4.25354 14.0408 4.21545C14.1893 4.12219 14.2689 3.93518 14.2077 3.75195Z" fill="#3C3C3C"/>
                    </svg>
                  </button>
              </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- popup buttons -->
      <div class="popup__box-buttons">
        <button class="button__large button__accent add"
                @click="$router.push({ name: 'Scenario edit', params: {scenarioId: 'new'}})">Add new</button>
      </div>
      <confirmation-popup ref="confirmation"></confirmation-popup>
    </div>
  </div>
</template>

<script>
import { REMOTE_REQUEST } from '@/store/actions/remoteActions'
import { TRIGGER_ERROR } from '@/store/actions/errorHandler'
import NdCopyBtn from '@/components/icons/ndCopyBtn'
import NdCopyBtnTransparant from '@/components/icons/ndCopyBtnTransparant'
import ConfirmationPopup from '@/components/popups/confirmationPopup'
import LoadingSpinner from '@/components/LoadingSpinner'
import { ref } from 'vue'

export default {
  components: { LoadingSpinner, ConfirmationPopup, NdCopyBtnTransparant, NdCopyBtn },
  computed: {
    scenariosList () {
      if (this.search.length > 0) {
        const searchPattern = this.search.toLowerCase()
        return this.scenarios.filter(scenarioObj => {
          const scenarioName = scenarioObj.scenario_name ? scenarioObj.scenario_name.toLowerCase() : ''
          return (scenarioName.includes(searchPattern))
        })
      }
      console.log("AAAA")
      console.log(this.scenarios)
      return this.scenarios
    }
  },
  data () {
    return {
      scenarioId: null,
      scenarios: [],
      loading: false,
      filters: {
        pattern: '',
        name: '',
        studio_id: null,
        procedure_type: null,
        procedure_id: null,
        tags: '',
        alert_fields: false,
        email_fields: false,
        jira_fields: false,
        skype_fields: false,
        teams_fields: false,
        telegram_fields: false,
        pagerduty_fields: false,
        signl4_fields: false,
        slack_fields: false,
        webhook_fields: false,
        sms_fields: false,
        voice_fields: false,
        recipients_pattern: ''
      },
      search: ''
    }
  },
  beforeMount () {
    this.loadScenarios()
  },
  setup () {
    const confirmation = ref(null)
    return { confirmation }
  },
  methods: {
    editScenario (scenarioId) {
      this.scenarioId = scenarioId
    },
    loadScenarios () {
      console.log('scenariosMain. loadScenarios.')
      this.loading = true
      const requestObj = {
        service: 'scenarios',
        path: '/scenarios/search',
        method: 'POST',
        body: JSON.stringify({}),
        options: {}
      }
      const msg = 'Search scenarios'
      const popupOptions = {
        showDialog: true
      }
      this.$store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
        .then(response => {
          console.log('scenariosMain. loadScenarios. response:', response)
          this.scenarios = response.msg
          this.loading = false
        })
        .catch((error) => {
          const errorDescription = {
            errorObj: error,
            eventName: '',
            eventType: 'error',
            showError: true,
            message: 'Can\'t load list with scenarios.'
          }
          this.$store.dispatch(TRIGGER_ERROR, errorDescription)
          console.error('scenariosMain. loadScenarios. Error:', error)
          this.loading = false
          // this.$router.go(-1)
        })
    },
    async deleteScenario (scenarioID) {
      const confirmation = await this.$refs.confirmation.showScenario('delete')
      if (confirmation) {
        console.log('scenariosMain. deleteScenario.')
        const requestObj = {
          service: 'scenarios',
          path: '/scenarios/' + scenarioID,
          method: 'DELETE',
          body: null,
          options: {}
        }
        const msg = 'Delete scenario'
        const popupOptions = {
          showDialog: true
        }
        this.$store.dispatch(REMOTE_REQUEST, { requestObj, msg, popupOptions })
          .then(response => {
            console.log('scenariosMain. deleteScenario. response:', response)
            this.loadScenarios()
          })
          .catch((error) => {
            console.error('scenariosMain. deleteScenario. Error:', error)
          })
      }
    }
  }

}
</script>

<style scoped>
.scenarios-main {
  padding: 16px;
}

.scenarios-table{
  width: 100%;
  display: block;
  empty-cells: show;

  /* Decoration */
  border-spacing: 0;
  border: 1px solid;
}

.scenarios-table thead{
  background-color: #f1f1f1;
  position:relative;
  display: block;
  width:100%;
  overflow-y: scroll;
}

.scenarios-table tbody{
  /* Position */
  display: block;
  position:relative;
  width:100%; overflow-y:scroll;
  max-height: calc(100vh - 270px);
  /* Decoration */
  border-top: 1px solid rgba(0,0,0,0.2);
}

.scenarios-table tr{
  width: 100%;
  display:flex;
}

.scenarios-table td,.scenarios-table th{
  /*flex-basis:100%;*/
  /*flex-grow:2;*/
  /*display: block;*/
  padding: 1rem;
  text-align:left;
}
.scenarios-table__badge{
  text-align:left;
  width: 5%;
}
/* Other options */

.scenarios-table.small-first-col td:first-child,
.scenarios-table.small-first-col th:first-child{
  /*flex-basis:20%;*/
  /*flex-grow:1;*/
}
.scenarios-table tbody tr:nth-child(2n){
  background-color: rgba(130,130,170,0.1);
}
</style>
