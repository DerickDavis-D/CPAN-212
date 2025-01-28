const express = require('express');
const router = express.Router();


// Route for /name
router.get('/name', (req, res) => {
    res.send('<h1>Derick Davis</h1>');
});

// Route for /greeting
router.get('/greeting', (req, res) => {
    res.send('<h1>Hello</h1><p>Derick Davis, Student Number: N01724195</p>');
});


  
// add route
router.get('/add', (req, res) => {
    const x = parseFloat(req.query.x);
    const y = parseFloat(req.query.y);
    const result = x + y;
    res.send(`The result is ${result}`);
  });

  router.get('/calculate', (req, res) => {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);
    const operation = req.query.operation;
  
    let result;
    switch (operation) {
      case '+':
        result = a + b;
        break;
      case '-':
        result = a - b;
        break;
      case '*':
        result = a * b;
        break;
      case '/':
        result = a / b;
        break;
      case '**':
        result = a ** b;
        break;
      default:
        result = 'Invalid operation';
    }
    res.send(`The result is ${result}`);
  });
  
  module.exports = router;
