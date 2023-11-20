'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Work extends Model { // 클래스 이름 모델 이름으로 바꿔 줘야함
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Work.belongsTo(models.Curriculum, { foreignKey: 'curriculumId' });
      Work.hasMany(models.Submit, { foreignKey: 'workId' });
    }
  }
  Work.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    curriculumId: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    dueDateTime:{
      type: DataTypes.DATE,
    }
  }, {
    sequelize,
    modelName: 'Work', // 모델 이름 바꿔줘야함
    timestamps: true,
    underscored: true,
    tableName: 'works', // 테이블 이름 바꿔줘야함
  });
  return Work; // return 할때 모델 이름으로 바꿔줘야함
};