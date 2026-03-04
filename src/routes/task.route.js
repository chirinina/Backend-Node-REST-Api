import { Router } from 'express';
import { validate } from '../validators/validate.js';  
import { createtaskSchema } from '../validators/task.validate.js';
import taskController from '../controllers/task.controller.js';
import { middlewareToken } from '../middleware/authenticate.middleware.js';

const router = Router();

router.route('/')
  .get(middlewareToken, taskController.get)
  .post(middlewareToken, validate(createtaskSchema), taskController.create);

router.route('/:id')
  .get(middlewareToken, taskController.find)
  .put(middlewareToken, taskController.update)
  .delete(middlewareToken, taskController.remove);

router.route('/done/:id')
  .patch(middlewareToken, taskController.done);

export default router;