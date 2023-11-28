const express = require('express');
const router = express.Router();
const models = require('../models');
router.use(express.json());

router.post('/quiz',function(req,res){
    const classId = req.query.classId;
    models.Quiz.create(req.body).then((quiz)=>{
        res.status(200).send(quiz);
    }).catch(err=>{
        console.log(err);
        res.status(500).send('퀴즈 생성 에러');
    })
})

router.get('/quizs',function(req,res){
    const classId = req.query.classId;
    models.Quiz.findAll({where:{classId: classId}}).then((quizs)=>{
        res.status(200).send(quizs);
    }).catch(err=>{
        console.log(err);
        res.status(500).send('퀴즈 리스트 불러오기 에러');
    })
})

router.get('/quiz',function(req,res){
    const quizId = req.query.quizId;
    models.Quiz.findByPk(quizId,{
        include:[
            {
                model: models.Question,
                include:[{
                    model: models.Choice
                }]
            },
        ]
    }).then(quiz=>{
        res.status(200).send(quiz);
    }).catch(err=>{
        console.log(err);
        res.status(500).send('퀴즈 불러오기 에러');
    })
})

router.put('/quiz',function(req,res){
    const quizId = req.query.quizId;
    models.Quiz.update(req.body).then(()=>{
        res.sendStatus(200);
    }).catch(err=>{
        console.log(err);
        res.status(500).send('퀴즈 수정 에러');
    })
})

router.delete('/quiz',function(req,res){
    const quizId = req.query.quizId;
    models.Quiz.destroy({where:{quizId: quizId}}).then(()=>{
        res.sendStatus(200);
    }).catch(err=>{
        console.log(err);
        res.status(500).send('퀴즈 삭제 오류');
    })
})

router.post('/question',function(req,res){
    const quizId = req.query.quizId;
    models.Question.create({...req.body, quizId: quizId}).then((question)=>{
        res.status(200).send(question);
    }).catch(err=>{
        console.log(err);
        res.status(500).send('서술형, 단답형 생성 에러');
    })
})

// router.post('/question/choice',function(req,res){
//     const quizId = req.query.quizId;
//     models.Question.create(req.body).
// })



module.exports = router;