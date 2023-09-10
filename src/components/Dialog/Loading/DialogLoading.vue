<template>
  <q-dialog v-model="show" persistent>
    <q-card class="q-content-card">
      <AnimationsLoadingComponent />
      <p>Aguarde...</p>
    </q-card>
  </q-dialog>
</template>

<script>
import AnimationsLoadingComponent from "../../Animations/AnimationsLoading.vue";

export default {
  name: "DialogLoading",
  components: {
    AnimationsLoadingComponent
  },
  created() {
    this.$root.$on('DialogLoading', (state) => {
      this.show = state ? true : false;
    });
  },
  data() {
    return {
      show: false,
    };
  },
};
</script>

<style scoped>
.q-content-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
