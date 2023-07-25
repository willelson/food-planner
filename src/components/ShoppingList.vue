<template>
  <div class="page-container">
    <div
      style="display: flex; justify-content: space-between; align-items: center"
    >
      <div class="page-title">Shopping List</div>
      <div>
        <span v-if="editing" class="clear-all-btn" @click="clearShoppingList">
          clear all</span
        >
        <span @click="toggleEditing" class="edit-btn">{{
          editing ? 'done' : 'edit'
        }}</span>
      </div>
    </div>
    <div class="list-container">
      <div class="list-item" v-for="item in items" :key="item.id">
        <div
          class="checkbox"
          @click="() => updateListItem(item.id, { checked: !item.checked })"
        >
          <i
            v-if="item.checked"
            class="fa fa-check-circle"
            aria-hidden="true"
          ></i>
          <i v-else class="fa fa-circle-o" aria-hidden="true"></i>
        </div>
        <input
          type="text"
          @keyup.enter="
            (e) => updateListItem(item.id, { text: e.target.value })
          "
          @blur="(e) => updateListItem(item.id, { text: e.target.value })"
          @focus="editing = false"
          :value="item.text"
          placeholder="New item..."
        />
        <i
          v-if="editing"
          class="fa fa-times"
          style="color: var(--danger); cursor: pointer"
          aria-hidden="true"
          @click="removeEntry(item)"
        ></i>
      </div>
      <div class="new-item">
        <i class="fa fa-circle-o" aria-hidden="true"></i>
        <input
          type="text"
          @keyup.enter="addItem"
          @blur="inputBlur"
          @focus="editing = false"
          v-model="input"
          placeholder="New item..."
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  getAll,
  addItem,
  removeItem,
  updateItem,
  SHOPPING_LIST,
} from '../database';

export default {
  data() {
    return {
      input: '',
      items: [],
      editing: false,
    };
  },
  methods: {
    addItem() {
      if (!this.input) return;
      const newItem = { text: this.input, checked: false };

      addItem(SHOPPING_LIST, newItem);
      this.items = getAll(SHOPPING_LIST);
      this.input = '';
    },
    inputBlur() {
      if (!this.input) return;
      this.addItem();
    },
    updateListItem(id, changes) {
      const itemToUpdate = JSON.parse(
        JSON.stringify(this.items.find((i) => i.id === id))
      );

      if (changes?.text === '') {
        removeItem(SHOPPING_LIST, itemToUpdate);
      } else {
        updateItem(SHOPPING_LIST, { ...itemToUpdate, ...changes });
      }
      this.items = getAll(SHOPPING_LIST);
    },
    toggleEditing() {
      this.editing = !this.editing;
    },
    removeEntry(item) {
      removeItem(SHOPPING_LIST, item);
      this.items = getAll(SHOPPING_LIST);
    },
    clearShoppingList() {
      this.items = [];
      localStorage.setItem(SHOPPING_LIST, []);
      this.editing = false;
    },
  },
  mounted() {
    this.items = getAll(SHOPPING_LIST);
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

.list-item input {
  padding: var(--padding-sm) 0 var(--padding-xs) 0;
  border: none;
  margin: 1px 0;
  outline: none;
}
.new-item input {
  padding: var(--padding-sm) 0 var(--padding-xs) 0;
  border: none;
  outline: none;
}

.edit-btn {
  color: var(--primary);
  margin: 0 var(--padding-sm);
}
.clear-all-btn {
  color: var(--primary);
  padding-right: var(--padding-sm);
  border-right: 1px solid var(--border);
}
</style>
