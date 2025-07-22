import express from 'express';
import * as taskController from '../controllers/task.controller';

const router = express.Router();

router.post('/', taskController.createTask);
router.get('/', taskController.getAllTasks);
router.get('/search', taskController.searchTasks);
router.get('/:id', taskController.getTaskById);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export default router;
