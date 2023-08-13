<template>
  <div v-show="show" ref="root" class="context-container">
    <slot name="body"></slot>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {};
  },
  methods: {
    handleClickOutside(event) {
      const element = this.$refs.root;
      const clickedOutside = !element.contains(event.target);
      if (clickedOutside) {
        this.$emit('close');
      }
    },
  },
  mounted() {
    document.addEventListener('mousedown', this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  },
};
</script>

<style scoped>
.context-container {
  position: relative;
}
</style>
