var ctx3 = document.getElementById('infectedChart').getContext('2d');
let arrInfectados1 = []
let arrPrediccion = []


  fetch('/prediction')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    let array = myJson.data;
    let days = []
    for (var i = 0; i < array.length; i++) {
      let actualDay = i+1
      days.push("Dia "+actualDay)
    }
    predictData.labels = days

      for (var i = 0; i < array.length; i++) {
            arrInfectados1.push(array[i].infected)
      }

      for (var i = 0; i < array.length; i++) {
        arrPrediccion.push(array[i].expect)
      }


  });




let predictData =  {
    labels:[],
    datasets: [{
        fill:false,
        lineTension:0,
        label:"Prediccion",
        data:arrPrediccion,
        borderColor: ["rgba(153, 204, 255, 1)"],
        borderWidth: 3,
    },
    {
        fill:false,
        lineTension:0,
        label:"Infectados",
        data:arrInfectados1,
        borderColor: ["rgba(255, 0, 0, 1)"],
        borderWidth: 3,
    }]
}
let options_ = {
  responsive:true,
    scales: {
        yAxes: [{
          stacked: false,
            ticks: {
                beginAtZero: true
            }
        }]
    }
}


console.log(predictData);
var infectedChart = new Chart(ctx3, {
    type: 'line',
    data:predictData,
    options:options_
});
