const express = require('express');
const router = express.Router();
const models = require('../models');

router.use(express.json());

router.post('/work', function (req, res) {
    const topicId = req.query.topicId;
    models.Work.create({ ...req.body, topicId: topicId }).then((data) => {
        res.status(200).send(data.dataValues);
    }).catch(err => {
        console.log(err);
        res.status(500).send("Work 생성 에러 발생");
    })
})


router.get('/works', function (req, res) {
    const topicId = req.query.topicId;
    models.Work.findAll({
        raw: true,
        where: {
            topicId: topicId,
        }
    }).then(works => {
        res.status(200).send(works);
    }).catch(err => {
        console.log(err);
        res.status(500).send("Work 조회 오류 발생");
    })
})

router.put('/work', function (req, res) {
    const workId = req.query.workId;
    models.Work.update(req.body, { where: { id: workId } }).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.status(500).send('Work 변경 오류 발생');
    })
})

router.delete('/work', function (req, res) {
    const workId = req.query.workId;
    models.Work.destroy({
        where: {
            id: workId
        }
    }).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.status(500).send(err);
    })
})
module.exports = router;