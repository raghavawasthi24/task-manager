import { Request, Response } from 'express';
import { db } from '../config/db';
import { v4 as uuidv4 } from 'uuid';
import { taskSchema } from '../utils/taskSchema.util';

/**
 * @route POST /tasks
 * @param {object} req.body - Task payload
 * @returns {object} 201 - Created task object
 */
export const createTask = async (req: Request, res: Response) => {
  try {
    const parsed = taskSchema.parse(req.body);
    const id = uuidv4();

    await db.execute(
      'INSERT INTO tasks (id, title, description, status) VALUES (?, ?, ?, ?)',
      [id, parsed.title, parsed.description || '', parsed.status]
    );

    res.status(201).json({ id, ...parsed });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

/**
 * @route GET /tasks
 * @param {object} req.query - Query parameters
 * @returns {object} 200 - Array of tasks
 */
export const getAllTasks = async (req: Request, res: Response) => {
  const { limit = 10, offset = 0, sort = "ASC" } = req.query;
  const [rows] = await db.execute(`SELECT * FROM tasks ORDER BY createdAt ${sort} LIMIT ${limit} OFFSET ${offset}`);
  res.status(200).json(rows);
};

/**
 * @route GET /tasks/:id
 * @param {object} req.params.id - Task ID
 * @returns {object} 200 - Task object
 */
export const getTaskById = async (req: Request, res: Response) => {
  const [rows] = await db.execute('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
  const task = (rows as any[])[0];
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.status(200).json(task);
};

/**
 * @route PUT /tasks/:id
 * @param {object} req.body - Task payload
 * @returns {object} 200 - Updated task object
 */
export const updateTask = async (req: Request, res: Response) => {
  const parsed = taskSchema.partial().parse(req.body);
  await db.execute(
    `UPDATE tasks SET title = ?, description = ?, status = ?, updatedAt = NOW() WHERE id = ?`,
    [parsed.title, parsed.description, parsed.status, req.params.id]
  );
  res.status(200).json({ message: 'Task updated' });
};

/**
 * @route DELETE /tasks/:id
 * @param {object} req.params.id - Task ID
 * @returns {object} 200 - Deleted task object
 */
export const deleteTask = async (req: Request, res: Response) => {
  await db.execute('DELETE FROM tasks WHERE id = ?', [req.params.id]);
  res.status(200).json({ message: 'Task deleted' });
};

/**
 * @route GET /tasks/search
 * @param {object} req.query.search - Search query
 * @returns {object} 200 - Array of tasks
 */
export const searchTasks = async (req: Request, res: Response) => {
  const { title } = req.query;
  const [rows] = await db.execute('SELECT * FROM tasks WHERE title LIKE ?', [`%${title}%`]);
  res.status(200).json(rows);
};
