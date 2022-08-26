const express = require('express');
const app = express();
const PORT = 8800;
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');

const User = require('./models/User');

const userRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/posts');

dotenv.config();

const whitelist = ['http://localhost:3000'];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

mongoose.connect(
  `mongodb+srv://Gurinder:Honeycomb123@cluster0.ntonyxy.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Connected to MongoDB');
  }
);
app.get('/', (req, res) => {
  res.json('Welcome to the homepage');
});

app.get('/users', (req, res) => {
  User.find((err, docs) => {
    if (!err) {
      res.json(docs);
    } else {
      console.log('Failed to retrieve the Course List: ' + err);
    }
  });
});
// test
// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);

app.listen(PORT, () => {
  console.log(`Backend server is running on PORT: ${PORT}.`);
});
