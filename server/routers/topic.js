const express = require('express');
const router = express.Router();
const axios = require('axios');
router.use(express.json());

router.post('/topic',function(req,res){
    const Authorization = "Bearer " + req.session.passport.user.accessToken;
    const courseId = req.query.classId;
    axios.post(`https://classroom.googleapis.com/v1/courses/${courseId}/topics`,req.body,{
        headers:{
            'Authorization':Authorization,
            'Accept' : 'application/json',
        }}).then(()=>{
            res.status(200).send('잘 되었습니다.');
        }).catch(err=>{
            res.status(500).send('오류 발생');
            console.log(err);
        })
})

module.exports = router;