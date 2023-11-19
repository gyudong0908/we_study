const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('/classchats', function (req, res) {
    const userId = req.session.passport.user;
    models.ChatUser.findAll({
        where: {
            userId: userId
        },
        include: [{
            model: models.ClassChat,
            attributes: ['title', 'id']
        }
        ]
    }).then(data => {
        console.log(data);
        res.status(200).send(data);
    }).catch(err => {
        console.log(err);
        res.status(500).send('채팅 목록 불러오기 에러 발생');
    })
})
router.get('/chatMessages', function (req, res) {
    const chatId = req.query.chatId;
    models.ChatMessage.findAll({
        raw: true,
        where: {
            chatId: chatId
        },
        include: [{
            model: models.ChatUser,
            include: [{
                model: models.User,
                attributes: ['nickName']
            }]
        }]
    }).then(data => {
        const responseData = data.map(chat => ({ content: chat.message, nickName: chat['ChatUser.User.nickName'] }))
        res.status(200).send(responseData);
    }).catch(err => {
        console.log(err);
        res.status(500).send('채팅 정보 조회 오류 발생');
    })
})

module.exports = router;