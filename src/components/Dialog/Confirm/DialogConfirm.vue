<template>
  <q-dialog v-model="show" persistent>
    <q-card>
      <q-card-section class="row items-center">
        <q-avatar icon="warning" color="warning" text-color="white" />
        <span class="q-ml-sm">Deseja realmente realizar essa operação?</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn
          flat
          label="Confirmar"
          color="red"
          @click="confirm()"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "DialogConfirm",
  created() {
    this.$root.$on("DialogConfirm", (state) => {
      this.show = state.show ? true : false;
      this.content = state.content ? state.content : null;
      this.emit = state.emit ? state.emit : "";
    });
  },
  data() {
    return {
      show: false,
      content: null,
      emit: "",
    };
  },
  methods: {
    confirm() {
      this.$root.$emit("DialogConfirmCb", {
        content: this.content,
      });
    },
  },
};
</script>

<style scoped></style>
