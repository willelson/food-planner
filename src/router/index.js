import { createRouter, createWebHashHistory } from 'vue-router';
import store from '@/store/index';

import RecipeCollections from '@/components/recipes/RecipeCollections.vue';
import RecipeCollection from '@/components/recipes/RecipeCollection.vue';
import CalendarView from '@/components/calendar/CalendarView.vue';
import ShoppingList from '@/components/ShoppingList.vue';
import UserSettings from '@/components/UserSettings.vue';
import Login from '@/components/login/LogIn.vue';
import SignUp from '@/components/login/SignUp.vue';

const routes = [
  { path: '/recipes', component: RecipeCollections, name: 'recipes' },
  { path: '/', component: CalendarView, name: 'calendar' },
  { path: '/shopping-list', component: ShoppingList, name: 'shoppingList' },
  { path: '/account', component: UserSettings, name: 'account' },
  { path: '/login', component: Login, name: 'login' },
  { path: '/signup', component: SignUp, name: 'signup' },
  {
    path: '/recipes/collection/:id',
    component: RecipeCollection,
    name: 'collection',
    props: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to) => {
  if (!store.state.user && !['login', 'signup'].includes(to.name)) {
    // redirect the user to the login page
    return { name: 'login' };
  }

  if (store.state.user && ['login', 'signup'].includes(to.name)) {
    return { name: 'calendar' };
  }
});

export default router;
