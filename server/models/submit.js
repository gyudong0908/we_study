'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Submit extends Model { // 클래스 이름 모델 이름으로 바꿔 줘야함
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Submit.belongsTo(models.Work, { foreignKey: 'workId' , onDelete: 'CASCADE'});
      Submit.belongsTo(models.User, { foreignKey: 'userId' , onDelete: 'CASCADE'});
    }
  }
  Submit.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    workId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.TEXT,
    },
    private: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    filePath: {
      type: DataTypes.TEXT,
    },
    downloadPath: {
      type: DataTypes.TEXT,
    },
    grade: {
      type: DataTypes.INTEGER,
    },
    feedback: {
      type: DataTypes.STRING,
    },
    fileName:{
      type: DataTypes.TEXT,
    }
  }, {
    sequelize,
    modelName: 'Submit', // 모델 이름 바꿔줘야함
    timestamps: true,
    underscored: true,
    tableName: 'submits', // 테이블 이름 바꿔줘야함
  });
  return Submit; // return 할때 모델 이름으로 바꿔줘야함
};