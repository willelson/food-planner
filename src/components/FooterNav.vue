<template>
  <div class="footer">
    <div
      class="footer-button centered"
      :class="{ active: page === 'calendar' }"
    >
      <i
        class="fa fa-calendar-o"
        aria-hidden="true"
        @click="$router.push({ name: 'calendar' })"
      ></i>
    </div>
    <div
      class="footer-button centered"
      :class="{ active: page === 'shoppingList' }"
    >
      <i
        class="fa fa-shopping-cart"
        aria-hidden="true"
        @click="$router.push({ name: 'shoppingList' })"
      ></i>
    </div>
    <div class="footer-button centered" :class="{ active: page === 'recipes' }">
      <i
        class="fa fa-bookmark"
        aria-hidden="true"
        @click="$router.push({ name: 'recipes' })"
      ></i>
    </div>
    <div class="footer-button centered" :class="{ active: page === 'account' }">
      <i
        class="fa fa-user-circle"
        aria-hidden="true"
        @click="$router.push({ name: 'account' })"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    page() {
      return this.$router.currentRoute.value.name;
    },
  },
};
</script>

<style>
.footer {
  min-height: var(--footer-height);
  padding-bottom: 18px;
  margin-top: auto;
  display: flex;
  background-color: var(--primary);
  z-index: 10;
}

.footer .footer-button {
  flex: 1;
}

.footer-button i {
  font-size: 24px;
  color: var(--black);
}

.active i {
  color: var(--white) !important;
}
</style>
