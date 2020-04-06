
var ctx = document.getElementById('mainChart').getContext('2d');
var ctx1 = document.getElementById('sexChart').getContext('2d');
var ctx2 = document.getElementById('poblationChart').getContext('2d');



let data =  {
    labels:[],
    datasets: []
}


function loadMainGrahp() {
  fetch('/graphic')
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
    data.labels = days
    pushSchema(array,"Fallecidos","rgba(255, 0, 0, 1)")
    pushSchema(array,"Recuperados","rgba(51, 255, 51, 1)")
    pushSchema(array,"Infectados","rgba(255, 255, 51, 1)")
  });
}
loadMainGrahp()

function pushSchema(array,label,color) {
  let schema = {
      fill:false,
      lineTension:0,
      label:"",
      data:[],
      borderColor: [],
      borderWidth: 3
  }
  let data_ = []
  if (label == "Infectados") {
    for (var i = 0; i < array.length; i++) {
      data_.push(array[i].infected)
    }
  }else if (label == "Recuperados") {
    for (var i = 0; i < array.length; i++) {
      data_.push(array[i].recover)
    }
  }else if (label == "Fallecidos") {
    for (var i = 0; i < array.length; i++) {
      data_.push(array[i].death)
    }
  }

  schema.data = data_
  schema.label = label
  schema.borderColor = [color]
  data.datasets.push(schema)
  console.log(schema);

}

let options = {
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
