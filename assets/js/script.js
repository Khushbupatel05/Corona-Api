let countryNameInput = document.getElementById("countryName");
let btnsubmit = document.getElementById("btn-submit");
let answer = document.getElementById("answer");

btnsubmit.addEventListener("click", function () {
  let countryName = countryNameInput.value.trim();
  answer.innerHTML = ""; 

  if (countryName === "") {
    Swal.fire({
      position: "top",
      icon: "error",
      title: "Enter Sate Name",
      showConfirmButton: false,
      timer: 1500
      
    });
    return;
  }

  const URL = `https://api.rootnet.in/covid19-in/stats/latest`;

  fetch(URL)
    .then((res) => res.json())
    .then((res) => {
      let states = res.data.regional;
      let found = false;

      for (let i = 0; i < states.length; i++) {
        if (states[i].loc.toLowerCase() === countryName.toLowerCase()) {
            answer.innerHTML = `
            <div class="stat-card confirmed">
              <div class="stat-info">
                <p class="stat-title">Total Confirmed</p>
                <p class="stat-value">${states[i].totalConfirmed}</p>
              </div>
              <i class="bi bi-bar-chart-line fs-3"></i>
            </div>
            <div class="stat-card discharged">
              <div class="stat-info">
                <p class="stat-title">Discharged</p>
                <p class="stat-value">${states[i].discharged}</p>
              </div>
             <i class="bi bi-person-check fs-3"></i>
            </div>
            <div class="stat-card deaths">
              <div class="stat-info">
                <p class="stat-title">Deaths</p>
                <p class="stat-value">${states[i].deaths}</p>
              </div>
             <i class="bi bi-person-x fs-3"></i>
            </div>
          `;
          found = true;
          break;
        }
      }

      if (!found) {
        Swal.fire({
          position: "top",
          icon: "error",
          title: "State not found",
          showConfirmButton: false,
          timer: 1500
          
        });
      }
    });
});
