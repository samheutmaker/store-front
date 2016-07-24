const fs = require('fs');

const PRODUCTS_PATH = __dirname + '/../products/';
const superagentPromisePlugin = require('superagent-promise-plugin');
const request = superagentPromisePlugin.patch(require('superagent'));

module.exports = exports = () => {
  return new Promise((resolve, reject) => {
    request.get('http://localhost:8080/products')
      .then(function(res) {
        if (res.body && res.body.length) {
          res.body.forEach((product, productIndex) => {
            createProductFile(product).then(() => {
              resolve(res.body);
            })
          });
        }
      })
      .catch(function(err) {
        console.log(err);
        reject(err);
      });
  });
}

function createProductFile(product) {
  return new Promise((resolve, reject) => {
    var fileLocation = PRODUCTS_PATH + product.name.split(' ')
      .reduce((current, next) => {
        return (current && current.length) ? current + '-' + next.toLowerCase() : next.toLowerCase();
      }, '') + '.json';

    fs.writeFile(fileLocation, JSON.stringify(product), {}, (err) => {
      resolve();
    });
  });
}