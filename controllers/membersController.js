
const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const passport = require("../passport");
const Member = require("../models/member")

exports.index = asyncHandler(async (req, res, next) => {
    res.render('members_area', { 
        title: 'MembersOnly Area', 
        user: req.user });
  });

exports.sign_up_get = asyncHandler(async (req, res, next) =>{
    res.render("sign_up_form");
})

exports.sign_up_post = asyncHandler(async (req, res, next) => {
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

exports.log_in_post = asyncHandler (async (req, res, next) =>{
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/"
    })
})

exports.log_out_get = asyncHandler (async (req, res, next) =>{
    req.logout(function (err) {
        if (err) {
        return next(err);
        }
        res.redirect("/");
    });
});