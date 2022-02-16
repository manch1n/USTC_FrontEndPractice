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
  // {
  //   path: '/trans',//FIXME:to be delete
  //   redirect: '/trans/information'
  // },
  // {
  //   path: '/trans/information',//FIXME:to be delete
  //   redirect: '/trans/information/change'
  // },
  {
    path: "/trans",
    name: "Trans",
    component: () =>
      import("../views/Trans.vue"),
    children: [
      {
        path: 'information',
        name: 'Information',
        component: () =>
          import("../views/PersonalInfo.vue"),
        props: true,
        children: [
          {
            path: 'change',
            name: 'Change',
            component: () =>
              import("../views/PerInfoChange.vue"),
            props: true
          },
          {
            path: 'passwd',
            name: 'Passwd',
            component: () =>
              import("../views/PerInfoPasswd.vue"),
            props: true
          },
          {
            path: 'apply',
            name: 'Apply',
            component: () =>
              import("../views/ApplyLevel.vue"),
            props: true
          },
          {
            path: 'judge',
            name: 'Judge',
            component: () =>
              import("../views/JudgeLevel.vue"),
            props: true
          }
        ]
      },
      {
        path: 'chat',
        name: 'Chat',
        component: () =>
          import("../views/Chat.vue"),
        props: true,
      },
      {
        path: 'task',
        name: 'Task',
        component: () =>
          import("../views/Task.vue")
      },
      {
        path: 'files',
        name: 'Files',
        component: () =>
          import("../views/Files.vue"),
        props: true
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
