import permissions from "./permissions";


export const hasPermission = (userRoles, requiredPermission) => {
  if (!Array.isArray(userRoles) || !requiredPermission) {
    return false;
  }

  return userRoles.some((role) =>
    permissions[role]?.includes(requiredPermission)
  );
};
