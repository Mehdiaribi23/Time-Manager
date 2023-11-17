
<template>
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
            <span class="bx bxs-doughnut-chart"></span>
            Time Manager
          </h2>
        </div>
        <div class="sidebar-avartar">
          <div>
            <img src="../assets/logo.png" alt="time" />
          </div>
          <div class="avartar-info">
            <div class="avartar-text">
              <h6>Ralph Anderson</h6>
              <small>1029-1234-235</small>
            </div>
            <span class="bx bxs-chevron-down"></span>
          </div>
        </div>
        <div class="sidebar-menu">
          <ul>
            <li>
              <a href="#" class="active">
                <span class="bx bxs-dashboard"></span>
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span class="bx bx-bar-chart-alt"></span>
                <span>Charts</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span class="bx bx-timer"></span>
                <span>Clock</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span class="bx bx-user-circle"></span>
                <span>Profile</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span class="bx bx-timer"></span>
                <span>Clock</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span class="bx bx-user-circle"></span>
                <span>Profile</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="sidebar-card">
          <div class="side-card-icon">
            <span class="bx bxs-pie-chart-alt-2"></span>
          </div>
          <div>
            <h4>Make AdSense</h4>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit!</p>
          </div>
          <button class="btn-block">Create Now</button>
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
            <h1>Analystic</h1>
            <p>
              Dispalay analytics about your channel
              <span class="bx bx-line-chart"></span>
            </p>
          </div>
        </div>
        <div class="header-action">
          <button class="btn btn-main">
            <span class="bx bxs-videos"></span>
            Upload
          </button>
        </div>
      </header>
      <main>
        <section>
          <h3 class="section-head">overview</h3>
          <div class="analystics">
            <div class="analystic">
              <div class="analystic-icon">
                <span class="bx bx-low-vision"></span>
              </div>
              <div class="analystic-info">
                <h4>Total view</h4>
                <h1>10.3m</h1>
              </div>
            </div>
            <div class="analystic">
              <div class="analystic-icon">
                <span class="bx bx-low-vision"></span>
              </div>
              <div class="analystic-info">
                <h4>Watche Time (hrs)</h4>
                <h1>20.9k <small class="text-danger">5%</small></h1>
              </div>
            </div>
            <div class="analystic">
              <div class="analystic-icon">
                <span class="bx bx-low-vision"></span>
              </div>
              <div class="analystic-info">
                <h4>Total view</h4>
                <h1>10.3m</h1>
              </div>
            </div>
            <div class="analystic">
              <div class="analystic-icon">
                <span class="bx bx-low-vision"></span>
              </div>
              <div class="analystic-info">
                <h4>Watche Time (hrs)</h4>
                <h1>20.9k <small class="text-danger">5%</small></h1>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div class="block-grid">
            <div class="revenu-card">
              <h3 class="section-head">Total</h3>
              <div class="rev-content">
                <img src="../assets/logo.png" alt="" />
                <div class="revenu-info">
                  <h3>Axel Ouahmane</h3>
                  <h1>35.45m <small>super</small></h1>
                </div>
                <div class="rev-sum">
                  <h4>Total income</h4>
                  <h2>70,859€</h2>
                </div>
              </div>
            </div>
            <div class="graph-card">
              <h3 class="section-head">Graph</h3>
              <div class="graph-content">
                <div class="graph-head">
                  <div class="icon-wrapper">
                    <div class="icon">
                      <span class="bx bxs-time"></span>
                    </div>
                    <div class="icon">
                      <span class="bx bx-low-vision"></span>
                    </div>
                  </div>
                  <div class="graph-select">
                    <select name="" id="">
                      <option value="">September</option>
                    </select>
                  </div>
                </div>
                <div class="graph-board">
                  <canvas id="myChart" width="100%" height="50px"></canvas>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script >
import "boxicons";
import Chart from "chart.js/auto";

export default {
  name: "HomePage.vue",
  mounted() {
    this.createChart();
  },
  methods: {
    createChart() {
      const ctx = document.getElementById("myChart").getContext("2d");
      // ctx.height=150
      new Chart(ctx, {
        // type: 'bar', // Type de graphique (par exemple, 'bar', 'line', 'pie', etc.)
        type: "bar",
        data: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May"],
          datasets: [
            {
              label: "Revenue",
              data: [1000, 1200, 900, 1500, 1300],
              backgroundColor: "#eee", // Couleur de remplissage de la barre
              borderColor: "rgba(54, 162, 235, 1)", // Couleur de la bordure de la barre
              borderWidth: 3, // Largeur de la bordure de la barre
            },
          ],
        },
        options: {
          responsive: true,
          tooltips: {
            intersect: false,
            node: "index",
          },
        },
      });
    },
  },
};
</script>

<style>

</style>