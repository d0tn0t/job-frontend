<template>
  <div>
    <ScreenOverlay />
    <router-view />
  </div>
</template>

<script lang="ts">
import ScreenOverlay from "@/components/Overlay.vue";

import { defineComponent } from "vue";

export default defineComponent({
  components: { ScreenOverlay },
  name: "MainView",
  mounted() {
    this.$router.push("/dashboard/principal");
  },
});
</script>
