    <template >
  <div class="parent">
    <div class="wrapper">
      <span class="bg-animate"></span>
      <div class="form-box login">
        <h2>Login</h2>
        <form @submit.prevent="loginUser">
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
          <button class="btn-lgrg" type="submit">Login</button>
          <div class="logreg-link">
            <p>
              Don't habe an account?
              <RouterLink to="register" class="register-link"
                >Sign Up</RouterLink
              >
            </p>
          </div>
        </form>
      </div>
      <div class="form-image login">
        <img src="../../assets/time.png" alt="log time manger" />
      </div>
    </div>
  </div>
</template>

    <script>
import "boxicons";
import axios from "axios";

export default {
  name: "LoginForm",

  data() {
    return {
      user: {
        email: "",
        password: "",
      },
      url: "localhost",
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await axios.post(
          `http://${this.url}:4000/api/login`,
          this.user
        );

        console.log("Utilisateur créé avec succès:", response);

        if (response.data.token) {
          localStorage.setItem("token", JSON.stringify(response.data.token));

          const token = JSON.parse(localStorage.getItem("token"));
          const headers = {
            Authorization: `Bearer ${token}`,
          };

          const response2 = await axios.get(
            `http://${this.url}:4000/api/auth`,
            {
              headers,
            }
          );

          const userRole = response2.data.user.roles[0];
          localStorage.setItem("userRole", userRole);

          // const userId = response2.data.user.id;
          // this.$router.push({ name: "infoUser", params: { id: userId } });
          if (userRole === "admin") {
            console.log("User is an admin");

            /*this.$router.push({
              name: "AdminDashboard",
              params: { id: response2.data.user.id }, // Change 'id' to 'user'
            })*/
            this.$router.push({ name: "dashboard", params: { id: response2.data.user.id } });
          } else {
            const userId = response2.data.user.id;
            if (userId) {
              // Redirect to infoUser page with user id
              this.$router.push({ name: "dashboard", params: { id: userId } });
            } else {
              console.error("User ID not available.");
            }
          }
        }
      } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error);
      }
    },
  },
};
</script>


    <style>
* {
  margin: 0;
  padding: 0;
  font-family: "Poppins";
}
#app {
  min-height: 100vh;
  background: linear-gradient(#120023, #3b0052, #120023, #3b0052);
  color: #fff;
}
.parent {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #120023;
  position: relative;
  overflow: hidden;
}
.wrapper {
  position: relative;
  width: 750px;
  height: 450px;
  background: transparent;
  border: 2px solid #3b0052;
  box-shadow: 0 0 25px #3b0052;
  overflow: hidden;
  z-index: 1;
}
/* animation wrapper */

.wrapper .form-box {
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.wrapper .form-box.login {
  left: 0;
  padding: 0px 60px 0px 40px;
  background: #396aff;
}

.form-box h2 {
  font-size: 32px;
  color: #fff;
  text-align: center;
}
.form-box .input-box {
  position: relative;
  width: 100%;
  height: 50px;
  margin: 25px 0;
}
.input-box input {
  width: 100%;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  border-bottom: 2px solid #fff;
  color: #fff;
  font-size: 16px;
  padding-right: 25px;
  font-weight: 600;
  transition: 0.5s;
}

.input-box input:focus,
.input-box input:valid {
  color: #0ef;
}
.input-box label {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}
.input-box input:focus ~ label,
.input-box input:valid ~ label {
  top: -5px;
  color: #0ef;
}
.input-box i {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  font-size: 18px;
  transition: 0.5s;
}
.input-box input:focus ~ i,
.input-box input:valid ~ i {
  color: #0ef;
}
.btn-lgrg {
  position: relative;
  width: 100%;
  height: 45px;
  background: transparent;
  border: 2px solid #3b0052;
  outline: none;
  border-radius: 40px;
  cursor: pointer;
  font-size: 16px;
  color: #fff;
  font-weight: 600;
  overflow: hidden;
  z-index: 1;
}
.btn-lgrg::before {
  content: "";
  position: absolute;
  top: -100%;
  left: 0;
  width: 100%;
  height: 300%;
  background: linear-gradient(#396aff, #3b0052, #120023, #3b0052);
  z-index: -1;
  transition: 0.5s;
}
.btn-lgrg:hover:before {
  top: 0;
}

.logreg-link {
  font-size: 14.5px;
  color: #fff;
  text-align: center;
  margin: 20px 0 10px;
}
.logreg-link p a {
  color: #0ef;
  text-decoration: none;
  font-weight: 600;
}

.wrapper .form-image {
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.wrapper .form-image.login {
  right: 0;
}

.wrapper .bg-animate {
  position: absolute;
  top: -4px;
  right: 0;
  width: 850px;
  height: 600px;
  background: linear-gradient(45deg, #120023, #3b0052);
  transform: rotate(10deg) skewY(40deg);
  transform-origin: bottom right;
  border-bottom: 3px solid #0ef;
}

@media (max-width: 765px) {
  .wrapper .form-box {
    width: 100%;
  }
  .wrapper .form-image {
    display: none;
  }
}
</style>
