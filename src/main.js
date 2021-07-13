import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import api from "@/api";

import moment from "moment";

Vue.prototype.moment = moment;
Vue.prototype.$api = api;
Vue.prototype.env = {};

Vue.prototype.wait = async function(ms) {
  return new Promise((resolve) => setTimeout(() => resolve(), ms));
};

import { Auth0Plugin } from "./auth";

async function main() {
  let resp = await api.get("/api/env");
  let env = resp.data;
  Vue.prototype.env = env;

  Vue.use(Vuetify);
  let vuetify = new Vuetify({
    theme: {
      themes: {
        light: {
          primary: "#eb5600",
          secondary: "#666666",
          accent: "#8c9eff",
          error: "#b71c1c",
        },
      },
    },
  });

  Vue.use(Auth0Plugin, {
    domain: env.AUTH0_DOMAIN,
    clientId: env.AUTH0_CLIENT_ID,
    onRedirectCallback: (appState) => {
      router.push(
        appState && appState.targetUrl
          ? appState.targetUrl
          : window.location.pathname
      );
    },
  });

  Vue.config.productionTip = false;

  new Vue({
    el: "#app",
    store,
    router,
    api,
    vuetify,
    render: (h) => h(App),
  });
}

main();
