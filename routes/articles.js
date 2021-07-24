const express = require('express');
const router = express.Router();
const Article = require('../models/wiki.model');

// Retorna todos os artigos -> localhost:3000/articles
router.get('/', async (req, res) => {
	await Article.find({}, (err, articles) => {
		if(!err && articles){
			// res.status(200).end();
			res.send(articles);
			console.log(articles);
		} else {
			res.status(404);
		}
	});
});

// Cria um novo artigo
router.post('/', async (req, res) => {
	const article = new Article({
		title: req.body.title, 
		content: req.body.content
	});

	await article.validate((err) => {
		if(!err){
			article.save((err) => {
				if(!err){
					// res.status(200).end();
					res.send(article);
					console.log(article);
				} else{
					console.log(err);
				}
			});
		} else {
			res.send('O artigo precisa de um título e conteúdo!')
		}
	});
});

// Deleta todos os artigos -> localhost:3000/articles
router.delete('/', async (req, res) => {
	await Article.deleteMany({}, (err, result) => {
		if(!err && result){
			// res.status(200).end();
			res.send(result);
			console.log(result);
		} else{
			console.log(err);
		}
	});
});


module.exports = router;