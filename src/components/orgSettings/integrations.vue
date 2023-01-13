<template>
  <div class="integrations active">

    <div class="tabs__box">
      <!-- left -->
      <div class="tabs__box-in">
        <div class="search__box">
          <input type="search" name="search" placeholder="Search"
                 class="input__search input">
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
        <div class="integrations__select">
          <b>Show:</b>
          <select name="integrations_show" class="input__select input">
            <option value="all">All</option>
            <option value="utc">UTC</option>
            <option value="utc">UTC</option>
          </select>
        </div>
      </div>
    </div>

    <div class="integrations__list">
      <div class="integrations__box active">
        <img src="/src/assets/images/zb.png" alt="zabbix">
        <div class="integrations__box-title">Zabbix</div>
        <button class="integrations__box-button install">Install</button>
      </div>

      <div class="integrations__box">
        <img src="/src/assets/images/zb.png" alt="zabbix">
        <div class="integrations__box-title">Zabbix</div>
        <button class="integrations__box-button active">Active</button>
      </div>

      <div class="integrations__box">
        <img src="/src/assets/images/zb.png" alt="zabbix">
        <div class="integrations__box-title">Zabbix</div>
        <button class="integrations__box-button active">Active</button>
      </div>

      <div class="integrations__box">
        <img src="/src/assets/images/zb.png" alt="zabbix">
        <div class="integrations__box-title">Zabbix</div>
        <button class="integrations__box-button active">Active</button>
      </div>

      <div class="integrations__box active">
        <img src="/src/assets/images/zb.png" alt="zabbix">
        <div class="integrations__box-title">Zabbix</div>
        <button class="integrations__box-button install">Install</button>
      </div>

      <div class="integrations__box">
        <img src="/src/assets/images/zb.png" alt="zabbix">
        <div class="integrations__box-title">Zabbix</div>
        <button class="integrations__box-button active">Active</button>
      </div>

      <div class="integrations__box">
        <img src="/src/assets/images/zb.png" alt="zabbix">
        <div class="integrations__box-title">Zabbix</div>
        <button class="integrations__box-button active">Active</button>
      </div>

      <div class="integrations__box">
        <img src="/src/assets/images/zb.png" alt="zabbix">
        <div class="integrations__box-title">Zabbix</div>
        <button class="integrations__box-button active">Active</button>
      </div>
    </div>

    <!-- active -->
    <div class="integtaions__active">
      <div class="integrations__active-title">Zabbix</div>
      <div class="integrations__info">
        <div class="intergrations__info-box">Step 1 to install</div>
        <img src="/src/assets/images/arrow.svg">
        <div class="intergrations__info-box">Step 2 to install</div>
        <img src="/src/assets/images/arrow.svg">
        <div class="intergrations__info-box">Step 3 to install</div>
      </div>
    </div>

  </div>

</template>

<script>

</script>
