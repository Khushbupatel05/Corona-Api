let countryName = document.getElementById("countryName")
let btnsubmit = document.getElementById("btn-submit")
let answer = document.getElementById("answer");


btnsubmit.addEventListener("click", function (){
    let countryName  = document.getElementById("countryName").value;

    const URL = `https://api.rootnet.in/covid19-in/stats/latest`;
    fetch(URL)
    .then((res)=> {
        return res.json();
    })
    .then((res) => {
        let states = res.data.regional;

        for(let i = 0; i < states.length; i++){
            if(states[i].loc.toLowerCase() === countryName.toLowerCase()){
                console.log(states[i])

                answer.innerHTML +=
                    "Total Confirmed: " + states[i].totalConfirmed + "<br>" +
                    "Deaths: " + states[i].deaths + "<br>";
                return;    
            }
        }
    })
});  