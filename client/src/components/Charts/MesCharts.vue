<template>
  <div>
    <div class=" mt-5 w-50 mx-auto">
      <label for="chartType">Type de graphique :</label>
      <select v-model="chartType" class="form-control" @change="updateChart">
        <option value="bar">Bar Chart</option>
        <option value="line">Line Chart</option>
        <option value="radar">Radar Chart</option>
        <option value="doughnut">Doughnut Chart</option>
        <option value="polarArea">Polar Area Chart</option>
        <option value="bubble">Bubble Chart</option>
        <option value="scatter">Scatter Chart</option>
        <option value="pie">Pie Chart</option>
        <option value="polarArea">Polar Area Chart</option>
        <!-- Add other chart types as needed -->
      </select>

      <label for="dashStart" class="mt-3">Début :</label>
      <input
        type="datetime-local"
        class="form-control"
        id="dashStart"
        v-model="dashStart"
        placeholder=" entre la date de début "
      />
      <label for="dashEnd" class="mt-3">Fin :</label>
      <input
        type="datetime-local"
        class="form-control"
        id="dashEnd"
        v-model="dashEnd"
        placeholder=" entre la date de fin "
      />
      <button
        class="btn btn-secondary mt-3"
        type="button"
        @click="showDashboard(this.id, dashStart, dashEnd)"
      >
        Voir mes heures
      </button>
    </div>

    <div class="graph-board">
      <div v-if="chartExist">
        <myChart :chartInput="this.chartData" :key="componentKey" :chartType="chartType" />
      </div>
    </div>
  </div>
</template>
  
  <script>
import "boxicons";
import myChart from "../Charts/Charts.vue";
import axios from "axios"; // Assurez-vous d'importer axios si ce n'est pas déjà fait
import moment from "moment"; // Assurez-vous d'importer moment si ce n'est pas déjà fait

export default {
  name: "MesCharts",
  data() {
  return {
    id: null,
    chartExist:false,
    componentKey: 0,
    chartType: 'bar', 
    url:'localhost',
  };
},
components: {
    myChart ,
},
mounted() {
  this.id = this.$route.params.id;
},
  methods: {
    
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
          `http://localhost:4000/api/working_times/${user_id}?start=${start}&end=${end}`
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
</style>
