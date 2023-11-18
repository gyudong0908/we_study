const express = require('express');
const router = express.Router();
const models = require('../models');
const path = require('path');
const fs = require('fs');

router.get('/download/profile/:fileName', function (req, res) {
    const fileName = req.params.fileName;

    const filePath = path.join(path.resolve(__dirname, '..'), `uploads/profile/${req.session.passport.user}`, fileName);
    if (fs.existsSync(filePath)) {
        res.setHeader('Content-disposition', 'inline; filename=' + fileName);
        res.sendFile(filePath);
    } else {
        res.status(500).send('파일이 없습니다.');
    }
})


module.exports = router;