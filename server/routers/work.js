const express = require('express');
const router = express.Router();
const models = require('../models');

router.use(express.json());

router.post('/work', function (req, res) {
    const curriculumId = req.query.curriculumId;
    models.Work.create({ ...req.body, curriculumId: curriculumId }).then((data) => {
        res.status(200).send(data.dataValues);
    }).catch(err => {
        console.log(err);
        res.status(500).send("Work 생성 에러 발생");
    })
})


router.get('/works', function (req, res) {
    const curriculumId = req.query.curriculumId;
    models.Work.findAll({
        raw: true,
        where: {
            curriculumId: curriculumId,
        }
    }).then(works => {
        res.status(200).send(works);
    }).catch(err => {
        console.log(err);
        res.status(500).send("Work 조회 오류 발생");
    })
})

router.get('/works/user',async function(req,res){
    const userId = req.session.passport.user;
    try {
        const userInstance = await models.User.findByPk(userId);
        const classesForUser = await userInstance.getClasses({
            raw:true,
            include:[
                {
                    model: models.Curriculum,
                    include:[{
                        model: models.Work
                    }]
                }
            ]
        });
        res.status(200).send(classesForUser);
    } catch (error) {
        res.status(500).send('과제 정보 조회 오류');
    }
})

router.get('/work',function(req,res){
    const workId = req.query.workId;
    models.Work.findByPk(workId).then((data)=>{
        res.status(200).send(data);
    }).catch(err=>{
        console.log(err);
        res.status(500).send('work 조회 에러');
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