const express = require('express');
const router = express.Router();
const models = require('../models');
const uuid = require('uuid');
const sequelize = require('sequelize');
router.use(express.json());
const {Op} = require('sequelize');

router.post('/class', function (req, res) {
    const userId = req.session.passport.user;

    models.Class.create({ ...req.body, teacher: userId }).then((data) => {
        const basecode = uuid.v4();
        const shortBaseCode = basecode.slice(0, 6);
        data.addUser(userId);
        data.update({
            code: shortBaseCode + data.dataValues.id
        }).then(() => {
            models.Curriculum.create({
                classId: data.dataValues.id,
                title: '기타'
            }).then(() => {
                models.ClassChat.create({
                    title: data.dataValues.title,
                    classId: data.dataValues.id
                }).then((classChat) => {
                    models.ChatUser.create({
                        chatId: classChat.dataValues.id,
                        userId: userId
                    }).then(() => {
                        res.status(200).send(data.dataValues);
                    }).catch(err => {
                        console.log(err);
                        res.status(500).send('클래스 채팅방 참가 오류');
                    })
                }).catch(err => {
                    console.log(err);
                    res.status(500).send('클래스 채팅방 생성 오류');
                })
            }).catch(err => {
                console.log(err);
                res.status(500).send('기타 Topic 생성 오류');
            })
        }).catch(err => {
            console.log(err);
            res.status(500).send('초대 코드 생성 오류');
        })
    }).catch(err => {
        console.log(err);
        res.status(500).send("Class 생성 오류");
    })
});

router.get('/classes', function (req, res) {
    const userId = req.session.passport.user;

    models.User.findByPk(userId, {
        include: [
            {
                model: models.Class,
                through: 'classUser',
            }
        ]
    }).then(user => {
        const classData = user.Classes.map(data => data.dataValues);
        res.status(200).send(classData);
    }).catch(err => {
        console.log(err);
        res.status(500).send('Class 조회 에러 발생');
    })
})

router.get('/class', function (req, res) {
    const classId = req.query.classId;
    models.Class.findByPk(classId, { raw: true }).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        console.log(err);
        res.status(500).send("클래스 조회 에러 발생");
    })
})

router.get('/class/submits', function (req, res) {
    const classId = req.query.classId;
    models.Class.findByPk(classId, {
        include: [{
            model: models.Curriculum,
            include: [{
                model: models.Work,
                include: [{
                    model: models.Submit,
                    include:[{
                        model: models.User,
                    }]
                }]
            }]
        }]
    }).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        console.log(err);
        res.status(500).send("클래스 조회 에러 발생");
    })
})

router.get('/class/user', function (req, res) {
    const classId = req.query.classId;
    models.Class.findByPk(classId, {
        include: [
            {
                model: models.User,
                through: 'classUser',
            }
        ]
    }).then((classData) => {
        const userData = classData.Users.map(data => data.dataValues);
        res.status(200).send({ userData, teacherId: classData.dataValues.teacher });
    }).catch(err => {
        console.log(err);
        res.status(500).send('Class 유저 조회 에러 발생');
    })
})

router.get('/class/progress', function (req, res) {
    const classId = req.query.classId;
    models.Class.findAll( {
        attributes:[
            [sequelize.fn('count', sequelize.col('Curriculums.Works.Submits.User.id')), 'countSubmits'],
        ],
        where:{
            id:classId,
        },
        raw:true,

        include: [{
            model: models.Curriculum,
            attributes:[],
            include: [{
                model: models.Work,
                attributes:['id'],
                include: [{
                    model: models.Submit,
                    attributes:['id'],
                    // required: true,
                    attributes:[],                  
                    include:[{
                        model: models.User,
                        attributes:['nickName']                        
                    }],
                }],
                where: {
                    id: {
                        [Op.not]: null, // Curriculums.Works.id가 null이 아닌 경우
                    },
                },
            }],
        }], 
        group:['Curriculums.Works.id','Curriculums.Works.Submits.User.id'],
    }).then(data => {
        res.status(200).send(data);
    }).catch(err => {
        console.log(err);
        res.status(500).send("클래스 조회 에러 발생");
    })
})

router.get('/class/attendances', function(req,res){
    const classId = req.query.classId;
    models.Class.findAll({
        attributes:[[sequelize.fn('count', sequelize.col('Users.Attendances.id')), 'totalAttendance']],
        raw:true,
        where:{
            id: classId,
            teacher: {
                [Op.not]: sequelize.col('Users.id'), // 선생님인 경우 제외
            },
        },
        include:[
            {
                model: models.User,
                through: 'classUser',
                attributes:['id','nickName'],
                include:[{
                    model: models.Attendance,
                    attributes:[]
                }]
            },
        ],
        group:['Users.id']
    }).then((data)=>{
        res.status(200).send(data);
    }).catch(err=>{
        console.log(err);
    })
})

router.post('/class/join', function (req, res) {
    const code = req.query.code;
    const userId = req.session.passport.user;

    models.Class.findOne({ where: { code: code } }).then(data => {
        data.addUser(userId);
        models.ClassChat.findOne({
            where: {
                classId: data.dataValues.id
            }
        }).then(classChat => {
            models.ChatUser.create({
                chatId: classChat.dataValues.id,
                userId: userId
            }).then(() => {
                res.status(200).send(data.dataValues);
            }).catch(err => {
                console.log(err);
                res.status(500).send('채팅방 참여 오류 발생');
            })
        }).catch(err => {
            console.log(err);
            res.status(500).send('채팅방 참여 오류 발생');
        })
    }).catch(err => {
        console.log(err);
        res.status(500).send('클래스 초대 오류');
    })
});

router.put('/class', function (req, res) {
    const classId = req.query.classId;

    models.Class.update(req.body, { where: { id: classId } }).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.status(500).send("클래스 변경 오류");
    })
})

router.delete('class', function (req, res) {
    const classId = req.query.classId;
    models.Class.destory({
        where: {
            id: classId
        }
    }).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.status(500).send('Class 삭제 오류 발생');
    })
})

module.exports = router;