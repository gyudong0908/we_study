'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Choice extends Model { // 클래스 이름 모델 이름으로 바꿔 줘야함
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            // Choice.belongsTo(models.ClassChat, { foreignKey: 'chatId', onDelete: 'CASCADE' });
            Choice.belongsTo(models.Quiz, {
                foreignKey: 'id',
            
            });
        }
    }
    Choice.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        optionText: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Choice', // 모델 이름 바꿔줘야함
        timestamps: true,
        underscored: true,
        tableName: 'choices', // 테이블 이름 바꿔줘야함
    });
    return Choice; // return 할때 모델 이름으로 바꿔줘야함
};