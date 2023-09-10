
const routes = [
  // Routes publics
  {
    path: "/login",
    component: () => import("layouts/Auth/AuthLayout.vue"),
    children: [{ path: "/login", component: () => import("pages/Login.vue") }],
  },
  {
    path: "/cadastrar",
    component: () => import("layouts/Auth/AuthLayout.vue"),
    children: [
      { path: "/cadastrar", component: () => import("pages/Register.vue") },
    ],
  },
  // Routes privates
  {
    path: "/dashboard",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }],
  },
  {
    path: "/expenses",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/expenses", component: () => import("pages/Expenses/List.vue") },
    ],
  },
  {
    path: "/expenses/create",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/expenses/create",
        component: () => import("pages/Expenses/Create.vue"),
      },
    ],
  },
  {
    path: "/expenses/edit/:id",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/expenses/edit/:id",
        component: () => import("pages/Expenses/Edit.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes
