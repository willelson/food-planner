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
    <div
      class="footer-button centered"
      :class="{ active: ['recipes', 'collection'].includes(page) }"
    >
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
  background-color: white;
  border-top: 1px solid rgba(85, 117, 113, 0.7);
  z-index: 10;
  box-shadow: 3px 3px 5px 2px rgba(85, 117, 113, 1);
}

.footer .footer-button {
  flex: 1;
}

.footer-button i {
  font-size: 24px;
  color: #b1b1b1;
}

.active i {
  color: var(--primary) !important;
}
</style>
