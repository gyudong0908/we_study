const express = require('express');
const router = express.Router();
const models = require('../models');
const sequelize = require('sequelize');
router.use(express.json());


router.get('/rank', async (req, res) => {
    const { classId } = req.query; // 클라이언트에서 전달된 선택한 클래스 ID
    try {
        let results;

        if (classId) {
            results = await models.Rank.findAll({
                attributes: [
                    [sequelize.fn('SUM', sequelize.col('study_time')), 'totalStudyTime'],
                ],
                include: [
                    {
                        model: models.User,
                        attributes: ['id', 'nickName'],
                        include: [
                            {
                                model: models.Class,
                                where: { id: classId }
                            }
                        ]
                    }
                ],
                group: ['User.id'],
                order: [[sequelize.literal('totalStudyTime'), 'DESC']],
                limit: 20,
            });
        } else {
            results = await models.Rank.findAll({
                attributes: [
                    [sequelize.fn('SUM', sequelize.col('study_time')), 'totalStudyTime'],
                ],
                include: [
                    {
                        model: models.User,
                        attributes: ['id', 'nickName'],
                    }
                ],
                group: ['User.id'],
                order: [[sequelize.literal('totalStudyTime'), 'DESC']],
                limit: 20,
            });
        }

        res.json(results);
        console.log(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});




router.post('/rank', function (req, res) {
    const userId = req.session.passport.user;
    models.Rank.create({ ...req.body, userId: userId })
    res.send('됨');
})

router.post('/rank/stop', async (req, res) => {
    const userId = req.session.passport.user;
    let { stopTime } = req.body;
    try {
        const latestStartTime = await models.Rank.findOne({
            order: [['startTime', 'DESC']],
            where: { userId: userId },
            attributes: ['startTime'],
        });

        const startTime = new Date(latestStartTime.startTime);

        stopTime = new Date(stopTime);
        const timeDifference = stopTime.getTime() - startTime.getTime();


        const studyTimeInSeconds = timeDifference / 1000;

        const latestRecord = await models.Rank.findOne({
            where: {
                userId: userId,
            },
            order: [['createdAt', 'DESC']],
        });

        if (latestRecord) {
            await models.Rank.update(
                { studyTime: studyTimeInSeconds },
                {
                    where: {
                        id: latestRecord.id,
                    },
                }
            );
        }

        res.status(200).json({ message: '공부 시간이 업데이트되었습니다.', studyTime: studyTimeInSeconds });
    } catch (error) {
        console.error('시간 업데이트 중 오류가 발생했습니다:', error);
        res.status(500).json({ message: '시간 업데이트 중 오류가 발생했습니다.' });
    }
});


module.exports = router;