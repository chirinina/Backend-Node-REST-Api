import { User } from '../models/user.js';
import { Task } from '../models/task.js';
import { Status} from '../constans/index.js';
import  logger from '../logs/logger.js';
import { enbcryptar } from '../common/bcrypt.js';
import { Model, where } from 'sequelize';

async function create(req, res) {
  const { username, password } = req.body;
  try {
    const newUser = await User.create({ 
      username, 
      password 
    });
    return res.json(newUser);
  }
  catch (error) {
    logger.error(error);
    return error
    }
}


async function get(req, res) {
  try {
    const users = await User.findAndCountAll({
      attributes: ['id', 'username', 'password', 'status'],
      order: [['id', 'DESC']],
      where: { 
        status: Status.ACTIVE
      },
    })
    res.json({
      Total: users.count,
      data: users.rows
     })
  } catch (error) {
    logger.error(error);
    return res.json({error});
  }
}

async function find(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      attributes: ['username', 'status'],
      where: { 
        id,
        },
      });
      if(!user) {
        return res.json({message: 'User not found'})
      }
      res.json(user);
    } catch (error) {
      logger.error(error);
      return res.json({error});
    }
    }

  const update = async (req, res) => {
    const { id } = req.params;
    const { username, password } = req.body;
    const passwordHash = await enbcryptar(password);
    try {
      const user = await User.findOne({
        where: { 
          id,
          status: Status.INACTIVE
        },
      });
      if(!user) {
        return res.json({message: 'Usuario no encontrado'})
      }
      user.username = username;
      user.password = passwordHash;
      await user.save();
      res.json(user);
    } catch (error) {
      logger.error(error);
      return res.json({error});
    }
  }
const activateinactive = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const user = await User.findOne({
      where: { 
        id,
        },
      });
      if(!user) {
        return res.json({message: 'Usuario no encontrado'})
      }
      user.status = status;
      await user.save();
      res.json(user);
    } catch (error) {
      logger.error(error);
      return res.json({error});
    } 
}

  const remove = async (req, res) => {
    const { id } = req.params;
    try {
      const user = await User.findOne({
        where: { 
          id,
          status: Status.ACTIVE
        },
      });
      if(!user) {
        return res.json({message: 'Usuario no encontrado'})
      }
      user.status = Status.INACTIVE;
      await user.save();
      res.json({message: 'Usuario eliminado correctamente'})
    } catch (error) {
      logger.error(error);
      return res.json({error});
    }
  }

  const getTasks = async (req, res) => {
  const { id } = req.params;

  try {

    const user = await User.findOne({
      attributes: ['username'],
      include: [
        {
          model: Task,
          attributes: ['name', 'done'],
          where: { 
            done: false
          }
        },
      ],
      where: { id },
    });

    return res.json(user);

  } catch (error) {
    logger.error(error);
    return res.json({ error });
  }
};
    async function pagination(req, res) {

  try {

    const {
      page = 1,
      limit = 10,
      search = '',
      orderBy = 'id',
      orderDir = 'DESC'
    } = req.query;

    const offset = (page - 1) * limit;

    const whereCondition = {};

    if (search) {
      whereCondition.username = {
        [Op.iLike]: `%${search}%`
      };
    }

    const users = await User.findAndCountAll({
      attributes: ['id', 'username', 'status'],
      where: whereCondition,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[orderBy, orderDir]]
    });

    const pages = Math.ceil(users.count / limit);

    return res.json({
      Total: users.count,
      Paginacion: parseInt(page),
      Limiteregistro: pages,
      data: users.rows
    });

  } catch (error) {
    logger.error(error);
    return res.json({ error });
  }

}


export default {
  create, 
  get,
  find,
  update,
  remove,
  activateinactive,
  getTasks,
  pagination
}