const mongoose = require('mongoose');

// Definição da Schema do artigo
const wikiSchema = mongoose.Schema({
	title: {type: String, required: true},
	content: {type: String, required: true},
});


module.exports = mongoose.model('Article', wikiSchema);