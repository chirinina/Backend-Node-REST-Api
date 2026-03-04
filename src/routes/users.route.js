import { Router } from 'express';
import create from '../controllers/user.controller.js';
import { validate } from '../validators/validate.js';  
import { createUserSchema } from '../validators/user.validate.js';
import userController from '../controllers/user.controller.js';

const router = Router();

router.route('/').get(userController.get)
router.route('/:id').get(userController.find)
router.route('/').post( validate(createUserSchema), userController.create)
router.route('/:id').put(userController.update)
router.route('/activateinactive/:id').patch(userController.activateinactive)
router.route('/:id').delete(userController.remove)
export default router