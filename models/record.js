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
  Id_provincia: {
    type: Sequelize.INTEGER
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

module.exports = Record;
