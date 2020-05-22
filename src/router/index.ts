import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Firebase from "firebase";

import store from "../store";
import Home from '../views/Home.vue'



Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const currentUser = Firebase.auth().currentUser;

  if (requiresAuth) {
    if (!currentUser && !store.getters.isSignedIn) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      }); 
    } else {
      next();
    }
  } else {
    next(); // next() を常に呼び出すようにしてください!
  }
  
});

export default router
