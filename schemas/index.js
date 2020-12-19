// mongoDB의 mongoose 불러오기 (mysql의 시퀄라이즈와 같은 기능을 하는)
const mongoose = require('mongoose');

// mongoDB에 접속할 수 있는 정보
const uris = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}`;

// 옵션. npmjs.com/package/mongoose 의 기본 옵션 참고
const options = {
  useNewUrlParser: true, //url parsing 할 때 에러가 나면 멈출래 안멈출래 같은 거라 함
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}


// 함수 형태로 내보내기
module.exports = () => {
  const connect = () => { // mongoDB 에 접근하는 connect 객체 생성
    mongoose.connect(uris, options, (err) => {  // momngoose를 통해 connect 실행 / 인자: url, 옵션, 콜백
      if(err) console.log(err);
      else console.log('몽고디비 연결 성공')
    });
  }

  connect(); // 위의 connect 함수 실행 => connect가 된 순간 아래 connection 객체가 생성된다

  // 생성된 connection 객체에 이벤트를 붙인다(서버가 돌다가 에러가 발생하면 그 에러를 실행하라)
  mongoose.connection.on('error', (err) => {
    throw new Error(err);
    // 여기서 터진 에러는 app.js의 error handler에서 받아서 뿌려줄 것임
  });

  mongoose.connection.on('disconnected', connect) //에러처리하느라 연결이 끊기면 connect함수를 콜백으로 실행해라. 다시 연결하라는 뜻인 듯.

  require('./Books');
};