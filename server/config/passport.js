var passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const dotenv = require('dotenv').config();
const models = require('../models');
passport.use(new GoogleStrategy({
    clientID: process.env.googleClientId,
    clientSecret: process.env.googleClientSecret,
    callbackURL: "http://localhost:8081/auth/google/callback",
    passReqToCallback   : true
  },
  function(request, accessToken, refreshToken, profile, done) {    
    const user = {
      accessToken : accessToken,
      id : profile.id,
      nickName : profile.displayName
    }
    done(null,user);
  }
));

passport.serializeUser(function(user,done){ 
    models.user.findOne({
        where : {
            id : user.id
        }
    }).then(data=>{
        if(data === null){
            models.user.create({
                id : user.id,
                nickName : user.nickName
            })
        }
    })
	done(null, user); //deserializeUser를 호출
})

// 세션 유지
passport.deserializeUser(function(user,done){
    done(null,user);
})

module.exports = passport;