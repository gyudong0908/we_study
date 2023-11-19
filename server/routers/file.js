const express = require('express');
const router = express.Router();
const models = require('../models');
const path = require('path');
const fs = require('fs');

router.get('/download/profile/:userId/:fileName', function (req, res) {
    const userId = req.params.userId;
    const fileName = req.params.fileName;

    const filePath = path.join(path.resolve(__dirname, '..'), `uploads/profile/${userId}`, fileName);
    if (fs.existsSync(filePath)) {
        res.setHeader('Content-disposition', 'inline; filename=' + fileName);
        res.sendFile(filePath);
    } else {
        res.status(500).send('파일이 없습니다.');
    }
})


module.exports = router;