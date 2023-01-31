<template>
  <div class="footer">
    <div class="footer-button centered">Calendar</div>
    <div class="footer-button centered">My recipes</div>
    <div class="footer-button centered">Shopping list</div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.footer {
  height: 52px;
  border-top: 2px solid var(--primary);
  margin-top: auto;
  display: flex;
}

.footer .footer-button {
  flex: 1;
}
.footer .footer-button:not(:last-child) {
  border-right: 2px solid var(--primary);
}
</style>
