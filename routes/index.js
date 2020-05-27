var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('indexRouter', req.originalUrl);
  //res.render('index', { title: 'Express' + Date.now().toString() });
  res.redirect('/login.html');
});

module.exports = router;
