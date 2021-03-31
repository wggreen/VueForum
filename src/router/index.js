import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Create from "../views/Create.vue";
import Details from "../views/Details.vue";
import Feed from "../views/Feed.vue";
import MyMemes from "../views/MyMemes";
import { auth } from "../firebase";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/create",
    name: "Create",
    component: Create,
    beforeEnter: (to, from, next) => {
      if (!auth.currentUser) {
        return next({
          path: "/",
          query: { unauthorized: true },
        });
      } else {
        return next();
      }
    }
  },
  {
    path: "/meme/:memeId",
    name: "Details",
    component: Details,
  },
  {
    path: "/feed",
    name: "Feed",
    component: Feed,
  },
  {
    path: "/my-memes",
    name: "MyMemes",
    component: MyMemes,
    beforeEnter: (to, from, next) => {
      if (!auth.currentUser) {
        return next({
          path: "/",
          query: { unauthorized: true },
        });
      } else {
        return next();
      }
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
