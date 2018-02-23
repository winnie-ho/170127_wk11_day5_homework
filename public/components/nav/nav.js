let navBar = Vue.component('nav-bar', {
  template: `
  <div id="nav">
    <div class="data hover nav-button" id="home-button"  v-on:click="handleNavButton('home')">WIN RUNS</div>

    <div class="data hover nav-button" id="run-club-button"  v-on:click="handleNavButton('run-club-home')">
      <img src="./resources/icon_run4it.png" class="nav-icon"/>
    </div>

    <div class="data hover nav-button" id="park-run-home-button" v-on:click="handleNavButton('park-run-home')">
      <img src="./resources/icon_park_run.png" class="nav-icon"/>
    </div>

    <div class="data hover nav-button" id="runs-button"  v-on:click="handleNavButton('runs')"> 
      <img src="./resources/icon_runs.png" class="nav-icon"/>
    </div>
  </div>
  `,
  name: "nav-bar",

  data: () => {
    return {
      pages: [
        "auth",
        "home",
        "weather-now",
        "run-club-home",
        "park-run-home",
        "park-run-splits",
        "park-run-graphs",
        "runs",
        "weather-forecast",
        "view-run"
      ],
      detailedViews: [
        "laps",
        "photos",
        "comments",
        "kudos"
      ]    

    }
  },

  methods: {
    resetPages: (navId) => {
      page.$refs.navBar.pages.forEach(page => {
        if (page !== navId) {
          document.getElementById(page).style.display="none";
        }
      });
    },
    
    handleNavButton: (navId) => {
      page.$refs.navBar.resetPages(navId);
      document.getElementById(navId).style.display = "block";
      
      switch(navId) {
        case "home":
          document.getElementById("weather-now").style.display = "flex";
        case "park-run-home":
          initParkRun();
          break;
        case "run-club-home":
          fetchRunClub();
          fetchRunClubMembers();    
          computeRunClubRuns(responseRuns);
          renderRunClubHome(runClubRuns);
          break;
        case "runs": 
          showRun(responseRuns);
        case "park-run-graphs":
          kmChart(parkRuns);
          break;
        default:
          return;
      }
    },

    handleToggleButton: (toggleId, id) => {
      let idTarget = document.getElementById(id);
      let target = document.getElementById(toggleId);
      if (target.style.display === 'flex' || target.style.display === "grid") {
        target.style.display = "none";
        idTarget.classList.remove('button-active');
      } else if (target.style.display === 'none') {
        page.$refs.navBar.detailedViews.forEach(detailedView => {
        document.getElementById(detailedView+"-detail").style.display = "none";
        document.getElementById(detailedView+"-button").classList.remove('button-active');
      });
          
        if (target.style.display === 'none') {
          target.style.display = "flex";
          idTarget.classList.add('button-active');
        }
        
        if (toggleId === "kudos-detail") {
          target.style.display = "grid";
          idTarget.classList.add('button-active');
        }
      }
    },
  },


  computed: {
  }
});





