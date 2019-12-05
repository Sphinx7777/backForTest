const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./mongoDB/config');

const app = express();
const {mongoDbUrl,PORT} = config;

app.use(bodyParser.json());
app.use('/shop',require('./mongoDB/api'));

const Start = async () => {
	try {
		await mongoose.connect(mongoDbUrl, {
			useNewUrlParser: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});
		app.listen(PORT, () => console.log(`server has started on  ${PORT} port...`))
	}catch (err) {
		console.warn(`Some error start ${err.message}`)
	}
};

Start();