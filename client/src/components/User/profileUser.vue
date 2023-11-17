<template>
 <div>
  <div class="info-user-concter">
        <div class="usernam">
          <i class='bx bxs-user-circle'></i>
          <p>{{ user.surname }} {{ user.name }}</p>
        </div>
        <div class="usernam">
          <i class='bx bxl-gmail' ></i>
          <p>{{ user.email }}</p>
        </div>
        <div class="usernam">
          <i class='bx bx-edit-alt' ></i>
          <button
                    type="button"
                    @click="showModel"
                    class="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    Modifier
                  </button>
        </div>
      </div>
    <!-- <div class="container mt-5 ">
      <div class="card">
        <div class="card-header">
          <h2 class="text-center">Informations de l'utilisateur</h2>
        </div>
        <div class="card-body">
          <table class="table table-bordered mt-3 text-center">
            <thead>
              <tr>
                <th>Nom d'utilisateur</th>
                <th>Prenom d'utilisateur</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ user.surname }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td class="d-flex justify-content-center gap-3">
                  <button @click="createClock(user.id)" class="btn btn-success">
                    Je Badge !
                  </button>
                  <button
                    class="btn btn-secondary"
                    type="button"
                    @click="
                      showWorkingTimes = true;
                      getWorkingTimes(this.id);
                    "
                  >
                    Mes Working Times
                  </button>

               
                  <button
                    type="button"
                    class="btn btn-danger"
                    @click="logoutUser()"
                  >
                    Deconnexion
                  </button>
                </td>
                <div class="form-group">
                  <label for="dashStart">Début :</label>
                  <input
                    type="datetime-local"
                    class="form-control"
                    id="dashStart"
                    v-model="dashStart"
                    placeholder=" entre la date de début "
                  />
                  <label for="dashEnd">Fin :</label>
                  <input
                    type="datetime-local"
                    class="form-control"
                    id="dashEnd"
                    v-model="dashEnd"
                    placeholder=" entre la date de fin "
                  />
                  <button
                    class="btn btn-secondary"
                    type="button"
                    @click="showDashboard(user.id, dashStart, dashEnd)"
                  >
                    Voir mes heures
                  </button>
                </div>
                
              </tr>
            </tbody>
          </table>
        </div>
      </div>
       <div v-if="chartExist">
        <myChart :chartInput="this.chartData" :key="componentKey" />
      </div> 
       <div v-if="showWorkingTimes" class="container"> 
        <div class="card">
          <div class="card-header">
            <h2 class="text-center">Vos working times</h2>
          </div>
          <div class="card-body">
            <table class="table table-bordered mt-3 text-center">
              <thead>
                <tr>
                  <th>Début</th>
                  <th>Fin</th>
                  <th>Durée de travail</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(working, index) in allWorkingTimes" :key="index">
                  <td>{{ formatWorkingTime(working.start) }}</td>
                  <td>{{ formatWorkingTime(working.end) }}</td>
                  <td>
                    {{ calculateWorkingDuration(working.start, working.end) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div> 
    </div> -->
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
    };
  },

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
      url:'localhost',
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
        // const dataToUpdate = {
        //   email: this.user.email,
        //   name:this.user.name,
        //   surname:this.user.surname
        // };

        // Effectuer une requête PUT pour mettre à jour l'utilisateur existant
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
      const token = JSON.parse(localStorage.getItem("token"));
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.delete(`http://${this.url}:4000/api/auth`, {
        headers,
      });
      localStorage.clear();
      this.$router.push({ name: "home" });
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
.info-user-concter {
  width: 350px;
  height: 300px;
  background:#fff ;
  border: 2px solid #eee;
  border-radius: 7px;
  box-shadow: var( --shadow);
  position: relative;
  left: 20%;
  top: 100px;
  padding: 50px;
  z-index: 1;
}
.info-user-concter .usernam  {
  /* margin: 20px auto; */
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #396aff;
  padding: 20px 0px;
  box-shadow: rgba(10, 51, 197, 0.5) 20px 20px 35px;
  z-index: 4;
}
.info-user-concter .usernam i {
  font-size: 50px;
  color: #396aff;
  margin-right: 20px;
  box-shadow: rgba(10, 51, 197, 0.5) 20px 20px 35px;
  border-radius:50% ;
}
.info-user-concter p {
  text-align: center;
  font-size: 16px;
  font-weight: 400;
  color: #353030;
  text-transform:capitalize;
}

</style>
