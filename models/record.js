const Sequelize = require('sequelize');
const sequelize = require('../controllers/db');
const Model = Sequelize.Model;
class Record extends Model {}

Record.init({
  // attributes
  Id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  Provincia: {
    type: Sequelize.STRING
    // allowNull defaults to true
  },
  Infectados: {
    type: Sequelize.INTEGER
  },
  Fallecidos: {
    type: Sequelize.INTEGER
  },
  Descartados: {
    type: Sequelize.INTEGER
  },
  Curados: {
    type: Sequelize.INTEGER
  },
  Dia: {
    type: Sequelize.INTEGER
  },
  Fecha: {
    type: Sequelize.STRING
  }
}, {
  sequelize,
  modelName: 'data_day',
  timestamps: false,
  freezeTableName: true,
});

Record.findAll({where: {Provincia:"Santiago"}})
.then(data => {
  var total = 0;
  for (var i = 0; i < data.length; i++) {
    var total = data[i].Infectados + total;
  }
  console.log(total);
})
