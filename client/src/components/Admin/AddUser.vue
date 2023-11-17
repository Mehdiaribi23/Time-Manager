<template>
  <div>
    <h1>Ajouter un utilisateur</h1>
    
    <form @submit.prevent="addUser" class="w-50 mx-auto mt-5" >
      <label for="name" class="form-label">Nom:</label>
      <input type="text" id="name" v-model="user.name" class="form-control" required>

      <label for="surname" class="form-label">Prénom:</label>
      <input type="text" id="surname" v-model="user.surname"  class="form-control" required>

      <label for="email" class="form-label">Email:</label>
      <input type="email" id="email" v-model="user.email" class="form-control"  required>

      <label for="password" class="form-label">Mot de passe:</label>
      <input type="password" id="password" v-model="user.password"  class="form-control" required>

      <label for="roles" class="form-label">Rôle:</label>
      <select class="form-select" v-model="selectedRole">
        <option value="user">user</option>
        <option value="admin">admin</option>
      </select>
<br>
      <button type="submit">Ajouter</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AddUser",
  data() {
    return {
      user: {
        name: "",
        surname: "",
        email: "",
        password: "",
        roles:[],
      },
      url: "localhost",
      selectedRole: "",
    };
  },
  methods: {
    async addUser() {
      try {
        this.user.roles = [this.selectedRole];
        console.log("Données du formulaire:", this.user);
        const response = await axios.post(
            `http://${this.url}:4000/api/users`,
            { user: this.user }
        );
        console.log("Utilisateur ajouté avec succès:", response);
        // Rediriger vers la liste des utilisateurs ou une autre page si nécessaire
        this.$router.push({ name: "allUsers" });
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'utilisateur:", error);
      }
    },
  }
  };
</script>

<style>
/* Ajoutez des styles CSS selon vos besoins */
</style>
