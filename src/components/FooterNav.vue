<template>
  <div class="footer">
    <div
      class="footer-button centered"
      :class="{ active: page === 'calendar'}"
    >
      <i
        class="fa fa-calendar-o"
        aria-hidden="true"
        @click="pageSelected('calendar')"
      ></i>
    </div>
    <div
      class="footer-button centered"
      :class="{ active: page === 'shopping'}"
    >
      <i
        class="fa fa-shopping-cart"
        aria-hidden="true"
        @click="pageSelected('shopping')"
      ></i>
    </div>
    <div
      class="footer-button centered"
      :class="{ active: page === 'recipes'}"
    >
      <i
        class="fa fa-bookmark"
        aria-hidden="true"
        @click="pageSelected('recipes')"
      ></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ['page'],
  emits: ['update:page'],
  methods: {
    pageSelected(page) {
      this.$emit('update:page', page);
    }
  }
};
</script>

<style>
.footer {
  height: 48px;
  margin-top: auto;
  display: flex;
  background-color: var(--primary);
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
