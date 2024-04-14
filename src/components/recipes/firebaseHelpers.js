import {
  addDoc,
  updateDoc,
  Timestamp,
  collection,
  doc,
  getDoc,
} from 'firebase/firestore';
import { db } from '@/firebase/config';
import { colors } from '@/components/recipes/constants';

/*
 * Add new recipe
 * @param {object} recipe - newly added recipe data
 * @param {object} currentUser - authenticated user
 * @param {object} currentPlanner - planner data
 * @param {array} collections - list of collection ids assigned to the newly created recipe
 */
export const addRecipe = (recipe, currentUser, currentPlanner, collections) => {
  addDoc(collection(db, 'recipes'), {
    ...recipe,
    collections,
    plannerId: currentPlanner.id,
    createdAt: Timestamp.fromDate(new Date()),
    addedBy: currentUser.uid,
  });
};

export const updateRecipe = async (recipeId, updatedRecipe) => {
  const recipeRef = doc(db, 'recipes', recipeId);
  await updateDoc(recipeRef, updatedRecipe);
};

/*
 * Add new collection
 * @param {object} newCollection - newly added collection data
 * @param {array} collectionRecipes - list of recipe ids assigned to the newly created collection
 */
export const addCollection = async (newCollection, collectionRecipes) => {
  if (!newCollection.title) {
    alert('Title must not be empty');
    return;
  }

  if (!newCollection?.color) {
    newCollection.color = colors[Math.floor(Math.random() * colors.length)];
  }

  const collectionRef = await addDoc(collection(db, 'collections'), {
    ...newCollection,
  });

  addCollectionToRecipes(collectionRecipes, collectionRef.id);
};

/*
 * When a user creates a new collection they can select recipes to be included in that collection.
 * Iterate through selected recipes and add the new collection id to the collections array of each recipe.
 * @param {array} recipeIds - list of recipe ids assigned to the newly created collection
 * @param {string} collectionId - Id of the newly created collection
 */
const addCollectionToRecipes = async (recipeIds, collectionId) => {
  for (const recipeId of recipeIds) {
    const recipeRef = doc(db, 'recipes', recipeId);
    const recipe = await getDoc(recipeRef);
    const data = recipe.data();
    const collections = [...data.collections, collectionId];
    updateDoc(recipeRef, { collections });
  }
};
