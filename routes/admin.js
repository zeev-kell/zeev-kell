/**
 * Created by zeev on 2016/10/12 0012.
 */
var express     = require('express');
var router      = express.Router(),
	debug       = require('debug')("zeev:admin"),
	postCtrl    = require('../controller/post'),
	commentCtrl = require("../controller/comment");

/* GET users listing. */
router.get('/', function (req, res, next) {
	res.render('admin', { title: 'zeev admin', layout: false });
});

router.put('/comment/:id', commentCtrl.auditingComment);

module.exports = router;
