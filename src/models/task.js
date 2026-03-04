import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js'
import { User } from './user.js'

export const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Ingrese un nombre de Tarea' },
        },
    },
    done: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
            notNull: { msg: 'Indique si la tarea está hecha o no' },
        },
    },
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
});
