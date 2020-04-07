var ctx3 = document.getElementById('infectedChart').getContext('2d');
let predictData =  {
    labels:[],
    datasets: []
}
let options_ = {
  responsive:true,
    scales: {
        yAxes: [{
          stacked: true,
            ticks: {
                beginAtZero: true
            }
        }]
    }
}
loadPredictGrahp()

function loadPredictGrahp() {
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
    pushSchema(array,"Infectados","rgba(255, 0, 0, 1)")
    pushSchema(array,"Esperado","rgba(153, 204, 255, 1)")
  });
}


function pushSchema(array,label,color) {
  let schema = {
      fill:false,
      lineTension:0,
      label:"",
      data:[],
      borderColor: [],
      borderWidth: 3,
  }
  let tdata = []
  if (label == "Infectados") {
    for (var i = 0; i < array.length; i++) {
          tdata.push(array[i].infected)
    }
  }else if (label == "Esperado") {
    for (var i = 0; i < array.length; i++) {
      tdata.push(array[i].expect)
    }
  }
  schema.data = tdata
  schema.label = label
  schema.borderColor = [color]
  predictData.datasets.push(schema)

}

console.log(predictData);
var infectedChart = new Chart(ctx3, {
    type: 'line',
    data:predictData,
    options:options_
});
