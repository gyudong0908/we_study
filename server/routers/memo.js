const express = require('express');
const router = express.Router();
const models = require('../models');
router.use(express.json());

router.get('/memos', function (req, res) {
    const userId = req.session.passport.user;
    models.Memo.findAll({
        order:[
            ['createdAt', 'DESC']
        ],
        where: {
            userId: userId,
        },
    }).then((data) => {
        res.send(data);
    }).catch(err => {
        console.log(err);
        res.status(500).send('메모 조회 오류 발생');
    })
});

router.get('/memo', function (req, res) {
    const id = req.query.id;
    models.Memo.findAll({
        where: {
            id: id,
        },
    }).then((data) => {
        res.send(data);
    }).catch(err => {
        console.log(err);
        res.status(500).send('메모 조회 오류 발생');
    })
});

router.post('/memo', function (req, res) {
    const userId = req.session.passport.user;
    models.Memo.create({
        userId: userId,
        title: req.body.title,
        content: req.body.content,
    }).then(() => {
        res.status(200).send('잘됨');
    }).catch(err => {
        console.log(err);
    })
});

router.put('/memo', function (req, res) {
    const id = req.query.id;
    models.Memo.update(req.body, {
        where: { id: id }
    }).then(() => {
        res.status(200).send('잘됨');
    }).catch(err => {
        console.log(err);
    })
});

module.exports = router;