const express = require('express');
const router = express.Router();
const models = require('../models');
router.use(express.json());

router.get('/memos',function(req,res){    
    const userId = req.session.passport.user.id;
    models.memo.findAll({
        attributes: ['id','title'],
        where:{
            userId: userId,
        },
    }).then((data)=>{
        res.send(data); 
    }).catch(err=>{
        console.log(err);
    })
});

router.get('/memo',function(req,res){    
    const id = req.query.id;
    models.memo.findAll({
        where:{
            id: id,
        },
    }).then((data)=>{
        res.send(data); 
    }).catch(err=>{
        console.log(err)
    })
});

router.post('/memo',function(req,res){    
    const  memo = req.body;
    models.memo.create(memo).then(()=>{
        res.status(200).send('잘됨');
    }).catch(err=>{
        console.log(err);
    })
});

router.put('/memo',function(req,res){    
    const memo = req.body;
    models.memo.update(memo,{
        where:{id: req.body.id}
    }).then(()=>{
        res.status(200).send('잘됨');
    }).catch(err=>{
        console.log(err);
    })
});

module.exports = router;