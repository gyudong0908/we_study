const express = require('express');
const router = express.Router();
const dotenv = require('dotenv').config();
const axios = require('axios');
const models = require('../models');
router.use(express.json());

router.get('/classes',function(req,res){    
    const Authorization = "Bearer " + req.session.passport.user.accessToken;
    axios.get(`https://classroom.googleapis.com/v1/courses`,{
        headers:{
            'Authorization':Authorization,
            'Accept' : 'application/json',
        }
    }).then((data)=>{       
        res.send(data.data.courses);
    }).catch((err)=>{
        console.log(err.message);
    })
})

router.post('/class',function(req,res){    
    const Authorization = "Bearer " + req.session.passport.user.accessToken;
    axios.post(`https://classroom.googleapis.com/v1/courses`,{
        headers:{
            'Authorization': Authorization,
            'Accept' : 'application/json',
        }
    }).then((data)=>{
        console.log('id입니다')
        // console.log(data.data)
        // axios.post(`https://classroom.googleapis.com/v1/courses/${data.data.id}/teachers`,{ "userId":"me"},{
        //     headers:{
        //         'Authorization': Authorization,
        //         'Accept' : 'application/json',
        //     }
        // }).then(()=>{
        //     console.log("변경완")
        // }).catch((err)=>{
        //     console.log(err.message)
        // })
        // axios.patch(`https://classroom.googleapis.com/v1/courses/?${data.data.id}&updateMask=courseState`,{
        //    courseState
        // },{headers:{
        //     'Authorization': Authorization,
        //     'Accept' : 'application/json',
        // }}).then(()=>{
        //     // models.create({
        //     //     id: data.data.courses[0].id
        //     // })    
        // })
    }).catch((err)=>{
        console.log(2)
        console.log(err.message);
    })
})
module.exports = router;