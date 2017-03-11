const express = require('express');
const bodyParser = require('body-parser');
const sessionTurn = require('express-session');
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

app.use(bodyParser.json())
app.use(sessionTurn({
  secret: 'aefafojaefojfoij88oj',
  saveUnitialized: true,
  resave: true
}));

app.post('/cart', (req, res, next) => {
  if(!req.session.cart){
    req.session.cart = []
  }
  req.session.cart.push(req.body);
  next();
}, logger, function(req, res, next){
  res.status(200).send({"cart": req.session.cart});
});

app.get('/cart', (req, res, next) => {
  res.status(200).send(req.session.cart);
});
