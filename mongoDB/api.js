const express = require('express');
const Product = require('./models/ProductModel');
const router = express.Router();


router.get(
	'/products',
	async (req, res) => {
		try {
			const product = await Product.find({});
			await res.setHeader("Access-Control-Allow-Origin", "*");
			res.json(product)
		} catch (err) {
			res.status(500).json(`some error ${err.message}`)
		}
	});

router.post(
	'/products',
	async (req, res) => {
		try {
			const createdProduct = await Product.create(req.body);
			await res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
			await res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
			await res.setHeader("Access-Control-Allow-Origin", "*");
			res.json(createdProduct)
		} catch (err) {
			res.status(500).json(`some error ${err.message}`)
		}
	});

router.put(
	'/products/:id',
	async (req, res) => {
		try {
			await Product.findOneAndUpdate({_id: req.params.id}, req.body);
			const updateProduct = await Product.findOne({_id: req.params.id});
			await res.setHeader("Access-Control-Allow-Origin", "*");
			res.json(updateProduct)
		} catch (err) {
			res.status(500).json(`some error ${err.message}`)
		}
	});

router.delete(
	'/products/:id',
	async (req, res) => {
		try {
			await Product.deleteOne({_id: req.params.id});
			await res.setHeader("Access-Control-Allow-Origin", "*");
			res.json({delete: true})
		} catch (err) {
			res.status(500).json(`some error ${err.message}`)
		}
	});

module.exports = router;