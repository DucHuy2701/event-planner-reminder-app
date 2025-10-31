import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sequelize } from './models/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
    res.json({ message: 'Backend ES6+ + SQLite3 is running!' });
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('SQLite3 connected');
        await sequelize.sync({ alter: true });
        console.log('Database synced');
    } catch (err) {
        console.error('DB Error:', err);
    }
};

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});