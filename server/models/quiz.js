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
            Quiz.belongsTo(models.Class, { foreignKey: 'classId' , onDelete: 'CASCADE'});
            Quiz.hasMany(models.Question, { foreignKey: 'quizId' });

        }
    }
    Quiz.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        classId:{
            type: DataTypes.INTEGER,
        },
        dueDateTime: {
            type: DataTypes.DATE,
        },
        title:{
            type: DataTypes.STRING,
        },
        description:{
            type: DataTypes.TEXT,
        },
        depoly:{
            type: DataTypes.BOOLEAN,
        },
        startDateTime:{
            type: DataTypes.DATE,
        },
    }, {
        sequelize,
        modelName: 'Quiz', // 모델 이름 바꿔줘야함
        timestamps: true,
        underscored: true,
        tableName: 'quizzes', // 테이블 이름 바꿔줘야함
    });
    return Quiz; // return 할때 모델 이름으로 바꿔줘야함
};