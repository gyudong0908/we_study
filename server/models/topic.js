'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Topic extends Model { // 클래스 이름 모델 이름으로 바꿔 줘야함
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Topic.belongsTo(models.Class, { foreignKey: 'classId' });
            Topic.hasMany(models.Work, { foreignKey: 'topicId' });
        }
    }
    Topic.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        classId: {
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
        },


    }, {
        sequelize,
        modelName: 'Topic', // 모델 이름 바꿔줘야함
        timestamps: true,
        underscored: true,
        tableName: 'topics', // 테이블 이름 바꿔줘야함
    });
    return Topic; // return 할때 모델 이름으로 바꿔줘야함
};