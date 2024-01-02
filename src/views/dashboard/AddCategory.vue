<template>
  <v-container>
    <ScreenOverlay :show="overlay" />

    <v-row justify="center" class="mt-8">
      <v-col lg="8" md="8" sm="12">
        <v-alert :type="message.type" v-model="message.show">{{
          message.text
        }}</v-alert>

        <v-card class="text-left">
          <v-form ref="categoryForm">
            <v-card-title>
              <v-icon icon="mdi-tag-plus"></v-icon>
              Adicionar nova categoria
            </v-card-title>
            <v-card-text
              >Informe abaixo o nome da categoria de produto

              <v-text-field
                label="Nome"
                v-model="category.name"
                :rules="[rules.required]"
                class="mt-3"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-row>
                <v-col>
                  <v-btn
                    size="x-small"
                    to="principal"
                    prepend-icon="mdi-arrow-left"
                    >Voltar a tela inicial</v-btn
                  >
                  <v-btn
                    size="x-small"
                    to="list-category"
                    append-icon="mdi-arrow-right"
                    >Lista de categorias</v-btn
                  >
                </v-col>
                <v-col class="text-right">
                  <v-btn
                    variant="elevated"
                    @click="addCategory()"
                    prepend-icon="mdi-content-save"
                    >Registrar</v-btn
                  >
                </v-col>
              </v-row>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import ScreenOverlay from "@/components/Overlay.vue";

import { defineComponent } from "vue";

export default defineComponent({
  components: { ScreenOverlay },
  name: "AddCategory",
  data: () => {
    return {
      overlay: false,
      category: {
        name: "",
      },
      message: {
        type: "error",
        text: "asd asda",
        show: false,
      },
      rules: {
        required: (value: string) => !!value || "Campo obrigatório",
      },
    };
  },
  methods: {
    async addCategory() {
      this.overlay = true;
      this.message.show = false;
      this.message.type = "error";

      const token = localStorage.getItem("token");

      let form_data = new FormData();
      form_data.append("name", this.category.name);

      fetch("http://localhost:8080/api/category/register", {
        method: "POST",
        body: form_data,
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

          setTimeout(() => {
            const form_ref: any = this.$refs.categoryForm;
            form_ref.reset();

            this.overlay = false;
          }, 2000);
        });
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
