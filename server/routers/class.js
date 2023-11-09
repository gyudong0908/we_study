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
    axios.post(`https://classroom.googleapis.com/v1/courses`,req.body,{
        headers:{
            'Authorization': Authorization,
            'Accept' : 'application/json',
        }
    }).then((data)=>{
        axios.put(`https://classroom.googleapis.com/v1/courses/${data.data.id}`,{ 
            courseState : "ACTIVE",
            name: data.data.name            
        },{
            headers:{
                'Authorization': Authorization,
                'Accept' : 'application/json',
            }
        }).then((updateData)=>{
            models.class.create({
                id : updateData.data.id
            })
        }).catch((err)=>{
            console.log(err.message)
        })
    }).catch((err)=>{
        console.log(err.message);
    })
})

module.exports = router;