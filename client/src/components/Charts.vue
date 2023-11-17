<template>
  <div class="container">
    <canvas id="mychart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  name: 'MyChart',
  props: ['chartInput'],
  data() {
    return {
      graphData: {
        labels: this.chartInput.chartLabels,
        datasets: [
          {
            label: this.chartInput.chartTitle,
            data: this.chartInput.chartValues,
            backgroundColor: "rgba(221,255,221)",
            borderColor: "#36495d",
            borderWidth: 3
          }
        ]
      },
    }
  },
  mounted() {
    const ctx = document.getElementById('mychart');
    new Chart(ctx, {
      type: 'line', // Utilisez ici le type de graphique approprié (bar, line, pie, etc.)
      data: this.graphData,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
</script>

<style>
/* Styles CSS pour votre composant MyChart */
</style>
