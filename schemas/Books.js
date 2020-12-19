const mongoose = require('mongoose');

//몽구스가 가지고 있는 스키마 객체를 불러옴(스키마를 저장하고 생성할 수 있는)
const { Schema } = mongoose;

//스키마 객체가 가지고 있는 Types(index를 생성해줌) UniqueIdx라는 이름으로 불러옴
//const { Types: UniqueIndex } = Schema;
// 관계 설정할 때 필요한 부분이라고 함


// 모델을 위한 구조 만들기
// Schema는 구조 만들어주는 것인데 사실 몽고디비는 형식 상관없이 모든 데이터를 받으므로 이게 필요없긴 함. 그래도 형식 안만들면 관리가 힘듦. (풀텍스트 검색이 대세가 되면서 nosql을 쓰기 시작한 것)
// 형태가 제각각인 nosql을 그래도 최소한의 규칙이라도 갖게 만든 것이 mongoose라는 툴. 몽고디비를 sql처럼 쓰게 해준다 (Schema가 대표적인 기능. 데이터를 구조화함)
const BooksSchemas = new Schema({
  title: {
    type: String, // type은 String 아니면 Number 임. json이므로 길이를 제한할 필요가 없으므로
    require: true //필수인지 아닌지
  },
  writer: {
    type: String,
    require: false //require는 기본값이 false이므로 생략 가능
  },
  comment: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now //default 값으로 자바스크립트 Date 객체의 현재 시간 가져옴
  }
});

// 모델 만들어서 내보내기. 모델 이름은 Books 고 스키마는 BooksSchemas
module.exports = mongoose.model('Books', BooksSchemas);