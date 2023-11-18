const express = require('express');
const router = express.Router();
const axios = require('axios');
const models = require('../models');
const submit = require('../models/submit');
router.use(express.json());

router.post('/class', function (req, res) {
    const userId = req.session.passport.user;

    models.Class.create({ ...req.body, teacher: userId }).then((data) => {
        data.addUser(userId);
        models.Topic.create({
            classId: data.dataValues.id,
            name: '기타'
        }).then(() => {
            res.status(200).send(data.dataValues)
        }).catch(err => {
            console.log(err);
            res.status(500).send('기타 Topic 생성 오류');
        })
    }).catch(err => {
        console.log(err);
        res.status(500).send("Class 생성 오류");
    })
});

router.get('/classes', function (req, res) {
    const userId = req.session.passport.user;

    models.User.findByPk(userId, {
        include: [
            {
                model: models.Class,
                through: 'classUser',
            }
        ]
    }).then(user => {
        const classData = user.Classes.map(data => data.dataValues);
        res.status(200).send(classData);
    }).catch(err => {
        console.log(err);
        res.status(500).send('Class 조회 에러 발생');
    })
})

router.get('/class', function (req, res) {
    const classId = req.query.classId;
    models.Class.findByPk(classId, { raw: true }).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        console.log(err);
        res.status(500).send("클래스 조회 에러 발생");
    })
})

router.get('/class/submits', function (req, res) {
    const classId = req.query.classId;
    models.Class.findByPk(classId, {
        raw: true,
        include: [{
            model: models.Topic,
            include: [{
                model: models.Work,
                include: [{
                    model: models.Submit,
                }]
            }]
        }]
    }).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        console.log(err);
        res.status(500).send("클래스 조회 에러 발생");
    })
})

router.get('/class/user', function (req, res) {
    const classId = req.query.classId;
    models.Class.findByPk(classId, {
        include: [
            {
                model: models.User,
                through: 'classUser',
            }
        ]
    }).then((classData) => {
        const userData = classData.Users.map(data => data.dataValues);
        res.status(200).send({ userData, teacherId: classData.dataValues.teacher });
    }).catch(err => {
        console.log(err);
        res.status(500).send('Class 유저 조회 에러 발생');
    })
})

router.post('/class/join', function (req, res) {
    const code = req.query.code;
    const userId = req.session.passport.user;

    models.Class.findOne({ where: { code: code } }).then(data => {
        data.addUser(userId);
        res.status(200).send(data.dataValues);
    }).catch(err => {
        console.log(err);
        res.status(500).send('클래스 초대 오류');
    })
});

router.put('/class', function (req, res) {
    const classId = req.query.classId;

    models.Class.update(req.body, { where: { id: classId } }).then((data) => {
        res.status(200).send(data.dataValues);
    }).catch(err => {
        console.log(err);
        res.status(500).send("클래스 변경 오류");
    })
})
router.delete('class', function (req, res) {
    const classId = req.query.classId;
    models.Class.destory({
        where: {
            id: classId
        }
    }).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.status(500).send('Class 삭제 오류 발생');
    })
})

module.exports = router;