<template>
  <v-container>
    <v-row justify="center" class="mt-8">
      <v-col lg="8" md="8" sm="12">
        <v-alert :type="message.type" v-model="message.show">{{
          message.text
        }}</v-alert>

        <v-card class="text-left">
          <v-form ref="loginForm">
            <v-card-title> Bem vindo </v-card-title>
            <v-card-text
              >Informe abaixo suas credenciais de acesso

              <v-text-field
                label="E-mail"
                v-model="user.email"
                :rules="[rules.required]"
                class="mt-3"
              ></v-text-field>

              <v-text-field
                type="password"
                label="Senha"
                v-model="user.password"
                :rules="[rules.required]"
              ></v-text-field>
            </v-card-text>
            <v-card-actions>
              <v-row>
                <v-col>
                  <v-btn
                    size="x-small"
                    to="/registration"
                    prepend-icon="mdi-account-plus"
                    >Cadastre-se aqui</v-btn
                  >
                </v-col>
                <v-col class="text-right">
                  <v-btn
                    variant="elevated"
                    prepend-icon="mdi-login"
                    type="submit"
                    @click="userLogin()"
                    >Entrar</v-btn
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
  name: "HomeView",
  data: () => {
    return {
      overlay: false,
      user: {
        email: "",
        password: "",
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
    async userLogin() {
      this.overlay = true;
      this.message.show = false;
      this.message.type = "error";

      let form_data = new FormData();
      form_data.append("email", this.user.email);
      form_data.append("password", this.user.password);

      fetch("http://localhost:8080/api/login", {
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

          if (data.authorization != undefined) {
            const userToken: string = data.authorization.token;

            localStorage.setItem("token", userToken);
          }

          setTimeout(() => {
            if (data.authorization != undefined) {
              this.$router.push("dashboard");
            }
            // const form_ref: any = this.$refs.loginForm;
            // form_ref.reset();

            this.overlay = false;
          }, 2000);
        });
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
