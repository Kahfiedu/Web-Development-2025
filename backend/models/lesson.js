'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lesson extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Lesson.belongsTo(models.Course, {
        foreignKey: 'courseId',
        as: 'course',
      })
    }
  }
  Lesson.init({
    id: {
      allowNull: false,
      unique: true,
      primaryKey: true,
      type: DataTypes.STRING(36),
      defaultValue: DataTypes.UUIDV4,
    },
    courseId: {
      type: DataTypes.STRING(36),
      references: {
        model: 'courses',
        key: 'id'
      },
      onDelete: 'CASCADE',
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    videoUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Lesson',
    tableName: 'lessons',
    paranoid: true,
    timestamps: true
  });
  return Lesson;
};