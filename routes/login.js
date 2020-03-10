var express = require('express');
var router = express.Router();

router.get('/', async function(req, res, next) {

  res.render('template', { 
    locals:{
      title: 'Login',
    },
      partials:{
        partial: 'login-partial'
      }});
});

module.exports = router;
