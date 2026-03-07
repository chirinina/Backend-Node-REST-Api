import { Router } from 'express';
import { validate } from '../validators/validate.js';  
import { createUserSchema } from '../validators/user.validate.js';
import userController from '../controllers/user.controller.js';
import { middlewareToken } from '../middleware/authenticate.middleware.js';

const router = Router();

router.route('/').get(middlewareToken, userController.get)
router.route('/:id').get(middlewareToken, userController.find)
router.route('/').post( validate(createUserSchema), userController.create)
router.route('/:id').put(middlewareToken, userController.update)
router.route('/activateinactive/:id').patch(middlewareToken, userController.activateinactive)
router.route('/:id').delete(middlewareToken, userController.remove)

router.get('/:id/task', middlewareToken, userController.getTasks)

router.get('/list/pagination', middlewareToken, userController.pagination)
export default router