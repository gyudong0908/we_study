'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ClassChat extends Model { // 클래스 이름 모델 이름으로 바꿔 줘야함
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ClassChat.hasMany(models.ChatMessage, { foreignKey: 'chatId' });
            ClassChat.belongsTo(models.Class, { foreignKey: 'classId' , onDelete: 'CASCADE'});
            ClassChat.hasMany(models.ChatUser, { foreignKey: 'chatId' });

        }
    }
    ClassChat.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
        },
        classId: {
            type: DataTypes.INTEGER,
        },

    }, {
        sequelize,
        modelName: 'ClassChat', // 모델 이름 바꿔줘야함
        timestamps: true,
        underscored: true,
        tableName: 'classchats', // 테이블 이름 바꿔줘야함
    });
    return ClassChat; // return 할때 모델 이름으로 바꿔줘야함
};