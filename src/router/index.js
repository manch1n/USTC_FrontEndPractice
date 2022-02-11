import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue"

const routes = [
  {
    path: '/',
    redirect: '/home/register'
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    children: [
      {
        path: 'register',
        name: 'Register',
        component: () =>
          import("../views/Register.vue"),
      },
      {
        path: 'login',
        name: 'Login',
        component: () =>
          import("../views/Login.vue"),
      }
    ]
  },
  {
    path: '/trans',//FIXME:to be delete
    redirect: '/trans/information'
  },
  {
    path: '/trans/information',//FIXME:to be delete
    redirect: '/trans/information/change'
  },
  {
    path: "/trans",
    name: "Trans",
    component: () =>
      import("../views/Trans.vue"),
    children: [
      {
        path: 'information',
        component: () =>
          import("../views/PersonalInfo.vue"),
        children: [
          {
            path: 'change',
            component: () =>
              import("../views/PerInfoChange.vue")
          }
        ]
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
