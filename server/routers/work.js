const express = require('express');
const router = express.Router();
const models = require('../models');
const axios = require('axios');

router.use(express.json());

router.get('/works',function(req,res){    
    const Authorization = "Bearer " + req.session.passport.user.accessToken;
    const courseId = req.query.classId;
    const category = req.query.category;
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
                classId: courseId,        
                category: category,        
            }
        }).then(data=>{
            // 우리 DB의 정보를 확인하여 맞는 정보만 가져오는 코드
            const filterWorks = works.data.courseWork.filter(work=>{return data.some(userWork=>userWork.id === work.id)});
            res.send(filterWorks);
        })
    }).catch((err)=>{
        res.status(500).send(err);
    })
});

router.post('/work',function(req,res){    
    const Authorization = "Bearer " + req.session.passport.user.accessToken;
    const courseId = req.query.classId;
    const category = req.query.category;
    axios.post(`https://classroom.googleapis.com/v1/courses/${courseId}/courseWork`,req.body,{
        headers:{
            'Authorization':Authorization,
            'Accept' : 'application/json',
        }
    }).then(()=>{       
        models.work.create({
            classId: classId,
            category: category,
            }).then(()=>{
                res.status(200).send('잘 되었습니다.');
            }).catch(err=>{
                res.status(500).send('DB 저장 오류'+err);
            })
    }).catch(err=>{
        res.status(500).send('api 요청 오류'+err);
    })
});

router.put('/work',function(req,res){    
    const Authorization = "Bearer " + req.session.passport.user.accessToken;
    const courseId = req.query.classId;
    const id = req.query.id;
    const updateMask = req.query.mask;
    axios.post(`https://classroom.googleapis.com/v1/courses/${courseId}/courseWork/${id}?updateMask=${updateMask}`,req.body,{
        headers:{
            'Authorization':Authorization,
            'Accept' : 'application/json',
        }
    }).then(()=>{       
        res.status(200).send('잘 됨');
    }).catch(err=>{
        res.status(500).send('api 요청 오류'+err);
    })
});

module.exports = router;