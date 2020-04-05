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

async function predictInfection() {
  let data = await mainGraphic()
  let expect = [];
  let tmp = 0;
  for (var i = 0; i < data.length; i++) {
    if (i > 1) {
      tmp = data[i].infected/data[i-1].infected
      //console.log(data[i].infected+"/"+data[i-1].infected);
      let res = Math.round(tmp.toFixed(2)*data[i].infected)
      if (i > 1) {
        expect.push({
          day:data[i].day,
          infected:data[i].infected,
          expect:res
        })
      }

    }else {
      expect.push({
        day:data[i].day,
        infected:data[i].infected,
        expect:0
      })
    }

  }
  return expect;
}

async function deathRate() {
  let death = await serveData("Death")
  let infected = await serveData("Infected")

  let _death = parseInt(death)
  let _infected = parseInt(infected)
  let rate = _death/_infected
  return rate.toFixed(2);
}

 async function infectedPorcent() {
  let poblation = 10169000;
  let infected = await serveData("Infected")
  let _infected = parseInt(infected)

  let porcent = _infected/poblation
  return porcent.toFixed(4);
}


module.exports = infectedPorcent;
module.exports = serveData;
module.exports = mainGraphic;
module.exports = predictInfection;
module.exports = deathRate;
