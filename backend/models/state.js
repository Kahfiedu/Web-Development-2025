'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class State extends Model {
    static associate(models) {
      // State belongs to Country
      State.belongsTo(models.Country, {
        foreignKey: 'countryId',
        as: 'country',
        onDelete: 'CASCADE',
      });

      // State hasMany City
      State.hasMany(models.City, {
        foreignKey: 'stateId',
        as: 'cities',
        onDelete: 'CASCADE',
      });
    }
  }
  State.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(36),
      allowNull: false,
      unique: true
    },
    countryId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'State',
    tableName: 'states',
    timestamps: true,
    paranoid: true // enable soft deletes
  });
  return State;
};
