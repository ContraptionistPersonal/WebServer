var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
console.log(__dirname);
  res.render('index', { linkName: 'Signup Page',signuplink:"signup",partnerlink:"partnerlogin",partnertitle:"Partner Portal",stylesheetPath:"./stylesheets/style.css"});
});

module.exports = router;
