// var demo = [{day: 1, infected: 34, death: 2, recover: 0 },
//   { day: 2, infected: 112, death: 3, recover: 0 },
//   { day: 3, infected: 202, death: 3, recover: 0 },
//   { day: 4, infected: 245, death: 3, recover: 0 },
//   { day: 5, infected: 312, death: 6, recover: 2 },
//   { day: 6, infected: 392, death: 10, recover: 2 },
//   { day: 7, infected: 488, death: 10, recover: 3 },
//   { day: 8, infected: 581, death: 20, recover: 3 },
//   { day: 9, infected: 719, death: 28, recover: 3 },
//   { day: 10, infected: 859, death: 39, recover: 3 },
//   { day: 11, infected: 901, death: 42, recover: 4 },
//   { day: 12, infected: 1109, death: 51, recover: 5 },
//   { day: 13, infected: 1280, death: 57, recover: 9 },
//   { day: 14, infected: 1380, death: 60, recover: 16 }]

  fetch("/graphic")
  .then(function(response) {
    return response.json();
  })
  .then(function(json) {
    loadStadistics(json.data)
  })


function loadStadistics(demo) {
  var table = document.getElementById('tabla')
  var items = table.getElementsByTagName('tr')
  for (var c = 0; c < demo.length; c++) {
    for (var i = 0; i < items.length; i++) {
      var headOrNot = i % 2;
      if (headOrNot == 0) {
          var node = document.createElement("th");
      }else {
          var node = document.createElement("td");
      }

      switch (i) {
        case 0:
          var textnode = document.createTextNode("Dia"+demo[c].day);
          node.classList.add("dia");
          break;
        case 1:
          let date = demo[c].date.replace(/-/g, "/");
          var textnode = document.createTextNode(date);
          node.classList.add("fecha");
        break;
        case 2:
          var textnode = document.createTextNode(demo[c].infected);
          node.classList.add("infec");
        break;
        case 3:
        if (c == 0) {
          var textnode = document.createTextNode("0");
        }else {
          let difference = demo[c].infected-demo[c-1].infected;
          var textnode = document.createTextNode("+"+difference);
        }
        node.classList.add("aumento-i");
        break;
        case 4:
          var textnode = document.createTextNode(demo[c].death);
          node.classList.add("fallecido");
        break;
        case 5:
        if (c == 0) {
          var textnode = document.createTextNode("0");
        }else {
          let difference = demo[c].death-demo[c-1].death;
          var textnode = document.createTextNode("+"+difference);
        }
        node.classList.add("aumento-f");
        break;
        case 6:
        if (c == 0) {
          var textnode = document.createTextNode("0");
        }else {
          var last = c-1
          //console.log(last);
          let decimal = demo[c].infected/demo[last].infected
          let div = 1/demo[c].day
          let formula = Math.pow(decimal.toFixed(4),div.toFixed(4))-1
          var textnode = document.createTextNode(formula.toFixed(4));
        }
        node.classList.add("velocidad");
        break;
        default:

      }
      node.appendChild(textnode);
      items[i].appendChild(node)
    }
  }
}
