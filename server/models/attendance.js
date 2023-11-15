'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Attendance extends Model { // 클래스 이름 모델 이름으로 바꿔 줘야함
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Attendance.belongsTo(models.class, { foreignKey: 'classId' });
            Attendance.belongsTo(models.user, { foreignKey: 'userId' });
        }
    }
    Attendance.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        classId: {
            type: DataTypes.STRING,
        },
        userId: {
            type: DataTypes.STRING,
        },        
    }, {
        sequelize,
        modelName: 'attendance', // 모델 이름 바꿔줘야함
        timestamps: true,
        underscored: true,
        tableName: 'attendances', // 테이블 이름 바꿔줘야함
    });
    return Attendance; // return 할때 모델 이름으로 바꿔줘야함
};