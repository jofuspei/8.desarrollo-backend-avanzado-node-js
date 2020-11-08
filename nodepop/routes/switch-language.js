var express = require('express');
var router = express.Router();

/* GET /switch-language/:locale */
router.get('/:locale', function(req, res, next) {
  const locale = req.params.locale;

  const back = req.get('referer');

  res.cookie('nodepop-locale', locale, { maxAge: 1000 * 60 * 60 * 24 * 20 });

  res.redirect(back);
});

module.exports = router;
