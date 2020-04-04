const Record = require('../models/record');
const Province = require('../models//province');

Province.hasMany(Record, {foreignKey: 'Id'})
Record.belongsTo(Province, {foreignKey: 'Id_provincia'})

//Record.findAll({ where: {Dia:11 }, include: [Province]})


async function actualDay() {
  var maxDia = 0;
   var data = await Record.findAll()
     for (var i = 0; i < data.length; i++) {
       if (data[i].Dia > maxDia) {
         maxDia = maxDia + 1;
       }
     }
     return maxDia;
}


async function serveData(param) {
  let day = await actualDay()
  let total = 0;
  let data = await Record.findAll({where:{Dia:day}})
  if (param == "Infected" ) {
    for (let i = 0; i < data.length; i++) {
      total = data[i].Infectados+ total;
    }
  }else if (param == "Death") {
    for (let i = 0; i < data.length; i++) {
      total = data[i].Fallecidos+ total;
    }
  }else if (param == "Recover") {
    for (let i = 0; i < data.length; i++) {
      total = data[i].Curados+ total;
    }
  }else {
    total = 0;
  }
  console.log(total);
  return total;
}


async function mainGraphic() {
  let graphData = [];
  let tmpDeath = 0;
  let tmpRecover = 0;
  let tmpInfected = 0;
  let days = await actualDay() + 1;
  let data = await Record.findAll();

  for (var c = 1; c < days; c++) {
      let dayData = await Record.findAll({where:{Dia:c}})

      for (var i = 0; i < dayData.length; i++) {
        tmpDeath = dayData[i].Fallecidos + tmpDeath
      }

      for (var i = 0; i < dayData.length; i++) {
        tmpInfected = dayData[i].Infectados + tmpInfected
      }

      for (var i = 0; i < dayData.length; i++) {
        tmpRecover = dayData[i].Curados + tmpRecover
      }

      graphData.push({
        day:c,
        infected:tmpInfected,
        death:tmpDeath,
        recover:tmpRecover
      })
      tmpRecover = 0;
      tmpDeath = 0;
      tmpInfected = 0;
  }
  console.log(graphData);
    return graphData;
}

mainGraphic()



//module.exports = ServeAllDays;
