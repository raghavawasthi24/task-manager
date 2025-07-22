import express from 'express';
import taskRoutes from './routes/task.route';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Hello World');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
