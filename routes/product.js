/**
 * Created by zeev on 2016/11/11 0011.
 */

var router = require("express").Router();


/* product page. */
router.get('/', function (req, res, next) {
	res.render('product', { title: '作品 - 柯子源的个人网站' });
});

router.get("/chat", function (req, res, next) {
	res.render("product/chat", { title: "聊天系统" })
})

module.exports = router;
