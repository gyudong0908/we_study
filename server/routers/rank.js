const express = require('express');
const router = express.Router();
const models = require('../models');
router.use(express.json());

router.post('/rank', function (req, res) {
    const userId = req.session.passport.user;
    models.Rank.create({ ...req.body, userId: userId })
    res.send('됨');
    //     }).then((data)=>{       
    //         res.send(data.data.courses);   //이런식으로 보내줌!!!
    //     }).catch((err)=>{
    //         console.log(err.message);
    //     })
    // })
    //
})

router.post('/rank/stop', async (req, res) => {
    const userId = req.session.passport.user;  // 내가 임의로 추가해줌!!
    let { stopTime } = req.body;
    try {
        // DB에서 해당 클래스의 startTime을 가져옵니다.
        const latestStartTime = await models.Rank.findOne({
            order: [['startTime', 'DESC']], // 가장 최신의 startTime을 가져옵니다.
            where: { userId: userId },
            attributes: ['startTime'],
        });

        const startTime = new Date(latestStartTime.startTime); // 해당 클래스의 최신 startTime을 가져옵니다.

        stopTime = new Date(stopTime);
        // 시간 간격 계산 (밀리초 단위)
        const timeDifference = stopTime.getTime() - startTime.getTime();
        console.log(2)
        // 시간 간격을 초 단위로 변환하여 studyTime에 저장 (예: 밀리초를 초로 변환)
        const studyTimeInSeconds = timeDifference / 1000;
        console.log(3)
        // 데이터베이스에 시간 간격을 저장합니다.
        // await models.Rank.update(
        //     { studyTime: studyTimeInSeconds },
        //     {
        //         where: {
        //             userId: userId,
        //         },
        //     }
        // );

        const latestRecord = await models.Rank.findOne({
            where: {
                userId: userId,
            },
            order: [['createdAt', 'DESC']], // createdAt 기준으로 내림차순 정렬하여 최신 레코드 가져오기
        });

        if (latestRecord) {
            await models.Rank.update(
                { studyTime: studyTimeInSeconds },
                {
                    where: {
                        id: latestRecord.id, // 가장 최신의 레코드의 ID를 기준으로 업데이트
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







//아래는 참고용임.
// router.post('/notice', function (req, res) {
//     const classId = req.query.classId;
//     models.Notice.create({ ...req.body, classId: classId }).then((data) => {
//         res.status(200).send(data.dataValues);
//     }).catch(err => {
//         console.log(err);
//         res.status(500).send("curriculum 생성 에러 발생");
//     })
// })
module.exports = router;