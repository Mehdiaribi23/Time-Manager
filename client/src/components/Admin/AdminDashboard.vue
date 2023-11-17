<template>
  <div>
    <div
      class="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabindex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">
              Modifier l'utilisateur
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="user-form">
                <div class="form-group">
                  <label for="email" class="form-label">Email :</label>
                  <input
                    type="email"
                    id="email"
                    v-model="user.email"
                    class="form-control"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="name" class="form-label">Nom :</label>
                  <input type="text" id="name" v-model="user.name" class="form-control" required />
                </div>
                <div class="form-group">
                  <label for="username" class="form-label">Prenom :</label>
                  <input
                    type="text"
                    id="surname"
                    v-model="user.surname" class="form-control"
                    required
                  />
                </div>
                <button
                  class="btn btn-info"
                  type="button"
                  @click="editUser(this.id)"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  Modifier
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="parent-div">
      <input type="checkbox" name="" id="menu-toggle" />
      <div class="overlay">
        <label for="menu-toggle">
          <span class="bx bx-x"></span>
        </label>
      </div>
      <div class="sidebar">
        <div class="sidebar-container">
          <div class="brand">
            <h2>
              <span class="bx bxs-doughnut-chart"></span> Hello {{ user.name }}
            </h2>
          </div>
          <div class="sidebar-avartar">
            <div>
              <img src="../../assets/user-circle-regular-24.png" alt="time" />
            </div>
            <div class="avartar-info">
              <div class="avartar-text">
                <h6>{{ user.surname }} {{ user.name }}</h6>
                <small>{{ user.email }}</small>
              </div>
              <span class="bx bxs-chevron-down"></span>
            </div>
          </div>
          <div class="sidebar-menu">
            <ul>
              <li>
                <router-link
                  :to="{ name: 'dashboard' }"
                  @click="showMain"
                  :class="{ active: $route.name === 'dashboard' }"
                >
                  <span class="bx bx-bar-chart-alt"></span>
                  <span>Dashboard</span>
                </router-link>
              </li>
              <li>
                <router-link
                  :to="{ name: 'charts' }"
                  @click="showMain"
                  :class="{ active: $route.name === 'charts' }"
                >
                  <span class="bx bx-bar-chart-alt"></span>
                  <span>Charts</span>
                </router-link>
              </li>
              <li>
                <router-link
                  :to="{ name: 'clock' }"
                  @click="showMain"
                  :class="{ active: $route.name === 'clock' }"
                >
                  <span class="bx bxs-user-badge"></span>
                  <span>Je Badge</span>
                </router-link>
              </li>
              <li>
                <router-link
                  :to="{ name: 'profile' }"
                  @click="showMain"
                  :class="{ active: $route.name === 'profile' }"
                >
                  <span class="bx bx-user-circle"></span>
                  <span>Mon Profile</span>
                </router-link>
              </li>

              <li>
                <router-link
                    :to="{ name: 'working_time' }"
                    @click="showMain"
                    :class="{ active: $route.name === 'working_time' }"
                >
                  <span class='bx bxs-timer'></span>
                  <span>Mes heures</span>
                </router-link>
              </li>
              <li v-if="user.roles && user.roles.includes('admin')">
                <router-link :to="{ name: 'allUsers' }">
                  <span class="bx bxs-user-detail"></span>
                  <span>Users</span>
                </router-link>
              </li>
            </ul>
          </div>

        </div>
      </div>
      <div class="main-content">
        <header>
          <div class="header-title-wrapper">
            <label for="menu-toggle">
              <span class="bx bx-menu"></span>
            </label>
            <div class="header-title">
              <h1>Hello {{ user.surname }} {{ user.name }}</h1>
            </div>
          </div>
          <div class="header-action">
            <button class="btn btn-main" @click="logoutUser()" type="button">
              <span class="bx bx-log-out"></span>
              Déconnexion
            </button>
          </div>
        </header>
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "boxicons";
import moment from "moment";
import "moment-timezone";
// import myChart from "../Charts/Charts.vue";
import * as bootstrap from "bootstrap";
import "bootstrap";
import { onMounted } from "vue";
window.bootstrap = bootstrap;
let myModal;

export default {
  setup() {
    onMounted(() => {
      myModal = new bootstrap.Modal(document.getElementById("staticBackdrop"));
    });

    const showModel = () => {
      console.log("tes");
      myModal.show();
    };

    return {
      // ...autres variables et méthodes que vous retournez
      showModel,
      url: "localhost",
    };
  },
  name: "AdminDashboard",
  data() {
    return {
      id: null,
      user: {
        name: "",
        email: "",
        surname: "",
      },
      workingTimeData: {
        start: "",
        end: "",
        user_id: "",
      },
      allWorkingTimes: {},
      showWorkingTimes: false,
      dashStart: "",
      dashEnd: "",
      chartData: {},
      chartExist: false,
      componentKey: 0,
      show_main: true,
    };
  },
  components: {
    // myChart,
  },
  mounted() {
    console.log(this.$route.params.id);
    this.id = this.$route.params.id;
    // this.getUser( this.id);
    this.getUser();
  },
  methods: {
    showMain() {
      this.show_main = false;
    },
    async getUser() {
      try {
        // Effectuer une requête GET pour obtenir les détails de l'utilisateur
        const response = await axios.get(
          `http://${this.url}:4000/api/users/${this.id}`
        );
        console.log(
          "Détails de l'utilisateur récupérés avec succès:",
          response.data
        );
        this.user = response.data;
        // Mettez en œuvre la logique nécessaire après avoir obtenu les détails de l'utilisateur ici
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails de l'utilisateur :",
          error
        );
      }
    },
    async editUser(id) {
      try {
        const response = await axios.put(
          `http://${this.url}:4000/api/users/${id}`,
          { user: this.user }
        );

        console.log("Utilisateur mis à jour avec succès :", response.data);
        // Mettez en œuvre la logique nécessaire après la mise à jour de l'utilisateur ici
        this.isEditing = false;
      } catch (error) {
        console.error(
          "Erreur lors de la mise à jour de l'utilisateur :",
          error
        );
      }
    },
    async logoutUser() {
      console.log();
      const token = JSON.parse(localStorage.getItem("token"));
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.delete(`http://${this.url}:4000/api/auth`, {
        headers,
      });
      // <li v-if="user.roles && user.roles.includes('admin')">
      //           <router-link :to="{ name: 'allUsers' }">
      //             <span class="bx bxs-user-detail"></span>
      //             <span>Users</span>
      //           </router-link>
      //         </li>
      localStorage.removeItem("token");
      this.$router.push({ name: "login" });
    },

    async createClock(user_id) {
      try {
        const currentDate = moment().tz("Europe/Paris");
        const data = {
          time: currentDate.add(1, "hours"),
        };
        console.log(data);
        const response = await axios.post(
          `http://${this.url}:4000/api/clocks/${user_id}`,
          { clock: data }
        );
        console.log("Clock créée avec succès:", response.data);
        if (response.data.status) {
          localStorage.setItem("start", JSON.stringify(response.data.time));
        } else if (!response.data.status) {
          // const today = moment().format('YYYY-MM-DD H:mm');
          this.workingTimeData.start = JSON.parse(
            localStorage.getItem("start")
          );
          this.workingTimeData.user_id = user_id;
          this.workingTimeData.end = response.data.time;
          console.log(this.workingTimeData);
          axios
            .post(`http://${this.url}:4000/api/working_times/${user_id}`, {
              working_time: this.workingTimeData,
            })
            .then((response) => {
              console.log("Working time créé avec succès:", response.data);
              localStorage.clear();
            })
            .catch((error) => {
              console.error(
                "Erreur lors de la création du working time :",
                error
              );
            });
        }
      } catch (error) {
        console.error("Erreur lors de la création de la clock :", error);
      }
    },

    async getWorkingTimes(id) {
      try {
        // Effectuer une requête GET pour obtenir les détails de l'utilisateur
        const response = await axios.get(
          `http://${this.url}:4000/api/working_timesAll/${id}`
        );
        this.allWorkingTimes = response.data;
        console.log(this.allWorkingTimes);
        // Mettez en œuvre la logique nécessaire après avoir obtenu les détails de l'utilisateur ici
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des temps de travail :",
          error
        );
      }
    },

    calculateWorkingDuration(start, end) {
      const startTime = moment(start);
      const endTime = moment(end);
      const durationMs = endTime.diff(startTime); // Différence en millisecondes
      const duration = moment.duration(durationMs);

      const hours = duration.hours().toString().padStart(2, "0");
      const minutes = duration.minutes().toString().padStart(2, "0");
      const seconds = duration.seconds().toString().padStart(2, "0");

      const formattedDuration = `${hours}:${minutes}:${seconds}`;

      return formattedDuration;
    },
    formatWorkingTime(date) {
      return moment(date).subtract(1, "hour").format("YYYY-MM-DD HH:mm:ss");
    },
    async showDashboard(user_id, startDate, endDate) {
      const start = moment(startDate).format("YYYY-MM-DD HH:mm:ss");
      const end = moment(endDate).format("YYYY-MM-DD HH:mm:ss");
      try {
        const response = await axios.get(
          `http://${this.url}:4000/api/working_times/${user_id}?start=${start}&end=${end}`
        );

        const workByDay = {};
        const workingTimes = response.data;

        for (const workingTime of workingTimes) {
          const start = new Date(workingTime.start);
          const end = new Date(workingTime.end);
          const day = start.toDateString();
          const timeDiff = end - start;
          workByDay[day] = (workByDay[day] || 0) + timeDiff;
        }

        const labels = Object.keys(workByDay);
        const data = labels.map((day) => workByDay[day]);

        this.chartData = {
          chartTitle: "Your working time",
          chartLabels: labels,
          chartValues: data,
        };

        this.chartExist = true;
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }

      this.componentKey += 1;
    },
  },
};
</script>

<style>
.info {
  width: 200px;
  height: 100vh;
  background-color: #eee;
}
.info .box {
  color: #000;
  width: 100%;
  height: 50px;
  margin: 20px auto;
  display: flex;
  align-items: center;
}
</style>
