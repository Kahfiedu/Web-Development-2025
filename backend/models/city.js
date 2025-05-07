'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    static associate(models) {
      // City belongs to State
      City.belongsTo(models.State, {
        foreignKey: 'stateId',
        as: 'state',
        onDelete: 'CASCADE',
      });
    }
  }
  City.init({
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
    stateId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'City',
    tableName: 'cities',
    timestamps: true,
    paranoid: true // enable soft deletes (deletedAt)
  });
  return City;
};
