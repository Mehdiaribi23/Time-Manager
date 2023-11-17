<template>
  <div class="card mt-3">
    <div class="card-header " style="background: #396aff; color: #fff3cd">
      <h2 class="text-center" >Vos heures</h2>
    </div>
    <div class="card-body">
      <table class="table table-bordered mt-3 text-center">
        <thead >
        <tr >
          <th style="background: #396aff; color: #fff3cd" >Début</th>
          <th style="background: #396aff; color: #fff3cd" >Fin</th>
          <th style="background: #396aff; color: #fff3cd" >Durée de travail</th>
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

</template>

<script>
import axios from "axios";
import "boxicons";
import moment from "moment";
import "moment-timezone";

export default {
  name: "workings_time",
  data() {
    return {
      id: null,
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

      url: "localhost",
    };

  },
  mounted() {
    console.log(this.$route.params.id);
    this.id = this.$route.params.id;
    this.getClock();
    this.getWorkingTimes(this.id)
  },
  methods: {
    async getClock() {
      try {
        // Effectuer une requête GET pour obtenir les détails de l'utilisateur
        const response = await axios.get(`http://${this.url}:4000/api/clocks/${this.id}`);
        this.clocks = response.data;

        // Mettez en œuvre la logique nécessaire après avoir obtenu les détails de l'utilisateur ici
      } catch (error) {
        console.error('Erreur lors de la récupération des temps de travail :', error);
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
  }
};
</script>

<style>
.horloge-parent {
  width: 400px;
  position: absolute;
  margin: 200px auto 200px 300px;
  border: 1px solid #e9eefd;
  border-radius: 7px;
  padding: 20px 20px 100px 20px;
  box-shadow: rgba(17, 17, 26, 0.1) 2px 2px 16px;
}

.horloge {
  text-align: center;
  color: #4b5876;
  margin-bottom: 50px !important;
}

.horloge-btn {
  display: flex;
  justify-content: center;
  align-items: center;
}

.horloge-btn button {
  background: rgb(74, 19, 19) !important;
  border-radius: 5px;
  padding: 10px 20px;
  color: #fff;
  cursor: pointer;
  margin-right: 10px;
}
</style>
