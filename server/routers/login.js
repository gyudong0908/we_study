const router = require('express').Router();
const passport = require('../config/passport.js');
const models = require('../models');

router.get('/auth/google',
	passport.authenticate('google', {
		scope:
			['email', 'profile']
	}
	));

router.get("/logout", async (req, res, next) => {
	req.logout((err) => {
		req.session.destroy();
		if (err) {
			res.status(500).send('error 발생');
		} else {
			res.redirect(process.env.frontAddress);
		}
	});
});

router.get('/auth/google/callback',
	passport.authenticate('google', {
		successRedirect: process.env.frontAddress + '/mypage',
		failureRedirect: process.env.frontAddress
	}), function (req, res) {
	});

module.exports = router;