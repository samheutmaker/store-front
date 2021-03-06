const path = require('path');
const express = require('express');
const compression = require('compression');
const UpdateProducts = require(__dirname + '/util/UpdateProducts');
const app = express();


// UpdateProducts();

app.use(compression());

app.get(['/:nothing/bundle.js', '/bundle.js'], (req, res) => {
	res.sendFile(path.resolve(__dirname, 'build', 'bundle.js'));
});

app.get(['/', '/home', '/clothes', '/checkout', '/admin', '/account', '/about', '/product/:id', ], (request, response) => {
  response.sendFile(path.resolve(__dirname, 'build', 'index.html'))
});


app.use(express.static(__dirname + '/build'))
   .listen(3000, () => console.log('PORT 3000'));