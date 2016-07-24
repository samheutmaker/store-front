const path = require('path');
const express = require('express');
const UpdateProducts = require(__dirname + '/util/UpdateProducts');
const app = express();

// UpdateProducts();

app.get(['/', '/home', '/clothes', '/checkout', '/admin', '/account', '/about', '/product/:id'], function (request, response){
  response.sendFile(path.resolve(__dirname, 'build', 'index.html'))
});


app.use(express.static(__dirname + '/build'))
   .listen(3000, () => console.log('PORT 3000'));