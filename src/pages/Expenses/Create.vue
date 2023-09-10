<template>
  <div class="q-pa-md">
    <q-page class="flex flex-start">
      <div class="q-pa-lg full-width">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            filled
            v-model="description"
            label="Insira a descrição *"
            hint="Descrição"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
          />

          <q-input
            filled
            type="date"
            v-model="date_registration"
            label="Insira a data *"
            hint="Data da despesa"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Campo obrigatório']"
          />

          <q-input
            filled
            v-model="value"
            label="Insira o valor (R$) *"
            hint="Exemplo: R$ 1.000,00"
            input-class="text-left"
            lazy-rules
            :rules="[
              (val) => (val !== null && val !== '') || 'Campo obrigatório',
            ]"
          />

          <div class="full-width flex flex-start justify-between">
            <q-btn
              label="Limpar"
              type="reset"
              color="primary"
              flat
              class="q-ml-sm"
            />
            <q-btn label="Cadastrar" type="submit" color="primary" />
          </div>
        </q-form>
      </div>
    </q-page>
  </div>
</template>

<script>
export default {
  name: "ExpensesCreate",
  data() {
    return {
      description: "",
      date_registration: "",
      value: 0,
    };
  },
  methods: {
    async onSubmit() {
      const value = parseFloat(this.value.replace(".", "").replace(",", "."));

      try {
        this.$root.$emit("DialogLoading", true);

        await this.$axios.post("/expenses", {
          description: this.description,
          date_registration: this.date_registration,
          value,
        });

        this.$q.notify({
          progress: true,
          type: "positive",
          message: 'Expense registered.',
        });

        // Redirecionar para outra página após o login
        this.$router.push("/expenses");
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
    onReset() {
      this.description = "";
      this.date_registration = "";
      this.value = 0;
    },
  },
};
</script>

<style scoped></style>
