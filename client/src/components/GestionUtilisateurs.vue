<template>
  <!-- Contenu du composant Utilisateur ici -->
  <div class="home-page">

    <div class="navbar">
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
        <RouterLink to="/WorkingsTime/:id" class="nav-link">
          Working
        </RouterLink>
      </div>
    </div>
   
    <div class="container mt-4" v-if="!userExists">
      <div class="row">
        <LoginForm :initialFormData="formData" @form-submitted="updateFormData" />
      </div>
    </div>

    <div v-if="userExists" class="user-info">
        <InfoUser :formData="formData" :userId="userId"  />
      
    </div>

    <div v-if="chartExist">
      <myChart :chartInput="this.chartData" />
      <!-- :chartValues="this.chartData.chartValues" :chartTitle="this.chartData.chartTitle"/> -->
    </div>


    <div v-if="userExists" class="user-info">
      <div class="container">
        <div class="card">
          <div class="card-header">
            <h2 class="text-center">Votre journée </h2>
          </div>
          <div class="card-body">
            <table class="table table-bordered mt-3 text-center">
              <thead>
                <tr>
                  <th>Temps </th>
                </tr>
              </thead>
              <tbody>

                <tr v-for="(clock, index) in this.clocks" :key="index">
                  <td> Badge n°{{+ + index }} : {{ formattedDate(clock.time) }}</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
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
                  <td>{{ calculateWorkingDuration(working.start, working.end) }}</td>

                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>

    <div class="user-info" v-if="showErrorMessage">
      <p>L'utilisateur n'existe pas dans la base de données.</p>
    </div>

    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
      aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Modifier l'utilisateur</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="user-form">
                <div class="form-group">
                  <label for="email">Email :</label>
                  <input type="email" id="email" v-model="formData.email" required>
                </div>
                <div class="form-group">
                  <label for="username">Nom d'utilisateur :</label>
                  <input type="text" id="username" v-model="formData.username" required>
                </div>
                <button class="btn btn-info" type="button" @click="editUser(this.userId)" data-bs-dismiss="modal"
                  aria-label="Close">Modifier </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

import InfoUser from './HomePage.vue';
import moment from 'moment';
import axios from 'axios';
import 'moment-timezone';
import { onMounted } from 'vue';
import * as bootstrap from 'bootstrap';
import 'bootstrap';
import myChart from './Charts.vue';
import LoginForm from '../components/User/LoginForm.vue'

window.bootstrap = bootstrap;
let myModal;

export default {
  components: {
    myChart,
    InfoUser,
    LoginForm,
  },

  setup() {

    onMounted(() => {
      myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'));
    });

    const showModel = () => {
      console.log("tes");
      myModal.show();
    };

    return {
      // ...autres variables et méthodes que vous retournez
      showModel
    };
  },
  name: 'GestionUtilisateurs',

  data() {
    return {
      formData: {
        email: '',
        username: '',
      },
      data: {
        time: '',
        status: '',
        user_id: '',
      },
      clocks: {
        time: '',
        status: '',
        user_id: '',
      },
      workingTimeData: {
        start: '',
        end: '',
        user_id: ''
      },
      showWorkingTimes: false,
      allWorkingTimes: {},

      userId: '',
      workingTime_id: null,
      userExists: false, // Ajout d'une variable pour suivre si l'utilisateur existe
      email: '',
      username: '',
      showErrorMessage: false,
      isEditing: false,
      startDay: null,
      chartData: {},
      chartExist: false,
      date_starte:null,
      url:'localhost',
    };
  },
  computed: {},
  methods: {

    calculateWorkingDuration(start, end, retHours = false) {
      const startTime = moment(start);
      const endTime = moment(end);
      const duration = moment.duration(endTime.diff(startTime));
      const hours = Math.floor(duration.asHours());
      const minutes = duration.minutes();

      if (retHours) {
        return hours + (minutes / 60)
      }
      return { hours: hours, minutes: minutes }
    },

    async showDashboard(user_id, startDate, endDate) {
      const start = moment(startDate).format('YYYY-MM-DD HH:mm:SS')
      const end = moment(endDate).format('YYYY-MM-DD HH:mm:SS')
      const response = await axios.get(
        `http://${this.url}:4000/api/working_times/${user_id}?start=${start}&end=${end}`);

      const myDates = []
      response.data.forEach((wt) => myDates.push(wt["start"], wt["end"]));

      const res = [0]
      var tmp
      var i = 0
      const rLenght = response.data.length
      console.log(`lenght ${rLenght}`)

      while (i < rLenght) {
        const lmt = response.data.at(i)
        tmp = this.calculateWorkingDuration(lmt["start"], lmt["end"], true)
        res.push(tmp)
        i++
        if (i < rLenght) {
          res.push(tmp)
        }
      }

      console.log(`res var ${res}`)
      this.chartData = {
        chartTitle: "test graph", chartLabels: myDates, chartValues: res
      }
      this.chartExist = true
    },

    async calculateHoursWorked(wt) {
      const res = []
      wt.forEach((lmt) => res.push(this.calculateWorkingDuration(lmt["start"], lmt["end"], true)));
      console.log(res)
      return res
    },

    formatWorkingTime(date) {
      return moment(date).subtract(1, 'hour').format('YYYY-MM-DD HH:mm:SS');
    },


    //   try {
    //     const currentDate = moment().tz('Europe/Paris');
    //     const data = {
    //       time: currentDate,
    //     }
    //     console.log(data);
    //     const response = await axios.post(`http://${this.url}:4000/api/clocks/${user_id}`, { clock: data });
    //     console.log('Clock créée avec succès:', response.data);
    //     if(response.data.status) {
    //       localStorage.setItem("start",JSON.stringify(response.data.time))
    //     }else if(!response.data.status) {
    //       console.log(this.date_starte)
    //     // const today = moment().format('YYYY-MM-DD H:mm');
    //     this.workingTimeData.start =  JSON.parse(localStorage.getItem('start'))
    //     this.workingTimeData.user_id = user_id
    //     this.workingTimeData.end = response.data.time
    //     console.log(this.workingTimeData)
    //     axios.post(`http://${this.url}:4000/api/working_times/${user_id}`, { working_time: this.workingTimeData })
    //       .then(response => {
    //         console.log('Working time créé avec succès:', response.data);
    //         localStorage.clear()
    //       }).catch(error => {
    //         console.error('Erreur lors de la création du working time :', error);
    //       });
    //     }

    //   } catch (error) {
    //     console.error('Erreur lors de la création de la clock :', error);
    //   }
    // },
    async getWorkingTimes(user_id) {
      try {
        // Effectuer une requête GET pour obtenir les détails de l'utilisateur
        const response = await axios.get(`http://${this.url}:4000/api/working_timesAll/${user_id}`);
        this.allWorkingTimes = response.data;
        console.log(this.allWorkingTimes)
        // Mettez en œuvre la logique nécessaire après avoir obtenu les détails de l'utilisateur ici
      } catch (error) {
        console.error('Erreur lors de la récupération des temps de travail :', error);
      }
    },



    formattedDate(date) {
      return moment.tz(date, 'Europe/Paris').format('DD-MM-YYYY HH:mm:SS');
    },

    async getClock() {
      try {
        // Effectuer une requête GET pour obtenir les détails de l'utilisateur
        const response = await axios.get(`http://${this.url}:4000/api/clocks/${this.userId}`);
        this.clocks = response.data;

        // Mettez en œuvre la logique nécessaire après avoir obtenu les détails de l'utilisateur ici
      } catch (error) {
        console.error('Erreur lors de la récupération des temps de travail :', error);
      }
    },

    async editUser(id) {
      try {
        const dataToUpdate = {
          email: this.formData.email,
          username: this.formData.username,
        };

        // Effectuer une requête PUT pour mettre à jour l'utilisateur existant
        const response = await axios.put(`http://${this.url}:4000/api/users/${id}`, { user: dataToUpdate });

        console.log('Utilisateur mis à jour avec succès :', response.data);
        // Mettez en œuvre la logique nécessaire après la mise à jour de l'utilisateur ici
        this.isEditing = false;
      } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
      }
    },

    async getUser() {
      try {
        // Effectuer une requête GET pour obtenir les détails de l'utilisateur
        const response = await axios.get(`http://${this.url}:4000/api/users/${this.userId}`);
        console.log('Détails de l\'utilisateur récupérés avec succès:', response.data);
        // Mettez en œuvre la logique nécessaire après avoir obtenu les détails de l'utilisateur ici
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de l\'utilisateur :', error);
      }
    },

    updateFormData(formData) {
      // Mettez à jour formData dans le composant parent avec les données du composant enfant
      this.formData = formData;
      // Appelez votre méthode submitUser ici ou faites ce que vous voulez avec les données formData
      this.submitUser();
    },

    async submitUser() {
      const email = this.formData.email;
      const username = this.formData.username;
      try {
        // Effectuez une requête à l'API pour vérifier si l'utilisateur existe
        const response = await axios.get(`http://${this.url}:4000/api/users?email=${email}&username=${username}`);

        if (response.data) {
          this.userExists = true;
          this.email = email;
          this.username = username;
          this.showErrorMessage = false;
        
          this.userId = response.data.id
          this.$router.push({ name: 'infoUser', params: { id: this.userId } });

          this.getUser();
          this.getClock();
        } else {
          this.userExists = false;
          this.showErrorMessage = true;
          // L'utilisateur n'existe pas dans la base de données
          console.log(response.data);
        }
      } catch (error) {
        this.userExists = false;
        this.showErrorMessage = true;
      }
    },
  }
};

</script>

<style scoped>
/* Styles pour la page d'accueil */

/* Style pour la barre de navigation */
.navbar {
  background-color: beige;
  padding: 15px 0;
  /* Ajoutez un espace autour du texte dans la navbar */
  width: 100%;
  /* Faites en sorte que la navbar occupe toute la largeur de son conteneur */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  /* Ajoute une légère ombre */
}

/* Style pour les liens dans la navbar */
.navbar a {
  margin: 0 20px;
  /* Ajoute un espace entre chaque lien */
  color: black;
  /* Couleur du texte des liens */
  text-decoration: none;
  /* Supprime la soulignement des liens */
  font-weight: bold;
  /* Mettez en gras le texte des liens */
  font-size: 1.2rem;
  /* Taille de la police des liens */
}





/* Changez la couleur du texte des liens au survol */
.navbar a:hover {
  color: darkred;
  /* Couleur du texte des liens au survol */
}



/* Vos autres styles restants... */

/* Style pour le formulaire utilisateur */
.user-form {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.user-form .form-group {
  margin-bottom: 15px;
}

.user-form .form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.user-form .form-group input[type="email"],
.user-form .form-group input[type="text"] {
  width: calc(100% - 20px);
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 10px;
}

.user-form button[type="submit"] {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.user-form button[type="submit"]:hover {
  background-color: #0056b3;
}</style>
