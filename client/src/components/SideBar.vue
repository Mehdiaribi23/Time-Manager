<!-- Sidebar.vue -->

<template>
    <div class="sidebar">
      <div class="sidebar-container">
        <div class="brand">
          <h2>
            <span class="bx bxs-doughnut-chart"></span> Hello {{ user.name }}
          </h2>
        </div>
        <div class="sidebar-avartar">
          <div>
            <img src="../assets/user-circle-regular-24.png" alt="time" />
          </div>
          <div class="avartar-info">
            <div class="avartar-text">
              <h6>{{ user.surname }} {{ user.name }}</h6>
              <small>{{ user.email }}</small>
            </div>
            <span class="bx bxs-chevron-down"></span>
          </div>
        </div>
        <!-- Reste du contenu de la barre latérale -->
        <!-- ... -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name:"SideBar",
    props: {
      user: {
        type: Object,
        required: true,
      },
    },
    methods: {
      // Ajoutez les méthodes spécifiques à la barre latérale ici si nécessaire
    },
  };
  </script>
  
  <style scoped>
    /* Ajoutez vos styles ici si nécessaire */
  </style>
  