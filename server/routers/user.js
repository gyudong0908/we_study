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

router.put('/user', upload.single('file'), function (req, res) {
    const userId = req.session.passport.user;
    const fileName = req.file.filename;
    const downloadPath = `${req.protocol}://${req.hostname}:${8081}/download/profile/${fileName}`;
    const filePath = req.file.path;
    models.User.update({ ...req.body, filePath: filePath, downloadPath: downloadPath }, {
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

module.exports = router;