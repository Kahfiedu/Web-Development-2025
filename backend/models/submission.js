'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Submission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Submission.init({
    assignment_id: DataTypes.BIGINT,
    student_id: DataTypes.BIGINT,
    file_url: DataTypes.STRING,
    submitted_at: DataTypes.DATE,
    grade: DataTypes.FLOAT,
    feedback: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Submission',
  });
  return Submission;
};