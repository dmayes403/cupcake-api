const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const port = 3000;

const app = express();

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

const logger = function(req, res, next){
  console.log(`\n\n----------------------------\n-------------------------------\n\n`);
  console.log(`\n___HEADERS___\n`, req.headers);
  console.log(`\n___BODY___\n`, req.body);
  console.log(`\n___SESSION___\n`, req.session);
  next();
};

const cart = []

app.use(bodyParser.json())
app.use(session({
  secret: 'aefafojaefojfoij88oj',
  saveUnitialized: true,
  resave: true
}));

app.post('/cart', (req, res, next) => {
  if(!req.session){
    req.session.cart = []
  }
  req.session.cart.push(req)
})
