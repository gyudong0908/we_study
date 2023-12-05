const express = require('express');
const router = express.Router();
const models = require('../models');
const { Op } = require('sequelize');
const sequelize = require('sequelize');

router.get('/progress/work',function(req,res){
    const classId = req.query.classId;
    models.User.findAll({
        raw:true,
        group:['id'],
        attributes:['id','nickName',[sequelize.fn('count', sequelize.col('Classes.Curriculums.Works.Submits.id')), 'countSubmits']],
        include: [
            {
                model: models.Class,
                through: 'classUser',
                where:{
                    id: classId,
                    teacher:{
                        [Op.not] : sequelize.col('User.id')
                    }
                },
                attributes:[],
                include:[
                    {
                        model:models.Curriculum,
                        attributes:[],
                        include:[{
                            model: models.Work,
                            attributes:[],
                            include:[
                                {
                                    model:models.Submit,
                                    attributes:[],
                                }
                            ]
                        }]

                    }
                ]
            },
        ]
    }).then((data)=>{
        res.status(200).send(data)
            console.log(data);
    }).catch(err=>{
        console.log(err);
        res.status(500).send('users 조회 에러');
    })
})

router.get('/progress/quiz',function(req,res){
    const classId = req.query.classId;
    models.sequelize.query(`
    select users.id, count(distinct(quizzes.id)) as countQuiz, users.nick_name
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
        res.status(200).send(data)
            console.log(data);
    }).catch(err=>{
        console.log(err);
        res.status(500).send('users 조회 에러');
    })
})
module.exports = router;