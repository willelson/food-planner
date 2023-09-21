<template>
  <div class="container">
    <div class="instructions-title">Food Planner</div>
    <div class="instructions-text">Install the app:</div>
    <div v-if="operatingSytem === 'iOS'" class="instructions">
      <ol>
        <li>Tap the Share button in your browser.</li>
        <li>Find and tap Add to Home Screen.</li>
        <li>Confirm or edit the app details and tap Add.</li>
      </ol>
    </div>
    <div v-else class="instructions">
      <ol>
        <li>Tap the Share button in your browser.</li>
        <li>Find and tap Add to Home Screen.</li>
        <li>Confirm or edit the app details and tap Add.</li>
      </ol>
    </div>
    <div class="screenshot-container">
      <img
        src="@/assets/images/calendar-screenshot.png"
        class="phone-screenshot"
      />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    operatingSytem() {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return 'iOS';
      } else return 'other';
    },
  },
};
</script>

<style scoped>
* {
  font-family: Arial, Helvetica, sans-serif;
}
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.instructions-title {
  font-size: 5em;
  padding: var(--padding);
}

.instructions-text {
  padding: 0 var(--padding);
  font-size: 1.2em;
  color: rgb(78, 79, 80);
}
.instructions {
  color: #4e4f50;
  font-size: 0.95em;
}

.screenshot-container {
  display: flex;
  justify-content: center;
  padding-top: var(--padding);
}
.phone-screenshot {
  width: 90%;
}
</style>
