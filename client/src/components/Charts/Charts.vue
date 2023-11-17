
<template>
    <div class="container">
      <canvas id="mychart" width="300" height="100"></canvas>
    </div>
  </template>
 <script>
import Chart from 'chart.js/auto';
// import ChartData from '../../charts/chartOptions.js';

export default {
  name: 'MyChart',
  props: ['chartInput', 'chartType'],
  data() {
    return {
      // ChartData: ChartData,
      graphData: {
        labels: this.chartInput['chartLabels'],
        datasets: [
          {
            label: this.chartInput['chartTitle'],
            data: this.chartInput['chartValues'],
            backgroundColor: [
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 99, 132, 0.5)',
              'rgba(75, 192, 192, 0.5)',
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
              'rgba(255, 99, 132, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 3,
          },
        ],
      },
      options: {
        responsive: true,
        tooltips: {
          intersect: false,
          mode: 'index',
        },
      },
      myChart: null, // Store the chart instance
    };
  },
  mounted() {
    this.createChart();
  },
  watch: {
    chartType: 'handleChartUpdate', // Watch for changes in chartType
  },
  methods: {
    createChart() {
      const ctx = document.getElementById('mychart');

      // Destroy existing chart if it exists
      if (this.myChart) {
        this.myChart.destroy();
      }

      this.myChart = new Chart(ctx, {
        type: this.chartType,
        data: this.graphData,
        options: this.options,
      });
    },
    handleChartUpdate(newChartType, oldChartType) {
      // Update chart only if the chart type has changed
      if (newChartType !== oldChartType) {
        this.createChart();
      }
    },
  },
};
</script>

 