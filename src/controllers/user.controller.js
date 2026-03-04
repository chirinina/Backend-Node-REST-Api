import { User } from '../models/user.js';
import { Task } from '../models/task.js';
import { Status} from '../constans/index.js';
import  logger from '../logs/logger.js';
import { enbcryptar } from '../common/bcrypt.js';

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
    
export default {
  create, 
  get,
  find,
  update,
  remove,
  activateinactive

}