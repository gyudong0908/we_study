'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Question extends Model { // 클래스 이름 모델 이름으로 바꿔 줘야함
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Question.belongsTo(models.Quiz, { foreignKey: 'quizId' , onDelete: 'CASCADE'});
            Question.hasMany(models.Choice, { foreignKey: 'questionId' });
            Question.hasMany(models.StudentAnswer, { foreignKey: 'questionId' });
        }
    }
    Question.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        quizId:{
            type: DataTypes.INTEGER,
        },
        title: {
            type: DataTypes.STRING,
        },
        questionType: {
            type: DataTypes.ENUM('객관식','서술형','단답형'),
        },
        score: {
            type: DataTypes.INTEGER,
        },
        answer: {
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        modelName: 'Question', // 모델 이름 바꿔줘야함
        timestamps: true,
        underscored: true,
        tableName: 'questions', // 테이블 이름 바꿔줘야함
    });
    return Question; // return 할때 모델 이름으로 바꿔줘야함
};