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
            <v-card-title> Editar uma categoria </v-card-title>
            <v-card-text
              >Altere as informações da categoria de produto

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
                    prepend-icon="mdi-arrow-left"
                    to="/dashboard/list-category"
                    >Voltar a tela inicial</v-btn
                  >
                </v-col>
                <v-col class="text-right">
                  <v-btn
                    variant="elevated"
                    prepend-icon="mdi-content-save"
                    @click="updateCategory()"
                    >Atualizar</v-btn
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
  name: "EditCategory",
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
  mounted() {
    this.overlay = true;

    const token = localStorage.getItem("token");

    const category_id = this.$route.params.id;

    fetch("http://localhost:8080/api/category/" + category_id, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        this.category.name = data.category.name;

        setTimeout(() => {
          this.overlay = false;
        }, 2000);
      });
  },
  methods: {
    async updateCategory() {
      this.overlay = true;
      this.message.show = false;
      this.message.type = "error";

      const token = localStorage.getItem("token");

      let form_data = new FormData();
      form_data.append("name", this.category.name);
      form_data.append("_method", "PATCH");

      const category_id = this.$route.params.id;

      fetch("http://localhost:8080/api/category/" + category_id, {
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
            this.overlay = false;
          }, 2000);
        });
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
