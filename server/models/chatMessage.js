'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ChatMessage extends Model { // 클래스 이름 모델 이름으로 바꿔 줘야함
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ChatMessage.belongsTo(models.chatUser, { foreignKey: 'chatUserId' })
        }
    }
    ChatMessage.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        chatUserId: {
            type: DataTypes.INTEGER,
        },
        message: {
            type: DataTypes.STRING,
        }
    }, {
        sequelize,
        modelName: 'chatMessage', // 모델 이름 바꿔줘야함
        timestamps: true,
        underscored: true,
        tableName: 'chatMessages', // 테이블 이름 바꿔줘야함
    });
    return ChatMessage; // return 할때 모델 이름으로 바꿔줘야함
};