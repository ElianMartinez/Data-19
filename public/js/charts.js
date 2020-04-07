
var ctx = document.getElementById('mainChart').getContext('2d');
var ctx1 = document.getElementById('sexChart').getContext('2d');
var ctx2 = document.getElementById('poblationChart').getContext('2d');
let arrInfectados = []
let arrRecuperados = []
let arrFallecidos = []

  fetch('/graphic')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    let array = myJson.data;
    let days = []

    for (var i = 0; i < array.length; i++) {
      let actualDay = i+1
      days.push("Día "+actualDay)
    }
    data.labels = days
      for (var i = 0; i < array.length; i++) {
        arrInfectados.push(array[i].infected)
      }

      for (var i = 0; i < array.length; i++) {
        arrRecuperados.push(array[i].recover)
      }

      for (var i = 0; i < array.length; i++) {
        arrFallecidos.push(array[i].death)
      }
  });


let data =  {
    labels:[],
    datasets: [{
        fill:false,
        lineTension:0,
        label:"Fallecidos",
        data:arrFallecidos,
        borderColor: ["rgba(255, 0, 0, 1)"],
        borderWidth: 3
    },
    {
        fill:false,
        lineTension:0,
        label:"Infectados",
        data:arrInfectados,
        borderColor: ["rgba(255, 255, 51, 1)"],
        borderWidth: 3
    },
    {
        fill:false,
        lineTension:0,
        label:"Recuperados",
        data:arrRecuperados,
        borderColor: ["rgba(51, 255, 51, 1)"],
        borderWidth: 3
    }]
}

let options = {
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


//var ctx = document.getElementById('mainChart');
var mainChart = new Chart(ctx, {
    type: 'line',
    data:data,
    options:options
});


var sexData = {
    datasets: [{
        data: [78, 22],
        borderColor:'#fff',
        backgroundColor:['rgba(135,206,250, 1)','rgba(255,160,122, 1)']
    },],
    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
        'Hombres',
        'Mujeres'
    ]
};

var sexChart = new Chart(ctx1, {
    type: 'pie',
    data:sexData,
    options:{
      responsive:true
    }
});

var poblationData = {
    datasets: [{
        data: [1,99],
        borderColor:'#fff',
        backgroundColor:['rgba(255,102,102, 1)','rgba(102,255,102, 1)']
    },],
    // These labels appear in the legend and in the tooltips when hovering different arcs
    labels: [
        'Infectados',
        'No infectados'
    ]
};

var sexChart2 = new Chart(ctx2, {
    type: 'pie',
    data:poblationData,
});
