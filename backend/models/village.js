'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Village extends Model {
    static associate(models) {
      // Relasi ke District
      Village.belongsTo(models.District, {
        foreignKey: 'districtId',
        as: 'district',
      });
    }
  }

  Village.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    districtId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'Village',
    paranoid: true, // Untuk mendukung soft delete
  });

  return Village;
};
