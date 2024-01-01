<template>
  <v-container>
    <ScreenOverlay :show="overlay" />

    <v-row justify="center" class="mt-8">
      <v-col lg="8" md="8" sm="12">
        <v-alert :type="message.type" v-model="message.show">{{
          message.text
        }}</v-alert>

        <v-card class="text-left">
          <v-card-title> Lista de categorias </v-card-title>
          <v-card-text>
            <v-data-table :headers="headers" :items="categories">
              <template v-slot:[`item.actions`]="{ item }">
                <div>
                  <v-icon
                    size="small"
                    icon="mdi-pencil"
                    @click="editItem(item)"
                  ></v-icon>

                  <v-icon
                    size="small"
                    icon="mdi-delete"
                    @click="deleteItem(item)"
                  ></v-icon>
                </div>
              </template>
            </v-data-table>
          </v-card-text>
          <v-card-actions>
            <v-btn size="x-small" variant="text" to="/dashboard/principal"
              >Voltar a tela inicial</v-btn
            >
            <v-btn size="x-small" variant="text" to="/dashboard/add-category"
              >Adicionar nova categoria</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" persistent width="auto">
      <v-card>
        <v-card-title class="text-h5"> Remover categoria </v-card-title>
        <v-card-text
          >Deseja mesmo remover a categoria {{ category_name }}?</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green-darken-1" variant="text" @click="dialog = false">
            Cancelar
          </v-btn>
          <v-btn
            color="red-darken-1"
            variant="elevated"
            @click="confirmDelete()"
          >
            Remover
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script lang="ts">
import ScreenOverlay from "@/components/Overlay.vue";

import { defineComponent } from "vue";

export default defineComponent({
  components: { ScreenOverlay },
  name: "ListCategory",
  data: () => {
    return {
      overlay: true,
      categories: [],
      message: {
        type: "error",
        text: "",
        show: false,
      },
      headers: [
        { title: "Nome", value: "name", key: "name" },
        { title: "Ações", key: "actions", sortable: false },
      ],
      dialog: false,
      category_name: "",
      category_id: "",
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.overlay = true;
      this.categories = [];

      const token = localStorage.getItem("token");

      fetch("http://localhost:8080/api/category/", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.categories = data.categories;

          setTimeout(() => {
            this.overlay = false;
          }, 2000);
        });
    },
    editItem(item: any) {
      console.log(item.id);
      this.$router.push("edit-category/" + item.id);
      //   let editedIndex = this.categories.indexOf(item);
      //   this.editedItem = Object.assign({}, item);
      //   this.dialog = true;
    },
    deleteItem(item: any) {
      this.category_name = item.name;
      this.category_id = item.id;
      this.dialog = true;
    },
    confirmDelete() {
      this.dialog = false;
      this.overlay = true;

      const token = localStorage.getItem("token");

      fetch("http://localhost:8080/api/category/" + this.category_id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status != undefined) {
            this.message.type = data.status;
          }

          this.message.text = data.message;
          this.message.show = true;

          this.loadData();

          setTimeout(() => {
            this.overlay = false;
          }, 2000);
        });
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
