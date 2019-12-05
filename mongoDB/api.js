const express = require('express');
const Product = require('./models/ProductModel');
const router = express.Router();

router.get(
	'/products',
	async (req, res) => {
		try {
			const product = await Product.find({});
			res.status(200).json(product)
		}catch (err) {
			res.status(500).json(`some error ${err.message}`)
		}
	});

router.post(
	'/products',
	async (req, res) => {
		try {
			const createdProduct = await Product.create(req.body);
			res.status(200).json(createdProduct)
		}catch (err) {
			res.status(500).json(`some error ${err.message}`)
		}
	});

router.put(
	'/products/:id',
	async (req, res) => {
		try {
			await Product.findOneAndUpdate({_id: req.params.id}, req.body);
			const updateProduct = await Product.findOne({_id: req.params.id});
			res.status(200).json(updateProduct)
		}catch (err) {
			res.status(500).json(`some error ${err.message}`)
		}
	});

router.delete(
	'/products/:id',
	async (req, res) => {
		try {
			await Product.deleteOne({_id: req.params.id});
		res.status(200).json({delete: true})
		}catch (err) {
			res.status(500).json(`some error ${err.message}`)
		}
	});

module.exports = router;