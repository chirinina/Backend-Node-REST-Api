import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js'

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
            notNull: { msg: 'Ingrese un nombre Tarea' },
        },
    },
    done: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notNull: { msg: 'Ingrese si la tarea está hecha o no' },
        },
    },
    
});