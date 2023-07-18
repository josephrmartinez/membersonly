
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const Member = require("./models/member");


passport.use(
    // LocalStrategy is the common username-password strategy for auth
    new LocalStrategy(async(username, password, done) => {
      try {
        const member = await Member.findOne({ username: username });
        if (!member) {
          return done(null, false, { message: "Incorrect username" });
        };
        bcrypt.compare(password, member.password, (err, res)=> {
            if (res){
                // passwords match, log user in
                return done(null, member)
            } else {
                // passwords to not match
                return done(null, false, {message: "Incorrrect Password"})
            }
        })
      } catch(err) {
        return done(err);
      };
    })
  );

  passport.serializeUser(function(member, done) {
    done(null, member.id);
  });
  
  passport.deserializeUser(async function(id, done) {
    try {
      const member = await Member.findById(id);
      done(null, member);
    } catch(err) {
      done(err);
    };
  });

module.exports = passport;
