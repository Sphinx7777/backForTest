const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());



mongoose.connect('mongodb+srv://free:1q2w3e4r@cluster0-r6cob.mongodb.net/free',{
	useNewUrlParser: true
})
	.then(() => app.listen(3080, () => console.log('server has started ...')))
	.catch((err) => console.error(err));

const Product = mongoose.model('Product', {
	id: Number,
	name: String,
	price: Number
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

