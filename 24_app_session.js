// HTTP 통신
// 비 연결지향(Connectionless) - 클라이언트에서 서버로 요청(request), 서버가 요청에 대한 응답(response)을 클라이언트로 보내고 난 후 연결이 종료됨
// 상태정보유지를 안함(Stateless) - 통신 이후 바로 연결이 종료되기 때문에 서버는 클라이언트의 상태를 알 수 없다.

// 로그인-클라이언트와 서버간의 로그인 상태를 유지
// 세션, 쿠키를 사용하게 됨

// 쿠키 - 클라리언트에 저장 (key-value)
// 쿠키이름, 값, 만료시간, 전송할 도메인명, 보안 연결 여부 등

// 1. 클라이언트에서 로그인
// 2. 서버가 이 로그인 유효한지 검증하고, 맞다면 응답헤더에 쿠키정보를 넣어서 보내요. 이게 클라이언트 쿠키에 저장됨
// 3. 클라이언트가 서버에 요청할 때 마다 쿠키 정보를 같이 헤더에 넣어서 보내는 거예요.
// 4. s.id 혹은 sessionid

// 세션 - 브라우저가 종료되기 전까지 클라이언트의 요청을 유지하게 해주는 기술
// 세션 정보를 expess-session로 관리

const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();

app.use(
  express.json({
    limit: "50mb",
  })
);

app.use(cookieParser());

const sess = {
  secret: "secret key",
  resave: false, // 세션에 변경사항이 없어도 항상 다시 저장할지에 대한 여부
  saveUninitialized: true, // 초기화되지 않은 세션을 저장소에 강제로 저장할지에 대한 여부
  cookie: {
    httpOnly: false, // document.cookie 하면 쿠키 정보를 볼 수 없음
    secure: false, //true - https
    maxAge: 1000 * 60 * 60, // 쿠키가 유지되는 시간
  },
};

// if(app.get("env") === "prod") {
// sess.cookie.secure = true;
// }

app.use(session(sess));

app.listen(3000, () => {
  console.log("서버가 포트 3000번으로 시작 되었습니다.");
});

app.post("/login", (req, res) => {
  const { email, pw } = req.body.param;
  // 데이터베이스에 전달받은 이메일 주소와 비밀번호에 맞는 사용자가 있는 체크
  // 로그인
  req.session.email = email;
  req.session.isLogined = true;
  req.session.save((err) => {
    if (err) throw err;

    res.send(req.session);
  });
});

app.all("*", (req, res, next) => {
  if (req.session.email) {
    console.log(req.cookies);
    next();
  } else {
    res.send("로그인 이후 이용 가능합니다.");
    // res.redirect("/login");
  }
});

app.post("/logout", (req, res) => {
  // if(req.session.email) { // 로그인이 되어 있다면
  req.session.destroy();
  res.redirect("/login");
  // }
});

app.get("/test", (req, res) => {
  // if(req.session.email) {
  res.send("Ok");
  // }
});

// app.get("/api/customers", (req, res) => {
//     if(req.session.email) {
//         res.send("Ok");
//     }
// });

// app.post("/api/customer", (req, res) => {
//     if(req.session.email) {
//         res.send("Ok");
//     }
// });
