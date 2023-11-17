<template>
  <div>
    <!-- ... autres parties de votre template -->

    <div class="main-content">
      <header>
        <!-- ... autres parties de votre en-tête -->

        <router-view />
        <div >
          <router-link :to="{ name: 'addUser' }">
            <span class="bx bx-user-plus"></span>
            <span>Ajouter un utilisateur</span>
          </router-link>
          <table class="table table-striped">
            <thead thead-dark>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nom</th>
                <th scope="col">Prénom</th>
                <th scope="col">Email</th>
                <th scope="col">Actions</th> <!-- Nouvelle colonne pour les actions -->
              </tr>
            </thead>
            <tbody>
              <!-- Utilisez une boucle v-for pour afficher chaque utilisateur dans une ligne du tableau -->
              <tr v-for="user in allUsers" :key="user.id">
                <td>{{ user.id }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.surname }}</td>
                <td>{{ user.email }}</td>
                <td>
                  <!-- Ajoutez des boutons pour modifier et supprimer chaque utilisateur -->
                  <button @click="editUser(user.id)" class="btn btn-primary">Modifier</button>
                  <button @click="deleteUser(user.id)" class="btn btn-danger">Supprimer</button>
                </td>
                <!-- Ajoutez d'autres colonnes selon les informations que vous souhaitez afficher -->
              </tr>
            </tbody>
          </table>
        </div>
      </header>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "boxicons";
export default {
  name: "AllUsers",
  data() {
    return {
      allUsers: [],
    };
  },

  mounted() {
    this.getAllUsers();
  },

  methods: {
    async getAllUsers() {
      try {
        const response = await axios.get("http://localhost:4000/api/usersAll");
        this.allUsers = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des informations des utilisateurs :", error);
      }
    },

    editUser(userId) {
      // Rediriger vers la page de modification avec l'ID de l'utilisateur
      this.$router.push({ name: 'editUser', params: { userId } });
    },

    async deleteUser(userId) {
      try {
        // Effectuer une requête DELETE pour supprimer l'utilisateur
        await axios.delete(`http://localhost:4000/api/users/${userId}`);
        
        // Mettez à jour la liste des utilisateurs après la suppression
        this.getAllUsers();
      } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur :", error);
      }
    },
  },
};
</script>

<style>
/* Ajoutez des styles CSS selon vos besoins */
</style>
