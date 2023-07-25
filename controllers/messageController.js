const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
// const bcrypt = require("bcryptjs");
// const passport = require("../passport");
const Member = require("../models/member")
const Message = require("../models/message")

exports.index = asyncHandler(async (req, res, next) => {
    const allMessages = await Message.find({}, "title message timestamp author")
    .populate("author")
    .sort({timestamp: -1}).exec()
    
    res.json({allMessages: allMessages,
        user: req.user
    });
  });

//   res.render('index', { 
//     allMessages: allMessages,
//     user: req.user });
// });


// exports.sign_up_get = asyncHandler(async (req, res, next) =>{
//     res.render("sign_up_form");
// })

exports.message_post = [
    body("title", "You must provide a title").trim().isLength({min: 4}).escape(),
    body("message", "You must provide a message").trim().isLength({min: 8}),
    
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors)
            return res.redirect("/")
        }

        try {
            const message = new Message({
                title: req.body.title,
                message: req.body.message,
                timestamp: new Date(),
                author: req.user,
            });
            
            await message.save();
            return res.redirect('/')

        } catch (err) {
            return next(err);
        }
    })
];

exports.message_delete = asyncHandler(async (req, res, next) => {
    await Message.findByIdAndDelete(req.params.id)
    res.redirect("/")
})
