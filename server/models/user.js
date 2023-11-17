'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model { // 클래스 이름 모델 이름으로 바꿔 줘야함
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.ChatUser, { foreignKey: 'userId' });
      User.hasMany(models.Memo, { foreignKey: 'userId' });
      User.hasMany(models.Attendance, { foreignKey: 'userId' });
      User.hasMany(models.Submit, { foreignKey: 'userId' });
      User.belongsToMany(models.Class, { through: 'classUser' });
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nickName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthDay: {
      type: DataTypes.DATE,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    job: {
      type: DataTypes.STRING,
      allowNull: false
    },
    goal: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profilePath: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'User', // 모델 이름 바꿔줘야함
    timestamps: true,
    underscored: true,
    tableName: 'users', // 테이블 이름 바꿔줘야함
  });
  return User; // return 할때 모델 이름으로 바꿔줘야함
};