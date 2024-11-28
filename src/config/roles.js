export const rolePermissions = {
  admin: [
    {
      path: "register-dog",
      label: "Registrar Perro",
      icon: "fas fa-pen-square",
    },
    {
      path: "static-dogs",
      label: "Perros Permanentes",
      icon: "fas fa-dog",
    },
    {
      path: "adoption-dogs",
      label: "Perros Temporales",
      icon: "fas fa-paw",
    },
    {
      path: "adopted-dogs",
      label: "Perros adoptados",
      icon: "fas fa-hand-holding-heart",
    },
    {
      path: "form-visit",
      label: "Registrar Visita",
      icon: "fas fa-clipboard-list",
    },
    {
      path: "general-table",
      label: "Historial de Visitas",
      icon: "fas fa-list",
    },
    {
      path: "register-user",
      label: "Crear usuario",
      icon: "fas fa-user-plus",
    },
  ],
  auxiliar: [
    {
      path: "adopted-dogs",
      label: "Perros adoptados",
      icon: "fas fa-paw",
    },
    {
      path: "form-visit",
      label: "Registrar Visita",
      icon: "fas fa-clipboard-list",
    },
    {
      path: "general-table",
      label: "Historial de Visitas",
      icon: "fas fa-list",
    },
  ],
};

// Si necesitas validar roles en otras partes del código
export const roles = Object.keys(rolePermissions); // ['admin', 'auxiliar']
