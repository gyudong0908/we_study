const multer = require('multer');
const path = require('path');
const fs = require('fs');
const models = require('../models');

//  여기서 모델을 가져와서 user에 filePath와 downloadPath를 따로 만들자, submit에서도 마찬가지다
// 그렇게 2 모델을 불러와서 user의 경우는 바로 userId로 찾으면 되고 submit의 경우는 workId를 받아서 그걸로 찾아서
// 저장 되어 있는 filePath를 가져온다 그 다음 해당 파일을 수정 한다.

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const currentDir = path.resolve(__dirname); // 현재 디렉토리 경로를 문자열로 얻기
        const parentDir = path.resolve(currentDir, '..'); // 현재 디렉토리의 상위 디렉토리
        let dynamicPart = '';
        if (req.path === '/user') {
            dynamicPart = 'profile';
            models.User.findOne({
                where: {
                    id: req.session.passport.user
                }
            }).then((data) => {
                if (data.dataValues.filePath) {
                    fs.unlink(data.dataValues.filePath, (unlinkErr) => {
                        if (unlinkErr && unlinkErr.code !== 'ENOENT') {
                            console.error('Error deleting previous image:', unlinkErr);
                            return;
                        }
                    });
                }
            })            
        } else if (req.path === '/create/submit') {
            dynamicPart = 'submit';            
        } else if(req.path === '/submit'){
            dynamicPart = 'submit';   
            models.Submit.findOne({
                where: {
                    id: req.query.submitId
                }
            }).then((data) => {
                if (data.dataValues.filePath) {
                    fs.unlink(data.dataValues.filePath, (unlinkErr) => {
                        if (unlinkErr && unlinkErr.code !== 'ENOENT') {
                            console.error('Error deleting previous image:', unlinkErr);
                            return;
                        }
                    });
                }
            })
        } else {
            console.log(req.url)
            dynamicPart = 'default_folder';
        }
        const userUploadPath = path.join(parentDir, 'uploads', dynamicPart, req.session.passport.user.toString());

        if (!fs.existsSync(userUploadPath)) {
            fs.mkdirSync(userUploadPath, { recursive: true });
        }
        cb(null, userUploadPath);
    },
    filename: function (req, file, cb) {
        // 파일의 이름을 설정합니다. (원하는 방식으로 수정)
        cb(null, Date.now() + '_' + file.originalname);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
