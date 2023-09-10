<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="q-header-auth-header"></q-header>

    <q-page-container>
      <q-page>
        <div class="container">
          <img src="/main-logo.png" alt="logo onfly" />
          <router-view />
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "AuthLayout",
  components: {},
  data() {
    return {};
  },
};
</script>
<style>
.q-header-auth-header {
  width: 100vw !important;
  height: 48px !important;
  background-color: rgba(255,255,255,0) !important;
  background-image: linear-gradient(90deg,#56247f 26%,#9b51e0 100%) !important;
}

.container {
  width: 100vw;
  height: 80vh;
  gap: 50px;
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
