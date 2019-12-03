const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./mongoDB/config');

const app = express();
app.use(bodyParser.json());


mongoose.connect(config.mongoUrl,{
	useNewUrlParser: true,
	useFindAndModify: false,
	useUnifiedTopology: true
})
	.then(() => app.listen(config.PORT, () => console.log(`server has started on  ${config.PORT} port...`)))
	.catch((err) => console.error(err));

const Product = mongoose.model('Product', {
	id: Number,
	name: String,
	age: Number
});

app.get(
	'/products', (req, res) => Product.find()
		.exec()
		.then(products => res.json(products))
);

app.post(
	'/products', (req, res) => {
	Product.create(req.body)
		.then(createdProduct => res.json(createdProduct));
});

app.put(
	'/products/:id',(req,res)=>{
	Product.findOneAndUpdate({id: req.params.id},req.body)
		.exec()
		.then(updateProduct => res.json(updateProduct))
});

app.delete(
	'/products/:id',(req,res)=>{
	Product.deleteOne({id: req.params.id})
		.exec()
		.then(() => res.json({delete: true}))
});

