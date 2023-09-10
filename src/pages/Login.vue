<template>
  <q-card class="login-card">
    <q-card-section class="bg-white">
      <q-input v-model="email" label="E-mail" type="email" />
      <q-input v-model="password" label="Senha" type="password" />

      <div class="content-button">
        <q-btn
          @click="redirectRegister"
          outline
          color="primary"
          label="Cadastrar"
        />
        <q-btn @click="loginAction" color="primary" label="Logar" />
      </div>
    </q-card-section>

    <DialogLoadingComponent />
  </q-card>
</template>

<script>
import DialogLoadingComponent from "../components/Dialog/Loading/DialogLoading.vue";

export default {
  name: "Login",
  components: {
    DialogLoadingComponent,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async loginAction() {
      try {
        this.$root.$emit("DialogLoading", true);

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
            : `Falha na autenticação.`,
        });
      } finally {
        this.$root.$emit("DialogLoading", false);
      }
    },
    redirectRegister() {
      this.$router.push("/cadastrar");
    },
  },
};
</script>

<style scoped>
.login-card {
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
