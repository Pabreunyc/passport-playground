const passport = require('passport');
const Strategy = require('passport-local').Strategy;
console.log('-----> passport-config -=- passport-config <-----');

const userList = [
  {id:100, username:'sue', password:'storm', auth:100, lastDate:null},
  {id:200, username:'sam', password:'seder', auth:100, lastDate:null},
  {id:300, username:'reed', password:'richards', auth:200, lastDate:null}
];

function initialize(passport) {
  console.log('-> passport.initialization');

}

passport.use(new Strategy(
  function(username, password, cb) {
    console.log('**********************************');
    username = username.toLowerCase();
    password = password.toLowerCase();

    console.log(`-> passport.use: "${username}", "${password}"`);
    //return cb('Passport Auth Error');
    let u = userList.find( u => {
      return u.username.toLowerCase() == username && u.password == password;
    });
    console.log('-> passport.use:'); console.dir(u);
    // no user
    if(!u) return cb(null, false);
    return cb(null, u);

    //return cb(null, {username:username, password:password} );
  }
));

passport.serializeUser( (user, cb) => {
  console.log('-> passport.serializeUser', user);
  cb(null, user.id);
});
passport.deserializeUser( (data, cb) => {
  console.log('-> passport.deserializeUser', data);
  cb(null, user);
});
