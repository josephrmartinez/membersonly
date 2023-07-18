var express = require('express');
var router = express.Router();

const members_controller = require("../controllers/membersController")

/* GET users listing. */
router.get('/', members_controller.index)

router.get("/sign-up", members_controller.sign_up_get)

router.post("/sign-up", members_controller.sign_up_post)

router.post("/log-in", members_controller.log_in_post)

router.post("/log-out", members_controller.log_out_get)


module.exports = router;
