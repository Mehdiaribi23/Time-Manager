import { formatTime } from './utils.js'

export const ChartData = {
    type: "bar",
    data: {
      datasets: [
        {
          backgroundColor: "rgba(54,73,93,.5)",
          borderColor: "#36495d",
          color:"#36495d",
          borderWidth: 3
        }
      ]
    },
    options: {
      responsive: true,
      lineTension: 0,
      fill: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: (value) => formatTime(value),
          },
        },
      },
    },
  };
  
  export default ChartData;