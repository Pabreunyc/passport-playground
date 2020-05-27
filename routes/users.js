const express = require('express');
const passport = require('passport');
const router = express.Router();

function isAuthenticated(req, res, next) {
  let runs = 1e9;
  console.log(req.session);
  console.time('noop');
  for(let i=0; i<runs; i++) {}
  console.timeEnd('noop');
  //console.log('isAuthenticated', req.user);
  //console.log('isAuthenticated', req.headers);
  //console.log('isAuthenticated', req.body);
  return next();
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send(req.body);
  //res.send('respond with a resource');
});

router.post('/authenticate', passport.authenticate('local'), function(req, res, next) {
  console.log('AUTH', req.body);
  return res.redirect('/loggedin.html');
  //res.send( {status:true, data:'Authenticated'} );
});

router.get('/list', isAuthenticated, function(req, res, next) {
  console.log('LIST', req.session);
  return res.redirect('/t.html')
  res.send( {id: Math.random(), username:'Frank', password:'castle'} );
})
module.exports = router;
