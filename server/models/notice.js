'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Notice extends Model { // 클래스 이름 모델 이름으로 바꿔 줘야함
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Notice.belongsTo(models.Class, { foreignKey: 'classId' , onDelete: 'CASCADE'})
        }
    }
    Notice.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        classId: {
            type: DataTypes.INTEGER,
        },
        title: {
            type: DataTypes.STRING,
        },
        content: {
            type: DataTypes.TEXT,
        },
    }, {
        sequelize,
        modelName: 'Notice', // 모델 이름 바꿔줘야함
        timestamps: true,
        underscored: true,
        tableName: 'notices', // 테이블 이름 바꿔줘야함
    });
    return Notice; // return 할때 모델 이름으로 바꿔줘야함
};