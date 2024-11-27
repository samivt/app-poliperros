export const rolePermissions = {
  admin: [
    {
      path: "register-dog",
      label: "Registrar Perro",
      icon: "fas fa-dog",
      subOptions: [
        {
          path: "static",
          label: "Perros permanentes",
          icon: "fas fa-dog",
        },
        {
          path: "adoption",
          label: "Perros temporales",
          icon: "fas fa-paw",
        },
      ],
    },
    {
      path: "update-dog",
      label: "Actualizar Perro",
      icon: "fas fa-dog",
      subOptions: [
        {
          path: "static",
          label: "Perros permanentes",
          icon: "fas fa-dog",
        },
        {
          path: "adoption",
          label: "Perros temporales",
          icon: "fas fa-paw",
        },
      ],
    },

    {
      path: "visit",
      label: "Seguimiento",
      icon: "fas fa-clipboard-list",
      subOptions: [
        {
          path: "general-table",
          label: "Historial de visitas",
          icon: "fas fa-clipboard-list",
        },
        {
          path: "form-visit",
          label: "Formulario de seguimiento",
          icon: "fas fa-clipboard-list",
        },
      ],
    },
  ],
  auxiliar: [
    {
      path: "visit",
      label: "Seguimiento",
      icon: "fas fa-clipboard-list",
      subOptions: [
        {
          path: "general-table",
          label: "Historial de visitas",
          icon: "fas fa-clipboard-list",
        },
        {
          path: "form-visit",
          label: "Formulario de seguimiento",
          icon: "fas fa-clipboard-list",
        },
      ],
    },
  ],
};

// Si necesitas validar roles en otras partes del código
export const roles = Object.keys(rolePermissions); // ['ADMIN', 'AUXILIAR']
