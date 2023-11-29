const express = require('express');
const router = express.Router();
const models = require('../models');
router.use(express.json());

router.post('/quiz',function(req,res){
    const classId = req.query.classId;
    models.Quiz.create({...req.body, classId: classId}).then((quiz)=>{
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
        ],
        order: [[models.Question, 'createdAt', 'ASC']],
    }).then(quiz=>{
        res.status(200).send(quiz);
    }).catch(err=>{
        console.log(err);
        res.status(500).send('퀴즈 불러오기 에러');
    })
})

router.put('/quiz',function(req,res){
    const quizId = req.query.quizId;
    models.Quiz.update(req.body, {where:{id: quizId}}).then(()=>{
        res.sendStatus(200);
    }).catch(err=>{
        console.log(err);
        res.status(500).send('퀴즈 수정 에러');
    })
})

router.delete('/quiz',function(req,res){
    const quizId = req.query.quizId;
    models.Quiz.destroy({where:{id: quizId}}).then(()=>{
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

router.put('/question',function(req,res){
    const questionId = req.query.questionId;
    models.Question.update(req.body,{where:{id:questionId}}).then(()=>{
        res.sendStatus(200);
    }).catch(err=>{
        console.log(err);
        res.status(500).send('퀴즈 수정 에러 발생');
    })
})

router.delete('/question',function(req,res){
    const questionId = req.query.questionId;
    models.Question.destroy({where:{id:questionId}}).then(()=>{
        res.sendStatus(200);
    }).catch(err=>{
        console.log(err);
        res.status(500).send('Question 삭제 에러');
    })
})

router.post('/question/choice',function(req,res){
    const quizId = req.query.quizId;
    const optionText  = req.body.optionText;
    models.Question.create({...req.body, quizId: quizId}).then((question)=>{
        const modifiedOptions = optionText.map(option => ({ ...option, questionId: question.id }));
        models.Choice.bulkCreate(modifiedOptions).then((choice)=>{
            res.status(200).send({...question.dataValues,optionText:choice });
        }).catch(err=>{
            console.log(err);
            res.status(500).send('선택지 생성 에러');
        })
    }).catch(err=>{
        console.log(err);
        res.status(500).send('퀴즈 생성 에러');
    })
})

router.put('/choice',function(req,res){
    const choiceId = req.query.choiceId;
    models.Choice.update(req.body,{where:{id:choiceId}}).then(()=>{
        res.sendStatus(200);
    }).catch(err=>{
        console.log(err);
        res.status(500).send('Choice 수정 에러');
    })
})

router.delete('/choice',function(req,res){
    const choiceId = req.query.choiceId;
    models.Choice.destroy({where:{id:choiceId}}).then(()=>{
        res,sendStatus(200);
    }).catch(err=>{
        console.log(err);
        res.status(500).send('Choice 삭제 에러');
    })
})

router.post('')

module.exports = router;