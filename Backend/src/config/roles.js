export const PERMISSIONS = {
  PRODUCTS: {
    CREATE: ["Admin", "Manager"],
    UPDATE: ["Admin", "Manager"],
    DELETE: ["Admin"], 
    READ: ["Admin", "Manager", "Customer"], 
  },
  USERS: {
    CREATE: ["Admin"], 
    DELETE: ["Admin"],
    UPDATE: ["Admin"],
    READ: ["Admin", "Manager"],
  }
};