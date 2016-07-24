const webpack = require('webpack');
const fs = require('fs');

const filePathFromRoot = '/products/';
const finalFilePath = __dirname + '/..' + filePathFromRoot;

module.exports = exports = function() {

	let files = fs.readdirSync(finalFilePath, {}, 'utf8');
	let productsArray = [];
	files.forEach( file => {
		if(file.substring(file.length - 5, file.length) == '.json')
		productsArray.push(JSON.parse(fs.readFileSync(finalFilePath + file)));
	});

	let finalProductsString = JSON.stringify(productsArray);

	var products = {
		PRODUCTS: finalProductsString
	};

	return new webpack.DefinePlugin(products);
};


