import { Task } from '../models/task.js';
import  logger from '../logs/logger.js';

async function create(req, res) {
    const { name } = req.body;
    if (!req.user || !req.user.userId) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    const { userId } = req.user;

    if (!name) return res.status(400).json({ message: 'No existe la tarea' });

    try {
        const newTask = await Task.create({
            name,
            userId,
            done: false,
        });
        return res.json(newTask);
    } catch (error) {
        logger.error(error);
        return res.json(error.message);
    }
}

async function get(req, res) {
    const { userId } = req.user;
    try {
        const tasks = await Task.findAll({
            where: { userId },
        });
        return res.json(tasks);
    } catch (error) {
        logger.error(error);
        return res.json(error.message);
    }
}

async function find(req, res) {
    const { id } = req.params;
    const { userId } = req.user;
    try {
        const task = await Task.findOne({
            where: { id, userId },
        });
        if (!task) return res.status(404).json({ message: 'Tarea no encontrada o no pertenece al usuario' });
        return res.json(task);
    }   catch (error) {
        logger.error(error);
        return res.json(error.message);
    }
}

async function update(req, res) {
    const { id } = req.params;
    const { name, done } = req.body;
    const { userId } = req.user;
    try {
        const task = await Task.findOne({
            where: { id, userId },
        });
        if (!task) return res.status(404).json({ message: 'Tarea no encontrada o no pertenece al usuario' });
        task.name = name || task.name;
        task.done = done !== undefined ? done : task.done;
        await task.save();
        return res.json(task);
    } catch (error) {
        logger.error(error);
        return res.json(error.message);
    }
}

async function remove(req, res) {
    const { id } = req.params;
    const { userId } = req.user;
    try {
        const task = await Task.findOne({
            where: { id, userId },
        });
        if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
        await task.destroy();
        return res.json({ message: 'Tarea eliminada' });
    } catch (error) {
        logger.error(error);
        return res.json(error.message);
    }
}

async function done(req, res) {
    const { id } = req.params;
    const { userId } = req.user;
    try {
        const task = await Task.findOne({
            where: { id, userId },
        });
        if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
        task.done = Status.DONE;
        await task.save();
        return res.json(task);
    } catch (error) {
        logger.error(error);
        return res.json(error.message);
    }
}

export default {
  create, 
  get,
  find,
  update,
  remove,
  done
}
