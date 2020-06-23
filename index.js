const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors')

// routes
const authRoute = require('./routes/auth');
const blogRoute = require('./routes/blog');


const app = express();

// cors
app.use(cors());

// Morgan log
app.use(morgan('tiny'));

dotenv.config();

// connect to db
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => console.log('connected to db')
);

// middleware
app.use(express.json());

// routes
app.use('/api/user', authRoute);
app.use('/api/blogs', blogRoute);
// app.use('/api/posts');


app.listen(5000, () => console.log('Server is running!'));