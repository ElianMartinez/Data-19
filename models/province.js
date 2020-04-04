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
},{
  sequelize,
  modelName: 'provincias',
  timestamps: false,
  freezeTableName: true,
});





module.exports = Province;
