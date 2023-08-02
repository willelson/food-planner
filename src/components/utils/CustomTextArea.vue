<template>
  <textarea
    :id="id"
    :placeholder="placeholder"
    @keyup="resize"
    ref="text-area"
    :value="value"
    @input="handleInput"
  ></textarea>
</template>

<script>
export default {
  emits: ['input'],
  props: {
    value: {
      default: '',
      type: String,
    },
    id: {
      default: '',
      type: String,
    },
    placeholder: {
      default: '',
      type: String,
    },
  },

  methods: {
    resize() {
      const textArea = this.$refs['text-area'];
      console.log(`textArea.scrollHeight = ${textArea.scrollHeight}`);
      const height = parseInt(textArea.scrollHeight) + 2;
      const heightString = String(height);
      textArea.style.height = heightString + 'px';
    },
    handleInput(event) {
      this.resize();
      this.$emit('input', event.target.value);
    },
  },

  mounted() {
    this.resize();
  },
};
</script>

<style scoped>
textarea {
  height: 36px;
  font-family: 'Noto Serif';
  padding: var(--padding-sm);
  border: 1px solid var(--border);
  border-radius: var(--border-radius);
  width: 100%;
  resize: none;
  overflow: hidden;
}
</style>
