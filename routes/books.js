var express = require('express');
var router = express.Router();

//Books 모델 불러오기
var Books = require('../schemas/Books');

/* GET users listing. */
router.get('/create', async (req, res, next) => {
  try {
    const book = new Books({
      title: '홍길동전',
      writer: '홍길동',
      comment: '형을 형이라...'
    });
    const result = await book.save(); //데이터 저장 / mongoose 객체인 book을 save해서 result에 담고
    res.json(result);
  }
  catch(e) {
    console.log(e);
  }
});

router.get('/list', async (req, res, next) => {
  try {
    const result = await Books.find(); //데이터 전체 불러오기 / 삭제 deleteOne() / 수정 updateOne()
    res.json(result);
  }
  catch(e) {
    console.log(e);
  }
});

// mongoosejs.com/docs/apiquery.html 에서 명령어 확인 가능

module.exports = router;
