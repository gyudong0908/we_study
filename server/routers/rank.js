const router = require('express').Router();
const models = require('../models');     //위 2개는 무지성으로 넣어도 되는듯 하고????

// router.get('/rank', function (req, res) {
//find 해오라는것!!(디비에서 가져오는 작업)
// })





//아래는 참고용임.
// router.get('/classes',function(req,res){    
//     const Authorization = "Bearer " + req.session.passport.user.accessToken;
//     axios.get(`https://classroom.googleapis.com/v1/courses`,{
//         headers:{
//             'Authorization':Authorization,
//             'Accept' : 'application/json',
//         }
//     }).then((data)=>{       
//         res.send(data.data.courses);   //이런식으로 보내줌!!!
//     }).catch((err)=>{
//         console.log(err.message);
//     })
// })
//