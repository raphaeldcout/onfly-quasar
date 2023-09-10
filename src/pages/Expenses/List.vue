<template>
  <div class="q-pa-md">
    <q-table
      title="Visualizar despesas"
      :data="data"
      :columns="columns"
      row-key="id"
      :loading="loading"
    >
      <template v-slot:body-cell-actions="props">
        <div class="content-actions" :props="props">
          <q-btn
            class="mt"
            color="warning"
            icon="mode_edit"
            @click="onEdit(props.row)"
          ></q-btn>
          <q-btn color="red" icon="delete" @click="onDelete(props.row)"></q-btn>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
import { date } from "quasar";

export default {
  name: "ExpensesList",
  created() {
    this.$root.$on("DialogConfirmCb", (state) => {
      this.confirmDelete(state.content);
    });
  },
  mounted() {
    this.getExpenses();
  },
  data() {
    return {
      columns: [
        {
          name: "id",
          required: true,
          label: "Código",
          align: "left",
          field: (row) => row.id,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "description",
          required: true,
          label: "Descrição",
          align: "left",
          field: (row) => row.description,
          format: (val) => `${val}`,
          sortable: true,
        },
        {
          name: "date_registration",
          required: true,
          label: "Data da despesa",
          align: "center",
          field: (row) => row.date_registration,
          format: (val) => {
            let day = new Date(val);
            day.setDate(day.getDate() + 1);
            return `${date.formatDate(day, "DD/MM/YYYY")}`;
          },
          sortable: true,
        },
        {
          name: "value",
          required: true,
          label: "Valor da despesa",
          align: "center",
          field: (row) => row.value,
          format: (val) => {
            const value = val
              .toFixed(2)
              .replace(".", ",")
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
            return `R$ ${value}`;
          },
          sortable: true,
        },
        {
          name: "created_at",
          required: true,
          label: "Criado em",
          align: "center",
          field: (row) => row.created_at,
          format: (val) => `${date.formatDate(val, "DD/MM/YYYY HH:mm")}`,
          sortable: true,
        },
        {
          name: "updated_at",
          required: true,
          label: "Atualizado em",
          align: "center",
          field: (row) => row.updated_at,
          format: (val) => `${date.formatDate(val, "DD/MM/YYYY HH:mm")}`,
          sortable: true,
        },
        { name: "actions", label: "Ação", align: "center" },
      ],
      data: [],
      loading: true,
    };
  },
  methods: {
    async getExpenses() {
      try {
        const response = await this.$axios.get("/expenses");

        this.data = response.data.data;
      } catch (error) {
        this.$q.notify({
          progress: true,
          type: "negative",
          message: error.response.data.message
            ? error.response.data.message
            : `Ops. ocorreu um erro. Tente novamente.`,
        });
      } finally {
        this.loading = false;
      }
    },
    onEdit(row) {
      this.$router.push("/expenses/edit/" + row.id);
    },
    onDelete(row) {
      this.$root.$emit("DialogConfirm", {
        show: true,
        emit: "delete_expense",
        content: row,
      });
    },
    async confirmDelete(content) {
      try {
        this.$root.$emit("DialogLoading", true);

        await this.$axios.delete(`/expenses/${content.id}`);

        this.$q.notify({
          progress: true,
          type: "positive",
          message: 'Expense deleted.',
        });

        // Realizar a busca das expenses novamente.
        this.getExpenses();
      } catch (error) {
        console.error(error.response);
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
  },
};
</script>

<style scoped>
.content-actions {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
</style>
