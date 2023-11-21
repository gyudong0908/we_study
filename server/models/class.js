'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Class extends Model { // 클래스 이름 모델 이름으로 바꿔 줘야함
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Class.hasMany(models.Topic, { foreignKey: 'classId' });
      Class.hasMany(models.Attendance, { foreignKey: 'classId' });
      Class.hasMany(models.ClassChat, { foreignKey: 'classId' });
      Class.belongsToMany(models.User, { through: 'classUser' });
      Class.hasMany(models.Notice, { foreignKey: 'classId' });
      Class.hasMany(models.Curriculum, { foreignKey: 'classId' });

    }
  }
  Class.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
    },
    section: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.TEXT,
    },
    code: {
      type: DataTypes.STRING,
    },
    teacher: {
      type: DataTypes.INTEGER,
    },

  }, {
    sequelize,
    modelName: 'Class', // 모델 이름 바꿔줘야함
    timestamps: true,
    underscored: true,
    tableName: 'classes', // 테이블 이름 바꿔줘야함
  });
  return Class; // return 할때 모델 이름으로 바꿔줘야함
};