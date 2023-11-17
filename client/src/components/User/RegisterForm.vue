<template>
<div class="div">
  <div class="parent">
    <div class="wrapper">
      <span class="bg-animat2"></span>
      <div class="form-box register">
        <h2>Sing Up</h2>
        <form action="#">
          <div class="input-box">
            <input type="text" required v-model="user.name" />
            <label>Nom</label>
            <i class="bx bx-user"></i>
          </div>
          <div class="input-box">
            <input type="text" required v-model="user.surname" />
            <label>Prénom</label>
            <i class="bx bx-user"></i>
          </div>
          <div class="input-box">
            <input type="email" required v-model="user.email" />
            <label>Email</label>
            <i class="bx bx-envelope"></i>
          </div>
          <div class="input-box">
            <input type="password" required v-model="user.password" />
            <label>password</label>
            <i class="bx bx-lock-alt"></i>
          </div>
          <button class="btn-lgrg" type="button" @click="createUser()">
            Sign Up
          </button>
          <div class="logreg-link">
            <p>
              Already have an account?
              <RouterLink to="/" class="register-link">Login</RouterLink>
            </p>
          </div>
        </form>
      </div>
      <div class="form-image register">
        <img src="../../assets/t.png" alt="log time manger" />
      </div>
    </div>
  </div>
</div>
 
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  name: "RegisterForm",
  data() {
    return {
      user: {
        name: "",
        surname: "",
        email: "",
        password: "",
      },
      url:'localhost',
    };
  },
  methods: {
    async createUser() {
      try {
        // Effectuer une requête POST pour créer un nouvel utilisateur
        const response = await axios.post(
          `http://${this.url}:4000/api/inscription`,
          this.user
        );
        console.log("Utilisateur créé avec succès:", response);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Count has been created",
          showConfirmButton: false,
          timer: 2000,
        }).then(function () {});
        this.user = "";
      } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error);
      }
    },
  },
};
</script>

<style>
</style>
