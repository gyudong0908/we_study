const express = require('express');
const router = express.Router();
const models = require('../models');
const { Op } = require('sequelize');
const sequelize = require('sequelize');

router.get('/progress/work',function(req,res){
    const classId = req.query.classId;
    models.sequelize.query(`
    select classUser.user_id, count(submits.id) as countSubmits
    from classes
    join classUser
    on classes.id = classUser.class_id
    and classUser.user_id != classes.teacher
    join curriculums
    on curriculums.class_id = classes.id
    join works
    on works.curriculum_id = curriculums.id
    left outer join submits
    on works.id = submits.work_id
    and submits.user_id = classUser.user_id
    where classes.id = ${classId}
    group by classUser.user_id`
    ).then((data)=>{
        res.status(200).send(data[0])
    }).catch(err=>{
        console.log(err);
        res.status(500).send('users 조회 에러');
    })
})

router.get('/progress/quiz',function(req,res){
    const classId = req.query.classId;
    models.sequelize.query(`
    select users.id, count(distinct(quizzes.id))-1 as countQuiz, users.nick_name
    from classes
    join classUser
    on classes.id = classUser.class_id
    and classUser.user_id != classes.teacher
    join quizzes
    on quizzes.class_id = classes.id
    join questions
    on quizzes.id = questions.quiz_id
    join studentAnswers
    on questions.id = studentAnswers.question_id
    and classUser.user_id = studentAnswers.user_id
    join users
    on users.id = studentAnswers.user_id
    where classes.id = ${classId}
    group by classUser.user_id`
    ).then((data)=>{
        res.status(200).send(data[0]);
    }).catch(err=>{
        console.log(err);
        res.status(500).send('users 조회 에러');
    })
})
router.get('/progress/private/work',function(req,res){
    const userId = req.session.passport.user;
    const classId = req.query.classId;
    models.sequelize.query(`
    select count(distinct(works.id)) as totalSubmitCount, count(CASE WHEN submits.user_id = ${userId} THEN 1 ELSE null END) AS mySubmitCount
    from classes
    join curriculums
    on curriculums.class_id = classes.id
    join works
    on works.curriculum_id = curriculums.id
    left outer join submits
    on submits.work_id = works.id
    -- and submits.user_id = ${userId}
    where classes.id = ${classId}`).then((data)=>{
         res.status(200).send(data[0][0]);
    }).catch(err=>{
        console.log(err);
        res.status(500).send('work 조회 에러');
    })
})
router.get('/progress/private/quiz',function(req,res){
    const classId = req.query.classId;
    const userId = req.session.passport.user;
    models.sequelize.query(`
    select count(distinct(quizzes.id)) as totalQuizCount , count(distinct(case when studentAnswers.user_id = ${userId} then quizzes.id else null end)) AS myQuizCount
    from classes
    join quizzes
    on quizzes.class_id = classes.id
    join questions
    on questions.quiz_id = quizzes.id
    left outer join studentAnswers
    on studentAnswers.question_id = questions.id
    where classes.id = ${classId}`
    ).then((data)=>{
        res.status(200).send(data[0][0]);
    }).catch(err=>{
        console.log(err);
        res.status(500).send('퀴즈 조회 에러');
    })
})
module.exports = router;