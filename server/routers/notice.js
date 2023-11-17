const express = require('express');
const router = express.Router();
const models = require('../models');

router.use(express.json());

router.post('/notice', function (req, res) {
    const classId = req.query.classId;
    models.Notice.create({...req.body,classId:classId}).then((data) => {
        res.status(200).send(data.dataValues);
    }).catch(err => {
        console.log(err);
        res.status(500).send("curriculum 생성 에러 발생");
    })
})

router.get('/notices',function(req,res){
    const classId = req.query.classId;
    models.Notice.findAll({
        raw: true,
        where:{
            classId: classId,
        }
    }).then((notices=>{
        res.status(200).send(notices);
    })).catch(err=>{
        console.log(err);
        res.status(500).send('notice 조회 에러 발생');
    })
})

router.put('/notice',function(req,res){
    const noticeId = req.query.noticeId;
    models.update(req.body,{where:{id:noticeId}}).then(()=>{
        res.sendStatus(200);
    }).catch(err=>{
        console.log(err);
        res.status(500).send('notice 변경 에러 발생');
    })
})
router.delete('/notice',function(req,res){
    const noticeId = req.query.noticeId;
    models.Notice.destroy({
        where:{
            id: noticeId
        }
    }).then(()=>{
        res.sendStatus(200);
    }).catch(err=>{
        console.log(err);
        res.status(500).send('공지사항 삭제 에러 발생');
    })
})

module.exports = router;