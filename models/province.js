const Sequelize = require('sequelize');
const sequelize = require('../controllers/db');
const Model = Sequelize.Model;
class Province extends Model {}

Province.init({
  // attributes
  Id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  Nombre: {
    type: Sequelize.INTEGER
  },
  codigo: {
    type: Sequelize.STRING
  },
  poblacion: {
    type: Sequelize.STRING
  },
},{
  sequelize,
  modelName: 'provincias',
  timestamps: false,
  freezeTableName: true,
});





module.exports = Province;
