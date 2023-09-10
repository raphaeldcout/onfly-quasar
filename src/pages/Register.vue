<template>
  <q-card class="login-register">
    <q-card-section class="bg-white">
      <q-input v-model="name" label="Nome" />
      <q-input v-model="email" label="E-mail" type="email" />
      <q-input v-model="password" label="Senha" type="password" />
      <q-input
        v-model="password_confirmation"
        label="Confirmar senha"
        type="password"
      />
      <div class="content-button">
        <q-btn @click="redirectLogin" outline color="primary" label="Logar" />
        <q-btn @click="registerAction" color="primary" label="Cadastrar" />
      </div>
    </q-card-section>

    <DialogLoadingComponent />
  </q-card>
</template>

<script>
import DialogLoadingComponent from "../components/Dialog/Loading/DialogLoading.vue";

export default {
  name: "Register",
  components: {
    DialogLoadingComponent,
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    };
  },
  methods: {
    async registerAction() {
      try {
        this.$root.$emit("DialogLoading", true);

        await this.$axios.post("/register", {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
        });

        const response = await this.$axios.post("/login", {
          email: this.email,
          password: this.password,
          device_name: "SPA Application",
        });

        // Armazenar token no Local Storage
        localStorage.setItem("access_token", response.data.data.access_token);

        // Redirecionar para outra página após o login
        this.$router.push("/dashboard");
      } catch (error) {
        this.$q.notify({
          progress: true,
          type: "negative",
          message: error.response.data.message
            ? error.response.data.message
            : `Falha ao realizar cadastro.`,
        });
      } finally {
        this.$root.$emit("DialogLoading", false);
      }
    },
    redirectLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.login-register {
  width: 400px;
  margin: 0 auto;
  background-color: rgb(225, 225, 225);
}

.content-button {
  margin: 50px 0px 10px 0px;
  text-align: end;
  display: flex;
  justify-content: space-between;
}
</style>
