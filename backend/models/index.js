import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {isEmail: true},
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

}, {
    tableName: 'Users',
    timestamps: true,
});

export {sequelize, User};