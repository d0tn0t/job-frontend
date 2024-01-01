import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/registration",
    name: "registration",
    component: () =>
      import(
        /* webpackChunkName: "registration" */ "../views/RegistrationView.vue"
      ),
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () =>
      import(
        /* webpackChunkName: "dashboard" */ "../views/dashboard/MainView.vue"
      ),
    children: [
      {
        path: "principal",
        name: "principal",
        component: () => import("@/components/HomeDashboard.vue"),
      },
      {
        path: "add-category",
        name: "add-category",
        component: () => import("@/views/dashboard/AddCategory.vue"),
      },
      {
        path: "list-category",
        name: "list-category",
        component: () => import("@/views/dashboard/ListCategory.vue"),
      },
      {
        path: "edit-category/:id",
        name: "edit-category",
        component: () => import("@/views/dashboard/EditCategory.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
