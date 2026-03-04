import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import  logger from '../logs/logger.js';

async function login(req, res) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      where: { username }
    });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
    res.json({ token });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ error: error.message });
  }
}
 export default { login };