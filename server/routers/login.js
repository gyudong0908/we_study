const router = require('express').Router();
const passport = require('../config/passport.js');

router.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile','https://www.googleapis.com/auth/classroom.courses',
	  'https://www.googleapis.com/auth/classroom.rosters',
	  'https://www.googleapis.com/auth/classroom.coursework.students'
	] }
));

router.get("/logout", async (req, res, next) => {
	req.logout((err) => {
		req.session.destroy();
		if (err) {
			// res.redirect(process.env.frontAddress);
			res.status(500).send('error 발생');
		} else {
			res.redirect(process.env.frontAddress);
		}
	});
});

router.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: process.env.frontAddress+'/mypage',
        failureRedirect: process.env.frontAddress
}),function(req,res){
});

router.get('/user',function(req,res){
	const id = req.session.passport.user.id;
	const nickName = req.session.passport.user.nickName;
	res.send({id:id,nickName:nickName});
})

module.exports = router;