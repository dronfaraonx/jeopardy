'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Game.belongsTo(models.User, {
        foreignKey: 'user_id', 
        as: 'user'
      });

      Game.hasMany(models.Category, {
        foreignKey: 'category_id',
        as: 'categories' 
      });
    }
  }
  Game.init({
    user_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};