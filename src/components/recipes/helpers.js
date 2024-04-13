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

export const addRecipe = async (
  recipe,
  currentUser,
  currentPlanner,
  collections
) => {
  const { title, url, image, imageData, description, source } = recipe;

  const recipeRef = await addDoc(collection(db, 'recipes'), {
    title,
    url,
    image,
    imageData,
    description,
    source,
    collections,
    plannerId: currentPlanner.id,
    createdAt: Timestamp.fromDate(new Date()),
    addedBy: currentUser.uid,
  });

  // Add recipe to all collections selected by the user
  for (let collectionId of collections) {
    const collectionRef = doc(db, 'collections', collectionId);
    const collection = await getDoc(collectionRef);
    const data = collection.data();
    const recipes = [...data.recipes, recipeRef.id];
    await updateDoc(collectionRef, { recipes });
  }
};

export const addCollection = async (collection, currentPlanner) => {
  const { title, collectionRecipes } = collection;

  // this shuold be in the component?
  if (!title) {
    alert('Title must not be empty');
    return;
  }

  let color = collection?.color;
  if (!color) color = Math.floor(Math.random() * colors.length);

  const collectionRef = await addDoc(collection(db, 'collections'), {
    title,
    color,
    recipes: collectionRecipes,
    plannerId: currentPlanner.id,
  });

  // iterate through recipes and add collection
  for (const recipeId of collectionRecipes) {
    const recipeRef = doc(db, 'recipes', recipeId);
    const recipe = await getDoc(recipeRef);
    const data = recipe.data();
    const collections = [...data.collections, collectionRef.id];
    updateDoc(recipeRef, { collections });
  }
};
