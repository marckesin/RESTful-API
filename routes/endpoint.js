const express = require('express');
const router = express.Router();
const Article = require('../models/wiki.model');

// Retorna um artigo específico -> localhost:3000/articles/ABC
router.get('/:endpoint', async (req, res) => {
	const search = req.params.endpoint;

	await Article.findOne({ title: search }, (err, article) => {
		if(!err && article){
			res.send(article);
		} else {
			res.status(404).end();
		}
	});
});

// Atualiza um artigo específico (todo o conteúdo será atualizado) -> localhost:3000/articles/ABC
router.put('/:endpoint', async (req, res) => {
	const search = req.params.endpoint;
	const title = req.body.title;
	const content = req.body.content;

	await Article.findOneAndUpdate({title: search}, {
		title: title, 
		content: content
	}, (err, result) => {
		if(!err && result){
			// res.status(200).end();
			res.send(result);
			console.log(result);
		} else {
			console.log(err);
		}
	});
});

// Atualiza um artigo específico (apenas os campos passados serão atualizados) -> localhost:3000/articles/ABC
router.patch('/:endpoint', async (req, res) => {
	const search = req.params.endpoint;

	await Article.updateOne({ title: search }, { 
		$set: req.body 
	}, (err, result) => {
		if(!err && result){
			// res.status(200).end();
			res.send(result);
			console.log(result);
		} else {
			console.log(err);
		}
	});
});

// Deleta um artigo específico -> localhost:3000/articles/ABC
router.delete('/:endpoint', async (req, res) => {
	const search = req.params.endpoint;

	await Article.deleteOne({ title: search }, (err, result) => {
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