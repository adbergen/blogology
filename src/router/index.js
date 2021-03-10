import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/",
      component: () => import("layouts/MainLayout.vue"),
      children: [
        {
          path: "/",
          component: () => import("src/pages/Login.vue"),
          name: "Login",
          meta: {
            requiresGuest: true
          }
        },
        {
          path: "/home",
          component: () => import("src/pages/Home.vue"),
          name: "Home",
          meta: {
            requiresAuth: true
          }
        },
        {
          path: "/about",
          component: () => import("src/pages/About.vue"),
          name: "About"
        }
      ]
    },
    {
      path: "*",
      component: () => import("pages/Error404.vue")
    }
  ]
});

// Nav Guard
router.beforeEach((to, from, next) => {
  // Check for requiresAuth guard
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if NO logged user
    if (!firebase.auth().currentUser) {
      // Go to login
      next({
        path: "/",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Check if NO logged user
    if (firebase.auth().currentUser) {
      // Go to login
      next({
        path: "/home",
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
});

export default router;
