
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

exports.sign_up_post = [
    body("firstname", "You must provide a first name").trim().isLength({min: 2}).escape(),
    body("lastname", "You must provide a last name").trim().isLength({min: 2}).escape(),
    body("username", "You must provide a username").trim().isLength({min: 2}).escape(),
    body("password", "You must provide a password").trim().isLength({min: 2}).escape(),
    
    
    
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (errors) {
            console.log(errors)
            return res.redirect("/")
        }

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
                return res.redirect("/");
                }
            })
      })
    ]

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