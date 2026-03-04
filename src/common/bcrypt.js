import bcrypt from 'bcrypt';
import env from '../config/env.js';
import logger from '../logs/logger.js';

export const enbcryptar = async (text) => {
  try {
    const saltRounds = Number(env.bcrypt_salt_rounds) || 10;

    if (isNaN(saltRounds)) {
      throw new Error('Salt rounds inválido');
    }

    return await bcrypt.hash(text, saltRounds);
  } catch (error) {
    logger.error(error);
    throw new Error("Error al encriptar el texto");
  }
};

export const comparar = async (text, hash) => {
  try {
    return await bcrypt.compare(text, hash);
  } catch (error) {
    throw new Error("Error al comparar el texto con el hash");
  }
};