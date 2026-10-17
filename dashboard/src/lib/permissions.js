
const permissions = {
  Admin: [
    "dashboard.view",

    "products.view",
    "products.create",
    "products.edit",

    "collections.create",

    "users.view",
    "users.create",
    "users.edit",
  ],

  Manager: [
    "dashboard.view",

    "products.view",
    "products.create",
    "products.edit",

    "collections.create",

    "users.view",
  ],

  Customer: [],
};

export default permissions;
