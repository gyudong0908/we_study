const express = require('express');
const router = express.Router();
const models = require('../models');

router.use(express.json());

router.post('/submit', function (req, res) {
    const workId = req.query.workId;
    const userId = req.session.passport.user;
    models.Submit.create({ ...req.body, workId: workId, userId: userId }).then((data) => {
        res.status(200).send(data.dataValues);
    }).catch(err => {
        console.log(err);
        res.status(500).send("submit 생성 에러 발생");
    })
})

router.get('/submits', function (req, res) {
    const workId = req.query.workId;
    models.Submit.findAll({
        raw: true,
        where: {
            workId: workId,
        }
    }).then((submits => {
        res.status(200).send(submits);
    })).catch(err => {
        console.log(err);
        res.status(500).send('submit 조회 에러 발생');
    })
})

router.put('/submit', function (req, res) {
    const submitId = req.query.submitId;
    models.update(req.body, { where: { id: submitId } }).then((data) => {
        res.status(200).send(data.dataValues);
    }).catch(err => {
        console.log(err);
        res.status(500).send('submit 변경 에러 발생');
    })
})

router.delete('/submit', function (req, res) {
    const submitId = req.query.submitId;
    models.Submit.destroy({
        where: {
            id: submitId
        }
    }).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.status(500).send('제출물 삭제 오류');
    })
})

module.exports = router;