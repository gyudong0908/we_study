'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ChatUser extends Model { // 클래스 이름 모델 이름으로 바꿔 줘야함
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            ChatUser.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE' });
            ChatUser.belongsTo(models.ClassChat, { foreignKey: 'chatId', onDelete: 'CASCADE' });
            ChatUser.hasMany(models.ChatMessage, { foreignKey: 'chatUserId' });
        }
    }
    ChatUser.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        chatId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'ChatUser', // 모델 이름 바꿔줘야함
        timestamps: true,
        underscored: true,
        tableName: 'chatUsers', // 테이블 이름 바꿔줘야함
    });
    return ChatUser; // return 할때 모델 이름으로 바꿔줘야함
};