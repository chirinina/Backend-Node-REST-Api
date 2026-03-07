import { DataTypes, Sequelize } from 'sequelize';
import { sequelize } from '../database/database.js'
import { Status } from '../constans/index.js'
import { Task } from './task.js'
import { enbcryptar } from '../common/bcrypt.js'

export const User = sequelize.define('Users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Ingrese un nombre de usuario' },
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: 'Ingrese una contraseña' },
        },
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: Status.ACTIVE,
        validate: {
            isIn: {
                args: [[Status.ACTIVE, Status.INACTIVE]],
                msg: 'Deber ser ${Status.ACTIVE} o ${Status.INACTIVE}',
            },
    }    },
});


/* relaciones Sequelize */
User.hasMany(Task, {
  foreignKey: "userId"
});

Task.belongsTo(User, {
  foreignKey: "userId"
});
User.beforeCreate(async (user) => {
    user.password = await enbcryptar(user.password);
});

