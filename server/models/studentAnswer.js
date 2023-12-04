'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class StudentAnswer extends Model { // 클래스 이름 모델 이름으로 바꿔 줘야함
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            StudentAnswer.belongsTo(models.Question, { foreignKey: 'questionId' , onDelete: 'CASCADE'});
            StudentAnswer.belongsTo(models.User, { foreignKey: 'userId' , onDelete: 'CASCADE'});
        }
    }
    StudentAnswer.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        questionId:{
            type: DataTypes.INTEGER,
        },
        userId:{
            type: DataTypes.INTEGER,
        },
        answer: {
            type: DataTypes.JSON,
        },
        check: {
            type: DataTypes.BOOLEAN,
        },
    }, {
        sequelize,
        modelName: 'StudentAnswer', // 모델 이름 바꿔줘야함
        timestamps: true,
        underscored: true,
        tableName: 'studentAnswers', // 테이블 이름 바꿔줘야함
    });
    return StudentAnswer; // return 할때 모델 이름으로 바꿔줘야함
};