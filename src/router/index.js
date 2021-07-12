import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import Page404 from "@/views/Page404.vue";
import ProfileView from "@/views/ProfileView.vue";
import ProfileEdit from "@/views/ProfileEdit.vue";
import Dashboard from "@/views/Dashboard.vue";
import ProjectView from "@/views/ProjectView.vue";
import ProjectEdit from "@/views/ProjectEdit.vue";

import guards from "@/router/guards";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      title: (route) => "App: Home",
    },
  },
  {
    path: "/about",
    name: "about",
    component: About,
    meta: {
      title: (route) => "App: About",
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: {
      title: (route) => "App: Dashboard",
      guards: [guards.authGuard],
    },
  },

  {
    path: "/square-store-snippet",
    name: "Square Store Plugin",
    component: () => import("@/views/SquareStorePlugin.vue"),
  },

  {
    path: "/oauth-redirect",
    name: "Square OAuth Redirect",
    component: () => import("@/components/SquareOAuthConnect.vue"),
  },

  {
    path: "/profile/view/:id",
    name: "view-profile",
    component: ProfileView,
    meta: {
      title: (route) => "App: User Profile",
      guards: [guards.authGuard],
    },
  },
  {
    path: "/profile/edit/:id",
    name: "edit-profile",
    component: ProfileEdit,
    meta: {
      title: (route) => "App: Edit User Profile",
      guards: [guards.authGuard],
    },
  },
  {
    path: "/project/new",
    name: "new-project",
    component: ProjectEdit,
    meta: {
      title: (route) => "App: New Project",
      guards: [guards.authGuard],
    },
  },
  {
    path: "/project/edit/:id",
    name: "edit-project",
    component: ProjectEdit,
    meta: {
      title: (route) => "App: Edit Project",
      guards: [guards.authGuard, guards.projectEditGuard],
    },
  },
  {
    path: "/project/view/:id",
    name: "view-project",
    component: ProjectView,
    meta: {
      title: (route) => "App: View Project",
      guards: [guards.authGuard],
    },
  },
  {
    path: "/404",
    component: Page404,
    meta: {
      title: (route) => "App: Unknown",
    },
  },
  {
    path: "*",
    component: Page404,
    meta: {
      title: (route) => "App: Unknown",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes: routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title(to);
  }
  if (!to.meta.guards || to.meta.guards.length < 1) return next();
  return guards.pipeline(to, from, next, to.meta.guards);
});

export default router;
