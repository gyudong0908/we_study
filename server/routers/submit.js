const express = require('express');
const router = express.Router();
const models = require('../models');
const upload = require('../config/multerConfig.js');

router.use(express.json());

router.post('/create/submit',upload.single('file'), function (req, res) {
    const workId = req.query.workId;
    const userId = req.session.passport.user;
    let fileData = {}
    if (req.file) {
        const fileName = req.file.filename;
        const downloadPath = `${req.protocol}://${req.hostname}:${8081}/download/submit/${userId}/${encodeURIComponent(fileName)}`;
        const filePath = req.file.path;
        fileData = { filePath: filePath, downloadPath: downloadPath, fileName: fileName };
    }
    models.Submit.create({ ...req.body, workId: workId, userId: userId, ...fileData }, {
        include:[{
            model: models.User
        }]
    }).then((data) => {
        models.User.findByPk(userId).then(user=>{
            res.status(200).send({...data.dataValues, User:user.dataValues});            
        }).catch(err=>{
            console.log(err);
            res.status(500).send('user 데이터 조회 에러 발생')
        })
    }).catch(err => {
        console.log(err);
        res.status(500).send("submit 생성 에러 발생");
    })
});

router.get('/submits', function (req, res) {
    const workId = req.query.workId;
    models.Submit.findAll({
        where: {
            workId: workId,
        },
        include:[
            {
            model: models.User
            }
        ],
        order:[['createdAt', 'DESC']]
    }).then((submits => {
        res.status(200).send(submits);
    })).catch(err => {
        console.log(err);
        res.status(500).send('submit 조회 에러 발생');
    })
})

router.get('/submit', function(req,res){
    const submitId = req.query.submitId;
    models.Submit.findByPk(submitId,{
        include:[{
            model: models.User
        }]
    }).then(data=>{
        res.status(200).send(data);
    }).catch(err=>{
        console.log(err);
        res.status(500).send('submit 조회 오류 발생');
    })
})

router.put('/submit',upload.single('file'), function (req, res) {
    const submitId = req.query.submitId;
    const userId = req.session.passport.user;
    let fileData = {}
    if (req.file) {
        console.log()
        const fileName = req.file.filename;
        const downloadPath = `${req.protocol}://${req.hostname}:${8081}/download/submit/${userId}/${encodeURIComponent(fileName)}`;
        const filePath = req.file.path;        
        fileData = { filePath: filePath, downloadPath: downloadPath, fileName: fileName };
    }
    models.Submit.update({...req.body, ...fileData}, { where: { id: submitId } }).then(() => {
        res.status(200).send(fileData);
    }).catch(err => {
        console.log(err);
        res.status(500).send('submit 변경 에러 발생');
    })
})

router.delete('/submit', function (req, res) {
    const submitId = req.query.submitId;
    models.Submit.destroy({
        where: {
            id: submitId
        }
    }).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.status(500).send('제출물 삭제 오류');
    })
})

module.exports = router;