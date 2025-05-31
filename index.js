const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./db');


dotenv.config();
connectDB();

const app = express();
app.use(express.json());
console.log(require('crypto').randomBytes(32).toString('hex'))
const authRoutes = require('./routes/auth');
const bookRoutes = require('./routes/book');
const reviewRoutes = require('./routes/review');


app.use('/api', authRoutes);
app.use('/api', bookRoutes);
app.use('/api', reviewRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));

