<template>
  <div>
    <v-row justify="center" class="mt-8">
      <v-col lg="8" md="8" sm="12">
        <v-card>
          <v-card-title>
            <v-icon icon="mdi-tag"></v-icon>
            Categorias de produtos
          </v-card-title>
          <v-card-text>
            <v-btn
              to="add-category"
              variant="elevated"
              class="mr-3"
              prepend-icon="mdi-tag-plus"
              >Adicionar categoria</v-btn
            >
            <v-btn
              to="list-category"
              variant="elevated"
              prepend-icon="mdi-tag-multiple"
              >Lista de categorias</v-btn
            >
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-8">
      <v-col lg="8" md="8" sm="12">
        <v-card>
          <v-card-title>
            <v-icon icon="mdi-clipboard"></v-icon>
            Produtos
          </v-card-title>
          <v-card-text>
            <v-btn
              to="add-product"
              variant="elevated"
              class="mr-3"
              prepend-icon="mdi-clipboard-plus"
              >Adicionar produto</v-btn
            >
            <v-btn
              to="list-product"
              variant="elevated"
              prepend-icon="mdi-clipboard-multiple"
              >Lista de produtos</v-btn
            >
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeDashboard",
});
</script>
