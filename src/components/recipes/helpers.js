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

  // Add recipe to all collections selected by the user
  for (let collectionId of collections) {
    const collectionRef = doc(db, 'collections', collectionId);
    const collection = await getDoc(collectionRef);
    const data = collection.data();
    const recipes = [...data.recipes, recipeRef.id];
    await updateDoc(collectionRef, { recipes });
  }
};

export const addCollection = async (newCollection) => {

/*
 * Add new collection
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
 * Iterate through recipes added to the new collection and add the new collection id to thier recipes list
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
