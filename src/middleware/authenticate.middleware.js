import jwt from 'jsonwebtoken';
import env from '../config/env.js';

export function middlewareToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Inicia la Sesion¡¡¡ :(' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: decoded.id };
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Debes iniciar sesión nuevamente' });
    }
    return res.status(403).json({ error: 'Token manipulado' });
  }
}