import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
  components,
  directives,
  defaults: {
    VBtn: {
      color: "primary",
    },
    VTextField: {
      density: "compact",
      variant: "outlined",
    },
    VSelect: {
      density: "compact",
      variant: "outlined",
    },
    VFileInput: {
      density: "compact",
      variant: "outlined",
    },
  },
});

createApp(App).use(store).use(router).use(vuetify).mount("#app");
