<template>
  <AddRecipe :open="addRecipeOpen" @close="setAddRecipeOpen(false)" />
  <ViewEditRecipe
    :open="viewEditRecipeOpen"
    @close="setViewEditRecipeOpen(false)"
  />
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AddRecipe from '@/components/recipes/AddRecipe.vue';
import ViewEditRecipe from '@/components/recipes/ViewEditRecipe.vue';

export default {
  computed: {
    ...mapState('modals', [
      'addRecipeOpen',
      'viewEditRecipeOpen',
      'selectedRecipe',
    ]),
  },
  methods: {
    ...mapActions('modals', ['setAddRecipeOpen', 'setViewEditRecipeOpen']),
  },
  components: {
    AddRecipe,
    ViewEditRecipe,
  },
};
</script>

<style></style>
