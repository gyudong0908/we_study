const express = require('express')
const app = express();
const passport = require('./config/passport.js');
const session = require('express-session');
const socketModule = require('./websocket/websocket.js');
const models = require("./models/index.js");
const dotenv = require('dotenv').config();
const cors = require('cors');

// 세션 미들웨어 설정
app.use(session({
  secret: process.env.sessionSecret, // 세션 암호화에 사용될 키 (필요한 경우 변경)
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 10000 * 60 * 60
  },
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
  origin: process.env.frontAddress, // 클라이언트 애플리케이션의 도메인으로 변경
  credentials: true, // 'include' 모드를 사용할 때 credentials 옵션 설정
}));

// 미들웨어: 모든 URL에 대한 액세스를 차단
app.use((req, res, next) => {
  // `/public` URL에 대한 액세스는 허용
  if (req.url.match(/^\/auth\/google/) || req.url === '/') {
    return next(); // 다음 미들웨어 또는 라우트로 진행
  }
  // Passport.js의 isAuthenticated 메서드를 사용하여 로그인 여부 확인
  if (req.isAuthenticated()) {
    return next(); // 사용자가 로그인한 경우 다음 미들웨어 또는 라우트로 진행
  } else {
    // 사용자가 로그인하지 않은 경우 로그인 페이지로 리디렉션
    res.redirect(process.env.frontAddress);
  }
});

app.use('/', require('./routers/login.js'));
app.use('/', require('./routers/class.js'));
app.use('/', require('./routers/memo.js'));
app.use('/', require('./routers/work.js'));
app.use('/', require('./routers/attendance.js'));
app.use('/', require('./routers/curriculum.js'));
app.use('/', require('./routers/notice.js'));
app.use('/', require('./routers/submit.js'));
app.use('/', require('./routers/user.js'));
app.use('/', require('./routers/file.js'));
app.use('/', require('./routers/classChat.js'));
app.use('/', require('./routers/rank.js'));
app.use('/', require('./routers/quiz.js'));

const httpServer = app.listen(8081, () => {
  console.log('서버 동작 중');
})

socketModule(httpServer);

//orm
models.sequelize.sync({ force: false }).then(() => {
  console.log(" DB 연결 성공");
}).catch(err => {
  console.log("연결 실패");
  console.log(err);
});
