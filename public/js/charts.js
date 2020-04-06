
var ctx = document.getElementById('mainChart').getContext('2d');
var ctx1 = document.getElementById('sexChart').getContext('2d');
var ctx2 = document.getElementById('sexChart2').getContext('2d');

console.log(Chart);
var demo = [
  { day: 1, infected: 34, death: 2, recover: 0 },
  { day: 2, infected: 112, death: 3, recover: 0 },
  { day: 3, infected: 202, death: 3, recover: 0 },
  { day: 4, infected: 245, death: 3, recover: 0 },
  { day: 5, infected: 312, death: 6, recover: 2 },
  { day: 6, infected: 392, death: 10, recover: 2 },
  { day: 7, infected: 488, death: 10, recover: 3 },
  { day: 8, infected: 581, death: 20, recover: 3 },
  { day: 9, infected: 719, death: 28, recover: 3 },
  { day: 10, infected: 859, death: 39, recover: 3 },
  { day: 11, infected: 901, death: 42, recover: 4 },
  { day: 12, infected: 1109, death: 51, recover: 5 },
  { day: 13, infected: 1280, death: 57, recover: 9 },
  { day: 14, infected: 1380, death: 60, recover: 16 }
]

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
    //Manage the res for insert values in the data
    let days = []
    for (var i = 0; i < demo.length; i++) {
      let actualDay = i+1
      days.push("Dia "+actualDay)
    }
    data.labels = days
    pushSchema(demo,"Fallecidos","rgba(255, 0, 0, 1)")
    pushSchema(demo,"Recuperados","rgba(51, 255, 51, 1)")
    pushSchema(demo,"Infectados","rgba(255, 255, 51, 1)")
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
});

var sexChart2 = new Chart(ctx2, {
    type: 'pie',
    data:sexData,
});
