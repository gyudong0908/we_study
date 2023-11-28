'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Quiz extends Model { // 클래스 이름 모델 이름으로 바꿔 줘야함
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Quiz.belongsTo(models.ClassChat, { foreignKey: 'chatId', onDelete: 'CASCADE' });
            // Quiz.belongsTo(models.ChatUser, { foreignKey: 'chatUserId' });
        }
    }
    Quiz.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        question: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quizType: {
            type: DataTypes.ENUM('객관식', '서술형'),
            allowNull: false,
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        answer: {
            type: DataTypes.STRING,
            allowNull: true, //객관식 퀴즈의 경우 null 값
        }
    }, {
        sequelize,
        modelName: 'Quiz', // 모델 이름 바꿔줘야함
        timestamps: true,
        underscored: true,
        tableName: 'quizzes', // 테이블 이름 바꿔줘야함
    });
    return Quiz; // return 할때 모델 이름으로 바꿔줘야함
};