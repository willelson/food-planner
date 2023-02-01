<template>
  <div class="footer">
    <div class="footer-button centered active"><i class="fa fa-calendar-o" aria-hidden="true"></i></div>
    <div class="footer-button centered"><i class="fa fa-shopping-cart" aria-hidden="true"></i></div>
    <div class="footer-button centered"><i class="fa fa-bookmark" aria-hidden="true"></i></div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.footer {
  height: 52px;
  /* border-top: 2px solid var(--tertiary); */
  margin-top: auto;
  display: flex;
  background-color: var(--primary);
}

.footer .footer-button {
  flex: 1;
}

.footer-button i {
  font-size: 26px;
  color: var(--black);
}

.active i {
  color: var(--white) !important;
}

</style>
