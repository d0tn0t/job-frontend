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
              <v-icon icon="mdi-clipboard"></v-icon>
              Adicionar novo produto
            </v-card-title>
            <v-card-text
              >Insira abaixo as informações do novo produto

              <v-row dense>
                <v-col>
                  <v-text-field
                    label="Nome"
                    v-model="product.name"
                    :rules="[rules.required]"
                    class="mt-3"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row dense>
                <v-col>
                  <v-text-field
                    label="Descrição"
                    v-model="product.description"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row dense>
                <v-col lg="6" md="6" sm="12">
                  <v-text-field
                    label="Validade"
                    v-model="product.validity"
                    :rules="[rules.required]"
                    @click:control="dialog = !dialog"
                    readonly
                  ></v-text-field>
                </v-col>
                <v-col lg="6" md="6" sm="12">
                  <v-text-field
                    label="Preço"
                    v-model="product.price"
                    :rules="[rules.required, rules.money]"
                    prepend-inner-icon="mdi-cash"
                    @blur="formatMoney()"
                  ></v-text-field>
                </v-col>
              </v-row>

              <v-row dense>
                <v-col>
                  <v-select
                    label="Categoria"
                    :items="categories"
                    v-model="product.category_id"
                    item-title="name"
                    item-value="id"
                  ></v-select>
                </v-col>
              </v-row>

              <v-row dense>
                <v-col>
                  <v-img :src="remote_image"></v-img>
                </v-col>
                <v-col>
                  <v-file-input
                    label="Imagem do produto"
                    v-model="product.image"
                    @change="onFileChange"
                  ></v-file-input>
                </v-col>
              </v-row>
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
                    to="list-product"
                    prepend-icon="mdi-clipboard-multiple"
                    >Lista de produtos</v-btn
                  >
                </v-col>
                <v-col class="text-right">
                  <v-btn
                    variant="elevated"
                    @click="addProduct()"
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

    <v-overlay v-model="dialog" class="align-center justify-center" persistent>
      <v-date-picker
        elevation="5"
        position="sticky"
        v-model="selected_date"
      ></v-date-picker>
      <v-btn block @click="changeDate()">Fechar</v-btn>
    </v-overlay>
  </v-container>
</template>

<script lang="ts">
import ScreenOverlay from "@/components/Overlay.vue";

import { defineComponent, ref } from "vue";

export default defineComponent({
  components: { ScreenOverlay },
  name: "AddCategory",
  data: () => {
    return {
      overlay: false,
      categories: [],
      product: {
        name: "",
        description: "",
        validity: "",
        price: "",
        category_id: "",
        image: ref(),
      },
      remote_image: "https://placehold.co/300x200?text=Imagem",
      message: {
        type: "error",
        text: "",
        show: false,
      },
      rules: {
        required: (value: string) => !!value || "Campo obrigatório",
        money: (value: any) => {
          const pattern = /^\d{0,6}(,\d{0,2}){0,1}$/;
          return pattern.test(value) || "Preço inválido";
        },
      },
      dialog: false,
      selected_date: new Date(),
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
    changeDate() {
      let dateToFormat = this.selected_date;

      let year = dateToFormat.getFullYear();

      let month = Number(dateToFormat.getUTCMonth()) + 1;
      let month_selected = month.toString().padStart(2, "0");

      let day = dateToFormat.getUTCDate().toString().padStart(2, "0");

      this.product.validity = `${year}/${month_selected}/${day}`;

      this.dialog = false;
    },
    async addProduct() {
      this.overlay = true;
      this.message.show = false;
      this.message.type = "error";

      const token = localStorage.getItem("token");

      let form_data = new FormData();
      form_data.append("name", this.product.name);
      form_data.append("description", this.product.description);
      form_data.append("validity", this.product.validity);
      form_data.append("price", this.product.price.replace(",", "."));
      form_data.append("category_id", String(this.product.category_id));
      form_data.append("image", this.product.image[0]);

      fetch("http://localhost:8080/api/product/register", {
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
    onFileChange(e: any) {
      const file = e.target.files[0];
      console.log(file);
      this.remote_image = URL.createObjectURL(file);
    },
    formatMoney() {
      let currency = new Intl.NumberFormat("pt-BR", {
        style: "decimal",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      let new_curr = currency.format(
        Number.parseFloat(this.product.price.replace(",", "."))
      );

      this.product.price = String(new_curr);
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
