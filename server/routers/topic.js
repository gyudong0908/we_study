const express = require('express');
const router = express.Router();
const models = require('../models');

router.use(express.json());

router.post('/topic', function (req, res) {
    const classId = req.query.classId;
    models.Topic.create({
        classId: classId,
        name: req.body.name,
    }).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.status(500).send("Topic 생성 에러 발생");
    })
})

router.post('/topics', function (req, res) {
    const classId = req.query.classId;
    models.Topic.bulkCreate(req.body).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.status(500).send('Topic 생성 에러 발생');
    })
})

router.get('/topics', function (req, res) {
    const classId = req.query.classId;
    models.Topic.findAll({
        raw: true,
        where: {
            classId: classId
        },
    }).then(topic => {
        res.status(200).send(topic);
    }).catch(err => {
        console.log(err);
        res.status(500).send('Topic 조회 에러 발생');
    })
})

router.put('topic', function (req, res) {
    const topicId = req.query.topicId;
    models.update(req.body, { where: { id: topicId } }).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.status(500).send('Topic 변경 에러 발생');
    })
})

module.exports = router;