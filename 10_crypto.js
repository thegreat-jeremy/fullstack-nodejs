const crypto = require("crypto");

const pw = "pw1234";

// createHash - 암호화 알고리즘
// digest - 인코딩 방식
const cryptoPW = crypto.createHash("sha512").update(pw).digest("base64");
console.log(cryptoPW); // 9iSeOd1vv2qinR2UM5Aog5LmqBncF/oFeTTsPUjqwGoG3lG232280LqAScE7FR7HHe4K0gyedCN7iZDZl+NZaA==

const cryptoPW2 = crypto.createHash("sha512").update(pw).digest("hex");
console.log(cryptoPW2); // f6249e39dd6fbf6aa29d1d943390288392e6a819dc17fa057934ec3d48eac06a06de51b6df6dbcd0ba8049c13b151ec71dee0ad20c9e74237b8990d997e35968

// 레인보우 테이블 - 원본값과 다양한 암호화 알고리즘 결과를 가지고 있는 테이블
// pw1, sha512-base64, sha512-hex
// pw2
// 해커가 레인보우 테이블을 가지고 있더라도, 원래 평문을 알기 굉장히 어렵게 처리해야함.
// salting 암호화

const createSalt = () => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(64, (err, buf) => {
      if (err) reject(err);

      resolve(buf.toString("base64"));
    });
  });
};

const createCryptoPassword = async (plainPassword) => {
  const salt = await createSalt();
  //
  console.log(salt);

  return new Promise((resolve, reject) => {
    // 암호화할 평문, salt, 반복횟수, 출력할 바이트수, 해시 알고리즘, 콜백 함수
    crypto.pbkdf2(plainPassword, salt, 100000, 64, "sha512", (err, key) => {
      if (err) reject(err);

      resolve({ password: key.toString("base64"), salt: salt });
    });
  });
};

const test = async () => {
  const r = await createCryptoPassword("pw1234");
  console.log(r);
};

test();

const getCryptoPassword = (plainPassword, salt) => {
  return new Promise((resolve, reject) => {
    // 암호화할 평문, salt, 반복횟수, 출력할 바이트수, 해시 알고리즘, 콜백 함수
    crypto.pbkdf2(plainPassword, salt, 100000, 64, "sha512", (err, key) => {
      if (err) reject(err);

      resolve({ password: key.toString("base64"), salt: salt });
    });
  });
};

// 사용자가 로그인 하는 시점에 비번을 입력하면,
// 사용자 아이디, 비밀번호
// 데이터베이스에서 사용자 아이디를 조건으로 저장되어 있는 암호화된 비밀번호와 salt
// getCryptoPassword함수에 로그인 시 입력한 비밀번호 평문과 데이터베이스에서 조회한 salt 값을 전달
// 데이터베이스에 저장된 암호화된 비밀번호와 gwetCrytoPassword 함수로 전달받은 암호화된 password 값이 같은지 확인
// 같으면 로그인 처리
