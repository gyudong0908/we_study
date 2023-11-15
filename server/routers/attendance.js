const express = require('express');
const router = express.Router();
const models = require('../models');
const { Op } = require('sequelize');

router.post('/attendance',async function(req,res){
    const classId = req.query.classId;
    const userId = req.session.passport.user.id;

    // 오늘 출석을 했는지를 확인 하기 위한 변수
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendance = await models.attendance.findAll({
        where:{
            createdAt: {
                [Op.gte]: today,
                [Op.lt]: new Date(today.getTime() + 24 * 60 * 60 * 1000),
            },
            classId: classId,
            userId: userId,
        }
    });

    if(attendance.length == 0){
        models.attendance.create({
            classId: classId,
            userId: userId,
        }).then(()=>{
            res.status(200).send('잘 됨');
        })
    }else{
        res.status(200).send('이미 출석 함');
    }
})


module.exports = router;