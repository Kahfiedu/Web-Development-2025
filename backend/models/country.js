'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Country extends Model {
    static associate(models) {
      // Country hasMany State
      Country.hasMany(models.State, {
        foreignKey: 'countryId',
        as: 'states',
        onDelete: 'CASCADE',
      });
    }
  }
  Country.init({
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
    isoCode: {
      type: DataTypes.STRING(36),
      allowNull: true,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Country',
    tableName: 'countries',
    timestamps: true,
    paranoid: true // enable soft deletes (deletedAt)
  });
  return Country;
};
