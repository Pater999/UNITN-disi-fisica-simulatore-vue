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
const ErrorPage = () =>
  import(/* webpackChunkName: "404-page" */ '../views/404/404.vue');

const appTitle = 'Pater999 - Simulatore fisica UNITN';

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home-page',
    component: HomePage,
    meta: {
      title: `${appTitle}`,
      showHeader: true,
    },
  },
  {
    path: '/test',
    name: 'test-page',
    component: TestPage,
    meta: {
      title: `${appTitle} - Test`,
      showHeader: true,
    },
  },
  {
    path: '/domande',
    name: 'questions-page',
    component: QuestionsPage,
    meta: {
      title: `${appTitle} - Lista domande`,
      showHeader: true,
    },
  },
  {
    path: '/404',
    name: '404-page',
    component: ErrorPage,
    meta: {
      title: `${appTitle} - Page 404`,
      showHeader: false,
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
