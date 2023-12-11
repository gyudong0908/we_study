const express = require('express');
const router = express.Router();
const models = require('../models');
const sequelize = require('sequelize');

router.use(express.json());

router.post('/curriculum', function (req, res) {
    const classId = req.query.classId;
    models.Curriculum.create({ ...req.body, classId: classId }).then((data) => {
        res.status(200).send(data.dataValues);
    }).catch(err => {
        console.log(err);
        res.status(500).send("curriculum 생성 에러 발생");
    })
})

router.get('/curriculums', function (req, res) {
    const classId = req.query.classId;
    models.Curriculum.findAll({
        raw: true,
        where: {
            classId: classId,
        },
        order: [[[sequelize.literal("Curriculum.title = '기타'"), 'ASC']]]
    }).then((curriculums => {
        res.status(200).send(curriculums);
    })).catch(err => {
        console.log(err);
        res.status(500).send('curriculum 조회 에러 발생');
    })
})
router.get('/curriculums/work', function (req, res) {
    const classId = req.query.classId;
    models.Curriculum.findAll({
        where: {
            classId: classId
        },
        include: [{
            model: models.Work
        }],
        order: [[[sequelize.literal("Curriculum.title = '기타'"), 'ASC']]]
    }).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        console.log(err);
        res.status(500).send('work 목록 조회 에러');
    })
})
router.put('/curriculum', function (req, res) {
    const curriculumId = req.query.curriculumId;
    models.Curriculum.update(req.body, { where: { id: curriculumId } }).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.status(500).send('curriculum 변경 에러 발생');
    })
})
router.delete('/curriculum', function (req, res) {
    const curriculumId = req.query.curriculumId;
    models.Curriculum.destroy({
        where: {
            id: curriculumId
        }
    }).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.status(500).send('커리큘럼 삭제 오류 발생');
    })
})

module.exports = router;