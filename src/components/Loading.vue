<template>
  <div class="loading-background"></div>
  <div class="loader"
       :class="{'loader-transparent': transparent}"
  >Loading...</div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    transparent: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>

<style>
.loader {
  margin: 310px auto;
  font-size: 12px;
  width: 1em;
  height: 1em;
  border-radius: 50%;
  position: relative;
  text-indent: -9999em;
  -webkit-animation: load5 1.1s infinite ease;
  animation: load5 1.1s infinite ease;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
}
.loader-transparent {
  position: fixed;
  left: 50%;
}

.loading-background {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 10%;
  z-index: 2;
}
@-webkit-keyframes load5 {
  0%,
  100% {
    box-shadow: 0em -2.6em 0em 0em #398c0d, 1.8em -1.8em 0 0em rgba(57,140,13, 0.2), 2.5em 0em 0 0em rgba(57,140,13, 0.2), 1.75em 1.75em 0 0em rgba(57, 140, 13, 0.2), 0em 2.5em 0 0em rgba(57,140,13, 0.2), -1.8em 1.8em 0 0em rgba(57,140,13, 0.2), -2.6em 0em 0 0em rgba(57,140,13, 0.5), -1.8em -1.8em 0 0em rgba(57,140,13, 0.7);
  }
  12.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(57,140,13, 0.7), 1.8em -1.8em 0 0em #398c0d, 2.5em 0em 0 0em rgba(57,140,13, 0.2), 1.75em 1.75em 0 0em rgba(57,140,13, 0.2), 0em 2.5em 0 0em rgba(57,140,13, 0.2), -1.8em 1.8em 0 0em rgba(57,140,13, 0.2), -2.6em 0em 0 0em rgba(57,140,13, 0.2), -1.8em -1.8em 0 0em rgba(57,140,13, 0.5);
  }
  25% {
    box-shadow: 0em -2.6em 0em 0em rgba(57,140,13, 0.5), 1.8em -1.8em 0 0em rgba(57,140,13, 0.7), 2.5em 0em 0 0em #398c0d, 1.75em 1.75em 0 0em rgba(57,140,13, 0.2), 0em 2.5em 0 0em rgba(57,140,13, 0.2), -1.8em 1.8em 0 0em rgba(57,140,13, 0.2), -2.6em 0em 0 0em rgba(57,140,13, 0.2), -1.8em -1.8em 0 0em rgba(57,140,13, 0.2);
  }
  37.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(57,140,13, 0.2), 1.8em -1.8em 0 0em rgba(57,140,13, 0.5), 2.5em 0em 0 0em rgba(57,140,13, 0.7), 1.75em 1.75em 0 0em #398c0d, 0em 2.5em 0 0em rgba(57,140,13, 0.2), -1.8em 1.8em 0 0em rgba(57,140,13, 0.2), -2.6em 0em 0 0em rgba(57,140,13, 0.2), -1.8em -1.8em 0 0em rgba(57,140,13, 0.2);
  }
  50% {
    box-shadow: 0em -2.6em 0em 0em rgba(57,140,13, 0.2), 1.8em -1.8em 0 0em rgba(57,140,13, 0.2), 2.5em 0em 0 0em rgba(57,140,13, 0.5), 1.75em 1.75em 0 0em rgba(57,140,13, 0.7), 0em 2.5em 0 0em #398c0d, -1.8em 1.8em 0 0em rgba(57,140,13, 0.2), -2.6em 0em 0 0em rgba(57,140,13, 0.2), -1.8em -1.8em 0 0em rgba(57,140,13, 0.2);
  }
  62.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(57,140,13, 0.2), 1.8em -1.8em 0 0em rgba(57,140,13, 0.2), 2.5em 0em 0 0em rgba(57,140,13, 0.2), 1.75em 1.75em 0 0em rgba(57,140,13, 0.5), 0em 2.5em 0 0em rgba(57,140,13, 0.7), -1.8em 1.8em 0 0em #398c0d, -2.6em 0em 0 0em rgba(57,140,13, 0.2), -1.8em -1.8em 0 0em rgba(57,140,13, 0.2);
  }
  75% {
    box-shadow: 0em -2.6em 0em 0em rgba(57,140,13, 0.2), 1.8em -1.8em 0 0em rgba(57,140,13, 0.2), 2.5em 0em 0 0em rgba(57,140,13, 0.2), 1.75em 1.75em 0 0em rgba(57,140,13, 0.2), 0em 2.5em 0 0em rgba(57,140,13, 0.5), -1.8em 1.8em 0 0em rgba(57,140,13, 0.7), -2.6em 0em 0 0em #398c0d, -1.8em -1.8em 0 0em rgba(57,140,13, 0.2);
  }
  87.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(57,140,13, 0.2), 1.8em -1.8em 0 0em rgba(57,140,13, 0.2), 2.5em 0em 0 0em rgba(57,140,13, 0.2), 1.75em 1.75em 0 0em rgba(57,140,13, 0.2), 0em 2.5em 0 0em rgba(57,140,13, 0.2), -1.8em 1.8em 0 0em rgba(57,140,13, 0.5), -2.6em 0em 0 0em rgba(57,140,13, 0.7), -1.8em -1.8em 0 0em #398c0d;
  }
}
@keyframes load5 {
  0%,
  100% {
    box-shadow: 0em -2.6em 0em 0em #398c0d, 1.8em -1.8em 0 0em rgba(57,140,13, 0.2), 2.5em 0em 0 0em rgba(57,140,13, 0.2), 1.75em 1.75em 0 0em rgba(57,140,13, 0.2), 0em 2.5em 0 0em rgba(57,140,13, 0.2), -1.8em 1.8em 0 0em rgba(57,140,13, 0.2), -2.6em 0em 0 0em rgba(57,140,13, 0.5), -1.8em -1.8em 0 0em rgba(57,140,13, 0.7);
  }
  12.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(57,140,13, 0.7), 1.8em -1.8em 0 0em #398c0d, 2.5em 0em 0 0em rgba(57,140,13, 0.2), 1.75em 1.75em 0 0em rgba(57,140,13, 0.2), 0em 2.5em 0 0em rgba(57,140,13, 0.2), -1.8em 1.8em 0 0em rgba(57,140,13, 0.2), -2.6em 0em 0 0em rgba(57,140,13, 0.2), -1.8em -1.8em 0 0em rgba(57,140,13, 0.5);
  }
  25% {
    box-shadow: 0em -2.6em 0em 0em rgba(57,140,13, 0.5), 1.8em -1.8em 0 0em rgba(57,140,13, 0.7), 2.5em 0em 0 0em #398c0d, 1.75em 1.75em 0 0em rgba(57,140,13, 0.2), 0em 2.5em 0 0em rgba(57,140,13, 0.2), -1.8em 1.8em 0 0em rgba(57,140,13, 0.2), -2.6em 0em 0 0em rgba(57,140,13, 0.2), -1.8em -1.8em 0 0em rgba(57,140,13, 0.2);
  }
  37.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(57,140,13, 0.2), 1.8em -1.8em 0 0em rgba(57,140,13, 0.5), 2.5em 0em 0 0em rgba(57,140,13, 0.7), 1.75em 1.75em 0 0em #398c0d, 0em 2.5em 0 0em rgba(57,140,13, 0.2), -1.8em 1.8em 0 0em rgba(57,140,13, 0.2), -2.6em 0em 0 0em rgba(57,140,13, 0.2), -1.8em -1.8em 0 0em rgba(57,140,13, 0.2);
  }
  50% {
    box-shadow: 0em -2.6em 0em 0em rgba(57,140,13, 0.2), 1.8em -1.8em 0 0em rgba(57,140,13, 0.2), 2.5em 0em 0 0em rgba(57,140,13, 0.5), 1.75em 1.75em 0 0em rgba(57,140,13, 0.7), 0em 2.5em 0 0em #398c0d, -1.8em 1.8em 0 0em rgba(57,140,13, 0.2), -2.6em 0em 0 0em rgba(57,140,13, 0.2), -1.8em -1.8em 0 0em rgba(57,140,13, 0.2);
  }
  62.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(57,140,13, 0.2), 1.8em -1.8em 0 0em rgba(57,140,13, 0.2), 2.5em 0em 0 0em rgba(57,140,13, 0.2), 1.75em 1.75em 0 0em rgba(57,140,13, 0.5), 0em 2.5em 0 0em rgba(57,140,13, 0.7), -1.8em 1.8em 0 0em #398c0d, -2.6em 0em 0 0em rgba(57,140,13, 0.2), -1.8em -1.8em 0 0em rgba(57,140,13, 0.2);
  }
  75% {
    box-shadow: 0em -2.6em 0em 0em rgba(57,140,13, 0.2), 1.8em -1.8em 0 0em rgba(57,140,13, 0.2), 2.5em 0em 0 0em rgba(57,140,13, 0.2), 1.75em 1.75em 0 0em rgba(57,140,13, 0.2), 0em 2.5em 0 0em rgba(57,140,13, 0.5), -1.8em 1.8em 0 0em rgba(57,140,13, 0.7), -2.6em 0em 0 0em #398c0d, -1.8em -1.8em 0 0em rgba(57,140,13, 0.2);
  }
  87.5% {
    box-shadow: 0em -2.6em 0em 0em rgba(57,140,13, 0.2), 1.8em -1.8em 0 0em rgba(57,140,13, 0.2), 2.5em 0em 0 0em rgba(57,140,13, 0.2), 1.75em 1.75em 0 0em rgba(57,140,13, 0.2), 0em 2.5em 0 0em rgba(57,140,13, 0.2), -1.8em 1.8em 0 0em rgba(57,140,13, 0.5), -2.6em 0em 0 0em rgba(57,140,13, 0.7), -1.8em -1.8em 0 0em #398c0d;
  }
}
</style>
