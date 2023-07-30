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
    handleInput(event) {
      const textArea = this.$refs['text-area'];
      textArea.style.height = 'auto';
      textArea.style.height = textArea.scrollHeight + 'px';
      this.$emit('input', event.target.value);
    },
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
}
</style>
