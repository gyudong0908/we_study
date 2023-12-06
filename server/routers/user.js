const express = require('express');
const router = express.Router();
const models = require('../models');
const upload = require('../config/multerConfig.js');
router.use(express.json());

router.get('/user', function (req, res) {
    const userId = req.session.passport.user;
    models.User.findOne({
        raw: true,
        where: {
            id: userId
        }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send("user 조회 오류");
        console.log(err)
    })
})
router.get('/userinfo', function (req, res) {
    const userId = req.query.userId;
    models.User.findByPk(userId).then((data) => {
        res.status(200).send(data);
    }).catch(err => {
        console.log(err);
        res.status(500).send('user정보 조회 에러 발생');
    })
})

router.put('/user', upload.single('file'), function (req, res) {
    const userId = req.session.passport.user;
    let fileData = {}
    if (req.file) {
        const fileName = req.file.filename;
        const downloadPath = `${req.protocol}://${req.hostname}/download/profile/${userId}/${encodeURIComponent(fileName)}`;
        const filePath = req.file.path;
        fileData = { filePath: filePath, downloadPath: downloadPath };
    }
    models.User.update({ ...req.body, ...fileData }, {
        where: {
            id: userId
        }
    }).then(() => {
        res.sendStatus(200);
    }).catch(err => {
        console.log(err);
        res.status(500).send('유정 정보 변경 에러');
    })
})

router.get('/user/classes', async function (req, res) {
    const userId = req.session.passport.user;
    try {
        const userInstance = await models.User.findByPk(userId);
        const classesForUser = await userInstance.getClasses();
        res.status(200).send(classesForUser);
    } catch (error) {
        res.status(500).send('과제 정보 조회 오류');
    }
})



router.get('/user/classes', async (req, res) => {
    const userId = req.session.passport.user;
    try {
        const user = await models.User.findByPk(userId, {
            include: [
                {
                    model: models.Class,
                    attributes: ['id', 'title'],
                },
            ],
        });

        if (!user) {
            return res.status(500).json({ message: 'User not found' });
        }
        res.json(user.classes);
    } catch (error) {
        res.status(500).send('유저 클래스 조회 오류');
    }
});


module.exports = router;






