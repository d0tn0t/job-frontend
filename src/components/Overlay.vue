<template>
  <v-overlay
    v-model="is_visible"
    class="align-center justify-center"
    persistent
  >
    <v-progress-circular
      indeterminate
      model-value="20"
      :size="113"
      :width="12"
    ></v-progress-circular>
  </v-overlay>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ScreenOverlay",
  data: () => {
    return {
      is_visible: false,
    };
  },
  props: {
    show: Boolean,
  },
  watch: {
    show(newVal) {
      this.is_visible = newVal;
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
