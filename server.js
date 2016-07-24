const express = require('express');
const UpdateProducts = require(__dirname + '/util/UpdateProducts');

UpdateProducts();

express().use(express.static(__dirname + '/build')).listen(3000, () => console.log('PORT 3000'));