<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Features</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Pricing</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown link
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
    </ul>
  </div>
</nav>
    
  <!-- <div class="navbar">
    <div class="container">
      <RouterLink to="/" class="nav-link" exact>
        Dashboard
      </RouterLink>
      <router-link to="/orders" class="nav-link">
        Orders
      </router-link>
      <router-link to="/products" class="nav-link">
        Products
      </router-link>
      <router-link to="/customers" class="nav-link">
        Customers
      </router-link>
   
        <RouterLink v-if="isConencte" to="login" class="nav-link">
        login
      </RouterLink>
      <RouterLink v-if="isConencte" to="register" class="nav-link">
        register
      </RouterLink>
      <div v-else>
        <RouterLink  to="register" class="nav-link">
            <button
                  type="button"
                  class="btn btn-danger"
                  @click="logoutUser()"
                >
                  Deconnexion
                </button>
      </RouterLink>
      </div>
    
     
    </div>
  </div> -->
</template>

<script>
import axios from "axios";
export default {
name:"NavBarPage",
data() {
    return {
        userIsConnected:false
    }
   
},
mounted(){
    if(JSON.parse(localStorage.getItem('token'))) {
        this.isConencte=true
    }
},
    async logoutUser() {
      const token = JSON.parse(localStorage.getItem("token"));
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.delete("http://localhost:4000/api/auth", {
        headers,
      });
      this.userIsConnected=false ;
      localStorage.clear();
      this.$router.push({ name: "home" });
    },
}
</script>

<style>

</style>