var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const Member = require("../models/member");
const passport = require("../passport");



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('members_area', { title: 'MembersOnly Area', user: req.user });
});

router.get("/sign-up", (req, res) => res.render("sign_up_form"));

router.post("/sign-up", async (req, res, next) => {
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
  if (err) {
      return next(err);
  } else {
      const member = new Member({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          username: req.body.username,
          status: req.body.status,
          password: hashedPassword
      });
      const result = await member.save();
      res.redirect("/");
  }
  })
});

router.post(
  "/log-in",
  passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/"
  })
  );

  router.get("/log-out", (req, res, next) => {
  req.logout(function (err) {
      if (err) {
      return next(err);
      }
      res.redirect("/");
  });
  });

module.exports = router;
