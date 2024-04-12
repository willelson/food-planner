<template>
  <AddRecipe
    :open="addRecipeOpen"
    @recipe-added="getRecipes"
    @close="setAddRecipeOpen(false)"
  />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AddRecipe from '@/components/recipes/AddRecipe.vue';
export default {
  computed: {
    ...mapState('modals', ['addRecipeOpen']),
  },
  methods: {
    ...mapActions('modals', ['setAddRecipeOpen']),
    getRecipes() {
      console.log('Call getRecipes');
    },
  },
  components: {
    AddRecipe,
  },
};
</script>

<style></style>
