/**
 * Created by zeev on 2016/11/11 0011.
 */

var router = require("express").Router();


/* product page. */
router.get('/', function(req, res, next) {
    res.render('product/index', { title: '' ,list:[1,2,3,4,5,6,7,8,9]});
});

router.get("/chat", function(req, res, next) {
    res.render("product/chat", { title: "聊天系统" })
})

module.exports = router;