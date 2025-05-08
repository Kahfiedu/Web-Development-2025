'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class District extends Model {
    static associate(models) {
      // Relasi ke City
      District.belongsTo(models.City, {
        foreignKey: 'cityId',
        as: 'city'
      });

      // Jika kamu lanjut buat model Village:
      District.hasMany(models.Village, {
        foreignKey: 'districtId',
        as: 'villages'
      });
    }
  }

  District.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cityId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'District',
    paranoid: true, // Untuk mendukung soft delete (deletedAt)
  });

  return District;
};
