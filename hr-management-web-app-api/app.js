const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const routes = require('./routes/routes');
const helmet = require('helmet');
const compression = require('compression');
require('dotenv').config();

const MONGODB_URL = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-mzunh.mongodb.net/${process.env.MONGO_DATABASE_NAME}?retryWrites=true&w=majority`;
const app = express();

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
		res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
		next();
});

app.use('/', routes);
app.use('/auth', authRoutes);

app.use((error, req, res, next) => {
	const status = error.statusCode || 500;
	const message = error.message;
	const data = error.data;
	res.status(status).json({
		message: message,
		data: data
	});
})

const port = process.env.PORT || '8000';

mongoose
	.connect(MONGODB_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
	.then(result => {
		app.listen(port);
	})
	.catch(err => console.log(err));