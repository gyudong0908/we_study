const express = require('express');
const router = express.Router();
const models = require('../models');

router.use(express.json());

router.post('/topic', function (req, res) {
    const classId = req.query.classId;
    models.Topic.create({
        classId: classId,
        name: req.body.name,
    }).then((data) => {
        res.status(200).send(data.dataValues);
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

router.get('/topic/work',function(req,res){
    const classId = req.query.classId;
    models.Topic.findAll({
        where:{
            classId: classId
        },
        include: [{
            model: models.Work,
          }]
    }).then((data)=>{
        res.status(200).send(data);
    }).catch(err=>{
        console.log(err);
        res.status(500).send('공지사항 삭제 에러 발생');
    })
})

router.put('/topic', function (req, res) {
    const topicId = req.query.topicId;
    models.update(req.body, { where: { id: topicId } }).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.status(500).send('Topic 변경 에러 발생');
    })
})
router.delete('/topic',function(req,res){
    const topicId = req.query.topicId;
    models.Topic.destroy({
        where:{
            id: topicId
        }
    }).then(()=>{
        res.sendStatus(200);
    }).catch(err=>{
        console.log(err);
        res.status(500).send('Topic 삭제 오류 발생');
    })
})

module.exports = router;