'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rank extends Model { // 클래스 이름 모델 이름으로 바꿔 줘야함
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rank.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' })
    }
  }
  Rank.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,

      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    studyTime: {
      type: DataTypes.INTEGER,
    },
    startTime: {
      type: DataTypes.DATE,
    },

  }, {
    sequelize,
    modelName: 'Rank', // 모델 이름 바꿔줘야함
    timestamps: true,
    underscored: true,
    tableName: 'ranks', // 테이블 이름 바꿔줘야함
  });
  return Rank; // return 할때 모델 이름으로 바꿔줘야함
};

