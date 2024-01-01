<template>
  <v-container>
    <ScreenOverlay :show="overlay" />
    <v-row justify="center" class="mt-8">
      <v-col lg="6" md="8" sm="12">
        <v-alert :type="message.type" v-model="message.show">{{
          message.text
        }}</v-alert>

        <v-card class="text-left">
          <v-form ref="registerForm">
            <v-card-title> Cadastre-se </v-card-title>
            <v-card-text
              >Preencha os campos abaixo para criar seu login de acesso

              <v-text-field
                label="Nome"
                v-model="user.name"
                class="mt-3"
                :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                label="E-mail"
                v-model="user.email"
                :rules="[rules.required]"
              ></v-text-field>

              <v-text-field
                label="Senha"
                type="password"
                v-model="user.password"
                :rules="[rules.required]"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-row>
                <v-col>
                  <router-link to="/">Voltar para o login</router-link>
                </v-col>
                <v-col class="text-right">
                  <v-btn @click="userRegistration()">Registrar</v-btn>
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
  name: "RegistrationPage",
  data: function () {
    return {
      user: {
        name: "",
        email: "",
        password: "",
      },
      overlay: false,
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
    async userRegistration() {
      this.overlay = true;
      this.message.show = false;
      this.message.type = "error";

      let form_data = new FormData();
      form_data.append("name", this.user.name);
      form_data.append("email", this.user.email);
      form_data.append("password", this.user.password);

      fetch("http://localhost:8080/api/register", {
        method: "POST",
        body: form_data,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status != undefined) {
            this.message.type = data.status;
          }

          this.message.text = data.message;
          this.message.show = true;

          setTimeout(() => {
            const form_ref: any = this.$refs.registerForm;
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
