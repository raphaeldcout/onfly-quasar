<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="q-header-auth-header"></q-header>

    <q-page-container class="q-page-container">
      <q-page>
        <div class="container">
          <img src="/main-logo.png" alt="logo onfly" />
          <div class="text-h1">404</div>

          <div class="text-h4" style="opacity: 0.4">
            Página não encontrada.
          </div>

          <q-btn
            class="q-mt-xl"
            color="white"
            text-color="blue"
            unelevated
            to="/"
            label="Voltar para dashboard"
            no-caps
          />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "ErrorNotFound",
};
</script>
<style scoped>
.q-header-auth-header {
  width: 100vw !important;
  height: 48px !important;
  background-color: rgba(255,255,255,0) !important;
  background-image: linear-gradient(90deg,#56247f 26%,#9b51e0 100%) !important;
}

.q-page-container {
  margin-top: 100px;
}

.container {
  gap: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.container img {
  width: 300px;
  height: auto;
}
</style>
