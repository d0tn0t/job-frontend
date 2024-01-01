<template>
  <div>
    <v-row justify="center" class="mt-8">
      <v-col lg="8" md="8" sm="12">
        <v-card>
          <v-card-title> Categorias de produtos </v-card-title>
          <v-card-text>
            <v-btn-group>
              <v-btn to="add-category">Adicionar categoria</v-btn>
              <v-btn to="list-category">Lista de categorias</v-btn>
            </v-btn-group>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-8">
      <v-col lg="8" md="8" sm="12">
        <v-card>
          <v-card-title> Produtos </v-card-title>
          <v-card-text>
            <v-btn-group>
              <v-btn to="add-product">Adicionar produto</v-btn>
              <v-btn to="list-product">Lista de produtos</v-btn>
            </v-btn-group>
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
