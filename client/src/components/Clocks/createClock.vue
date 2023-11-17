<template>
  <div class="div">
    <div class="horloge-parent">
      <h1 class="horloge">{{ formatTime(currentTime) }}</h1>
      <div class="horloge-btn">
        <button @click="createClock(id)">{{ buttonLabel }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "boxicons";
import moment from "moment";
import "moment-timezone";

export default {
  name: "createClock",
  data() {
    return {
      id: null,
      buttonLabel: "Je Badge",
      workingTimeData: {
        start: "",
        end: "",
        user_id: "",
      },
      timerId: null,
      url: "localhost",
      timerState: localStorage.getItem("timerState") || "stopped",
      currentTime: parseInt(localStorage.getItem("currentTime")) || 0,
    };
  },
  mounted() {
    console.log(this.$route.params.id);
    this.id = this.$route.params.id;
    if (this.timerState === "running") {
      this.startTimer();
    }
  },
  beforeUnmount() {
    // Before leaving the page, save the timer state and elapsed time
    localStorage.setItem("timerState", this.timerState);
    localStorage.setItem("currentTime", this.currentTime.toString());
  },
  methods: {
    async createClock(user_id) {
      try {
        // Update timerState to indicate that the timer is running
        this.timerState = "running";

        const currentDate = moment().tz("Europe/Paris");
        const data = {
          time: currentDate.add(1, "hours"),
        };

        const response = await axios.post(
          `http://${this.url}:4000/api/clocks/${user_id}`,
          { clock: data }
        );

        console.log("Clock créée avec succès:", response.data);

        if (response.data.status === false) {
          this.workingTimeData.start = JSON.parse(
            localStorage.getItem("start")
          );
          this.workingTimeData.user_id = user_id;
          this.workingTimeData.end = response.data.time;

          axios
            .post(`http://${this.url}:4000/api/working_times/${user_id}`, {
              working_time: this.workingTimeData,
            })
            .then((response) => {
              console.log("Working time créé avec succès:", response.data);
              localStorage.removeItem("start");
              // Mettez à jour timerState pour indiquer que le chronomètre est arrêté
             
            });
            this.resetTimer();
            this.value="Stop"

          
        } else if (response.data.status === true) {
          localStorage.setItem("start", JSON.stringify(response.data.time));
          this.startTimer();
        }
      } catch (error) {
        console.error("Erreur lors de la création de la clock :", error);
        // Update timerState to indicate that the timer is stopped in case of an error
        this.timerState = "stopped";
        this.value="Je Badge"
      }
    },

    startTimer() {
      this.timerState = "running";
      this.timerId = setInterval(() => {
        this.currentTime++;
        // Save the current time in localStorage on each tick
        localStorage.setItem("currentTime", this.currentTime.toString());
      }, 1000);
    },

    resetTimer() {
      // Reset the timer and clear the data saved in localStorage
      this.currentTime = 0;
      this.timerState = "stopped";
      clearInterval(this.timerId);
      localStorage.removeItem("timerState");
      localStorage.removeItem("currentTime");
    },

    formatTime(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}:${String(secs).padStart(2, "0")}`;
    },
  },
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
