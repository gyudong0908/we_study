const express = require('express');
const router = express.Router();
const models = require('../models');
router.use(express.json());

router.get('/user', function (req, res) {
    const userId = req.session.passport.user;
    models.User.findOne({
        raw: true,
        where: {
            id: userId
        }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send("user 조회 오류");
        console.log(err)
    })
})

router.put('/user', function (req, res) {
    const userId = req.session.passport.user;
    models.User.update(req.body, {
        raw: true
    }).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        console.log(err);
        res.status(500).send('유정 정보 변경 에러');
    })
})

module.exports = router;