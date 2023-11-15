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

router.get('/user', function (req, res) {
	const id = req.session.passport.user;
	models.User.findOne({
		raw: true,
		where: {
			id: id
		}
	}).then(data => {
		const userData = {
			id: data.id,
			nickName: data.nickName,
			email: data.email
		}
		res.send(userData);
	}).catch(err => {
		res.status(500).send("user 조회 오류");
		console.log(err)
	})
})

module.exports = router;