<template>
  <div class="show">
    <main>
      <section>
        <h3 class="section-head">Mes Heures</h3>
        <div class="analystics">
          <div class="analystic">
            <div class="analystic-icon">
              <span class="bx bx-low-vision"></span>
            </div>
            <div class="analystic-info">
              <h4>la semaine</h4>
              <h1>{{this.totalHoursPerWeek}}</h1>
            </div>
          </div>
          <div class="analystic">
            <div class="analystic-icon">
              <span class="bx bx-low-vision"></span>
            </div>
            <div class="analystic-info">
              <h4>Le mois</h4>
              <h1>{{this.totalHoursPerMonth}}</h1>
            </div>
          </div>

          <div class="analystic">
            <div class="analystic-icon">
              <span class="bx bx-low-vision"></span>
            </div>
            <div class="analystic-info">
              <h4>La année</h4>
              <h1>{{this.totalHoursPerYear}}</h1>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="card mt-3">
        <div class="card-header " style="background: #396aff; color: #fff3cd">
          <h2 class="text-center">Vos heures</h2>
        </div>
        <div class="card-body">
          <table class="table table-bordered mt-3 text-center">
            <thead>
            <tr>
              <th style="background: #396aff; color: #fff3cd">Début</th>
              <th style="background: #396aff; color: #fff3cd">Fin</th>
              <th style="background: #396aff; color: #fff3cd">Durée de travail</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(workingTime, index) in allWorkingTimes" :key="index">
              <td>{{ formatWorkingTime(workingTime.start) }}</td>
              <td>{{ formatWorkingTime(workingTime.end) }}</td>
              <td>{{ calculateWorkingDuration(workingTime.start, workingTime.end) }}</td>
            </tr>
            </tbody>
            <tfoot>
            <tr>
              <td colspan="2" style="background: #396aff; color: #fff3cd; font-weight: bold;">Total par mois :</td>
              <td style="background: #396aff; color: #fff3cd; font-weight: bold;">{{ totalHoursPerMonth }}</td>
            </tr>
            <tr>
              <td colspan="2" style="background: #396aff; color: #fff3cd; font-weight: bold;">Total par semaine :</td>
              <td style="background: #396aff; color: #fff3cd; font-weight: bold;">{{ totalHoursPerWeek }}</td>
            </tr>
            <tr>
              <td colspan="2" style="background: #396aff; color: #fff3cd; font-weight: bold;">Total par année :</td>
              <td style="background: #396aff; color: #fff3cd; font-weight: bold;">{{ totalHoursPerYear }}</td>
            </tr>
            </tfoot>
          </table>
        </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
  import axios from "axios";
  import moment from "moment";
  import "moment-timezone";

  export default {
  name: "DashbodrUser",
  data() {
  return {
  id: null,
  allWorkingTimes: [],
  url: "localhost",
};
},
  computed: {
  totalHoursPerMonth() {
  let totalHours = 0;

  for (const monthlyWorkingTime of this.allWorkingTimes) {
  const start = moment(monthlyWorkingTime.start);
  const end = moment(monthlyWorkingTime.end);
  const durationMs = end.diff(start);
  const duration = moment.duration(durationMs);

  totalHours += duration.asHours();
}

  // Formater le total en heures, minutes et secondes pour un mois
  const totalHoursFormatted = Math.floor(totalHours);
  const totalMinutesFormatted = Math.floor((totalHours - totalHoursFormatted) * 60);
  const totalSecondsFormatted = Math.round((totalHours - totalHoursFormatted - (totalMinutesFormatted / 60)) * 3600);

  return `${totalHoursFormatted}h${totalMinutesFormatted}min${totalSecondsFormatted}s`;
},

  totalHoursPerWeek() {
  let totalHours = 0;

  for (const weeklyWorkingTime of this.allWorkingTimes) {
  const start = moment(weeklyWorkingTime.start);
  const end = moment(weeklyWorkingTime.end);
  const durationMs = end.diff(start);
  const duration = moment.duration(durationMs);

  totalHours += duration.asHours();
}

  // Formater le total en heures, minutes et secondes pour une semaine
  const totalHoursFormatted = Math.floor(totalHours);
  const totalMinutesFormatted = Math.floor((totalHours - totalHoursFormatted) * 60);
  const totalSecondsFormatted = Math.round((totalHours - totalHoursFormatted - (totalMinutesFormatted / 60)) * 3600);

  return `${totalHoursFormatted}h${totalMinutesFormatted}min${totalSecondsFormatted}s`;
},

  totalHoursPerYear() {
  let totalHours = 0;

  for (const yearlyWorkingTime of this.allWorkingTimes) {
  const start = moment(yearlyWorkingTime.start);
  const end = moment(yearlyWorkingTime.end);
  const durationMs = end.diff(start);
  const duration = moment.duration(durationMs);

  totalHours += duration.asHours();
}

  // Formater le total en heures, minutes et secondes pour une année
  const totalHoursFormatted = Math.floor(totalHours);
  const totalMinutesFormatted = Math.floor((totalHours - totalHoursFormatted) * 60);
  const totalSecondsFormatted = Math.round((totalHours - totalHoursFormatted - (totalMinutesFormatted / 60)) * 3600);

  return `${totalHoursFormatted}h${totalMinutesFormatted}min${totalSecondsFormatted}s`;
},
},
  mounted() {
  console.log(this.$route.params.id);
  this.id = this.$route.params.id;
  this.getWorkingTimes(this.id);
},
  methods: {
  async getWorkingTimes(id) {
  try {
  const response = await axios.get(
  `http://${this.url}:4000/api/working_timesAll/${id}`
  );
  this.allWorkingTimes = response.data;
  console.log(this.allWorkingTimes);
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
  const durationMs = endTime.diff(startTime);
  const duration = moment.duration(durationMs);

  const hours = duration.hours().toString().padStart(2, "0");
  const minutes = duration.minutes().toString().padStart(2, "0");
  const seconds = duration.seconds().toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
},

  formatWorkingTime(date) {
  return moment(date).subtract(1, "hour").format("YYYY-MM-DD HH:mm:ss");
},
},
};
</script>

<style>
</style>
