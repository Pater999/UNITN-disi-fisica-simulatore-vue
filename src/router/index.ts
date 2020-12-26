import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

Vue.use(VueRouter);

const HomePage = () =>
  import(/* webpackChunkName: "home-page" */ '../views/Homepage/Homepage.vue');
const QuestionsPage = () =>
  import(
    /* webpackChunkName: "questions-page" */ '../views/Questions/Questions.vue'
  );
const TestPage = () =>
  import(/* webpackChunkName: "test-page" */ '../views/Test/Test.vue');

const appTitle = 'Pater999 - Simulatore fisica UNITN';

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home-page',
    component: HomePage,
    meta: {
      title: `${appTitle}`,
    },
  },
  {
    path: '/test',
    name: 'test-page',
    component: TestPage,
    meta: {
      title: `${appTitle} - Test`,
    },
  },
  {
    path: '/domande',
    name: 'questions-page',
    component: QuestionsPage,
    meta: {
      title: `${appTitle} - Lista domande`,
    },
  },
  {
    path: '/404',
    name: '404-page',
    component: HomePage,
    meta: {
      title: `${appTitle} - 404`,
    },
  },
  {
    path: '*',
    redirect: '/404',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// CAMBIO TITOLO
router.afterEach(async to => {
  document.title = to.meta.title;
});

export default router;
