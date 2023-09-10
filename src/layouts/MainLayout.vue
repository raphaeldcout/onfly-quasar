<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-primary">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title></q-toolbar-title>

        <div class="q-gutter-sm">
          <q-chip>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>

            <q-spinner v-if="!user" color="primary" size="1em" />
            <span v-else>{{ user ? user.name : "" }}</span>
          </q-chip>
        </div>

        <q-btn @click="logoutAction" flat round dense icon="logout"
          >&nbsp;&nbsp;Sair</q-btn
        >
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8"> Geral </q-item-label>
        <EssentialLink
          v-for="link in generalLinks"
          :key="link.title"
          v-bind="link"
        />

        <q-item-label header class="text-grey-8"> Despesas </q-item-label>
        <EssentialLink
          v-for="link in expensesLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <DialogLoadingComponent />
    <DialogConfirmComponent />
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import DialogLoadingComponent from "components/Dialog/Loading/DialogLoading.vue";
import DialogConfirmComponent from "components/Dialog/Confirm/DialogConfirm.vue";

const generalLinks = [
  {
    title: "Dashboard",
    icon: "dashboard",
    link: "/dashboard",
  },
];

const expensesLinks = [
  {
    title: "Visualizar",
    caption: "Visualizar despesas",
    icon: "list",
    link: "/expenses",
  },
  {
    title: "Cadastrar",
    caption: "Cadastrar despesas",
    icon: "draw",
    link: "/expenses/create",
  },
];

export default {
  name: "MainLayout",
  components: {
    EssentialLink,
    DialogLoadingComponent,
    DialogConfirmComponent,
  },
  mounted() {
    this.getMe();
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  data() {
    return {
      leftDrawerOpen: false,
      generalLinks: generalLinks,
      expensesLinks: expensesLinks,
      user: null,
      loadingMe: false,
    };
  },
  methods: {
    async logoutAction() {
      try {
        this.$root.$emit("DialogLoading", true);

        await this.$axios.post("/logout");

        // Limpa o access_token e o usuário no local storage
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");

        // Redirecionar para outra página após o login
        this.$router.push("/login");
      } catch (error) {
        this.$q.notify({
          progress: true,
          type: "negative",
          message: error.response.data.message
            ? error.response.data.message
            : `Ops. ocorreu um erro. Tente novamente.`,
        });
      } finally {
        this.$root.$emit("DialogLoading", false);
      }
    },
    async getMe() {
      try {
        this.loadingMe = true;
        const response = await this.$axios.get("/me");

        // Armazenar token no Local Storage
        localStorage.setItem("user", JSON.stringify(response.data.data));

        this.user = response.data.data;
      } catch (_) {
      } finally {
        this.loadingMe = false;
      }
    },
  },
};
</script>
