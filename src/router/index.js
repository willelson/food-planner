import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store/index';

import RecipeCollections from '@/components/recipes/RecipeCollections.vue';
import CalendarView from '@/components/CalendarView.vue';
import ShoppingList from '@/components/ShoppingList.vue';
import UserSettings from '@/components/UserSettings.vue';
import Login from '@/components/login/LogIn.vue';
import SignUp from '@/components/login/SignUp.vue';

const routes = [
  { path: '/recipes', component: RecipeCollections, name: 'recipes' },
  { path: '/calendar', component: CalendarView, name: 'calendar' },
  { path: '/shopping-list', component: ShoppingList, name: 'shoppingList' },
  { path: '/account', component: UserSettings, name: 'account' },
  { path: '/login', component: Login, name: 'login' },
  { path: '/signup', component: SignUp, name: 'signup' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  console.log(store.state.user);
  console.log(from);
  if (!store.state.user && to.name !== 'Login') {
    // redirect the user to the login page
    return { name: 'Login' };
  }
});

export default router;
