const express = require('express');
const router = express.Router();
const models = require('../models');

router.use(express.json());

router.post('/curriculum', function (req, res) {
    const classId = req.query.classId;
    models.Curriculum.create({...req.body,classId:classId}).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.status(500).send("curriculum 생성 에러 발생");
    })
})

router.get('/curriculums',function(req,res){
    const classId = req.query.classId;
    models.Curriculum.findAll({
        raw: true,
        where:{
            classId: classId,
        }
    }).then((curriculums=>{
        res.status(200).send(curriculums);
    })).catch(err=>{
        console.log(err);
        res.status(500).send('curriculum 조회 에러 발생');
    })
})

router.put('/curriculum',function(req,res){
    const curriculumId = req.query.curriculumId;
    models.update(req.body,{where:{id:curriculumId}}).then(()=>{
        res.sendStatus(200);
    }).catch(err=>{
        console.log(err);
        res.status(500).send('curriculum 변경 에러 발생');
    })
})

module.exports = router;