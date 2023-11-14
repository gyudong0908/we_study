const express = require('express');
const router = express.Router();
const models = require('../models');
const axios = require('axios');

router.use(express.json());

router.get('/works',function(req,res){    
    const Authorization = "Bearer " + req.session.passport.user.accessToken;
    const courseId = req.query.courseId;
    axios.get(`https://classroom.googleapis.com/v1/courses/${courseId}/courseWork`,{
        headers:{
            'Authorization':Authorization,
            'Accept' : 'application/json',
        }
    }).then((works)=>{       
        models.work.findAll({
            attributes:['id'],
            raw:true,
            where:{
                classId: courseId
            }
        }).then(data=>{
            // 우리 DB의 정보를 확인하여 맞는 정보만 가져오는 코드
            const filterWorks = works.data.courseWork.filter(work=>{return data.some(userWork=>userWork.id === work.id)});
            res.send(filterWorks);
        })
    }).catch((err)=>{
        console.log(err.message);
    })
});

module.exports = router;