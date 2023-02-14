<template>
  <div class="page-container">
    <div class="page-title">Shopping List</div>
    <div class="list-container">
      <div class="list-item" v-for="item in items" :key="item.id">
        <div class="checkbox" @click="item.checked = !item.checked">
          <i
            v-if="item.checked"
            class="fa fa-check-circle"
            aria-hidden="true"
          ></i>
          <i v-else class="fa fa-circle-o" aria-hidden="true"></i>
        </div>
        <div class="text">{{ item.text }}</div>
      </div>
      <div class="new-item">
        <i class="fa fa-circle-o" aria-hidden="true"></i>
        <input
          type="text"
          @keyup.enter="addItem"
          @blur="inputBlur"
          v-model="input"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      items: [
        { id: 1, text: 'Milk', checked: false },
        { id: 2, text: 'Butter', checked: false },
        { id: 3, text: 'Eggs', checked: false },
        { id: 4, text: 'Peanut butter', checked: false },
      ],
    };
  },
  methods: {
    addItem() {
      if (!this.input) return;

      const nextId = Math.max(...this.items.map((item) => item.id)) + 1;
      this.items.push({ id: nextId, text: this.input, checked: false });
      this.input = '';
    },
    inputBlur() {
      if (!this.input) return;
      this.addItem();
    },
  },
};
</script>

<style scoped>
.list-container {
  display: flex;
  flex-direction: column;
  padding: var(--padding-sm) var(--padding);
  overflow-y: scroll;
}

.new-item,
.list-item {
  display: flex;
  align-items: center;
}

.new-item i,
.checkbox {
  margin-right: 8px;
  padding: var(--padding-xs);
}

.new-item,
.checkbox i {
  font-size: 24px;
  color: var(--primary);
}
</style>
