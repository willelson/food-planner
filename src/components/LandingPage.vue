<template>
  <div class="container">
    <div class="centered" style="width: 50%; position: relative">
      <div class="title-container">
        <div style="font-size: 6em">Food Planner</div>
        <div class="feature-message">
          Visit from your mobile browser to install the app.
        </div>
      </div>
      <div class="footer-message">
        A work in progress by
        <a href="https://github.com/willelson">willelson</a>
        <i class="fa fa-github" aria-hidden="true"></i>
      </div>
    </div>
    <div class="centered" style="width: 50%">
      <div class="centered" style="height: 100%">
        <img
          src="@/assets/images/calendar-screenshot.png"
          class="phone-screenshot"
        />
        <img
          src="@/assets/images/recipe-screenshot.png"
          class="phone-screenshot"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
* {
  font-family: Arial, Helvetica, sans-serif;
}
.container {
  display: flex;
  height: 100%;
  width: 100%;
}

.phone-screenshot {
  height: 60%;
  margin: 12px;
}

.title-container {
  height: 60%;
  position: relative;
}

.footer-message {
  position: absolute;
  bottom: 16px;
  left: 100%;
  color: #d4d4d4;
  font-size: 12px;
  width: 50%;
}

.footer-message a {
  color: #d4d4d4;
}

.footer-message a:visited {
  color: #d4d4d4;
}

.feature-message {
  margin: 24px 0;
  padding-left: 5px;
  color: #3a3b3c;
}

.install-message,
.feature-message i {
  margin-left: 5px;
}

.install-message {
  color: #5a5a5a;
  font-weight: lighter;
  padding-left: 5px;
  margin-top: auto;
  position: absolute;
  bottom: 12px;
}
</style>
