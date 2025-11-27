const mysql = require("mysql2/promise");
require('dotenv').config();


const pool = mysql.createPool({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PW,
    port : process.env.DB_PORT,
    database : process.env.DB_NAME
})

module.exports = pool;



// ```sql
// create database gbswDB
// ```

// 유저 - 게시글  1 : N

// 유저 -  댓글 1 : N

// 게시글 - 댓글 1 : N

// '<script>alert(””)</script>’

// # 유저


// CREATE TABLE users (
// user_id INT AUTO_INCREMENT PRIMARY KEY,
// username VARCHAR(50) NOT NULL,
// password VARCHAR(255) NOT NULL,
// stuNum INT NOT NULL UNIQUE,
// created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
// updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
// deleted_at DATETIME
// );


// # 게시글

// ```sql
// create table post(
// post_id int auto_increment primary key,
// title varchar(255) not null,
// content text not null,
// likes int default 0,     
// views int default 0,
// created_at DateTime default now(),
// updated_at DateTime default now(),
// deleted_at DateTime,
// user_id int not null,
// foreign key (user_id) references users(user_id)
// );
// ```

// # 댓글

// ```sql
// create table comments (
//     comment_id int auto_increment primary key,
//     content varchar(255) not null,
//     level int not null default 0,
//     user_id int not null,
//     post_id int not null,
//     parent_comment_id int default null,
//     created_at datetime not null default now(),
//     updated_at datetime not null default now(),
//     deleted_at datetime,
//     foreign key (user_id) references users(user_id),
//     foreign key (post_id) references post(post_id),
//     foreign key (parent_comment_id) references comments(comment_id)
// );
	
// ```





// gbsw-board/
// │
// ├── app.js                         # Express 서버의 진입점 (라우터 등록, 미들웨어 설정)
// ├── .env                           # DB 접속 정보, 포트 등 환경변수
// ├── package.json                   # 프로젝트 정보 및 의존성
// │
// ├── /config
// │   ├── db.js                      # MySQL 연결 설정 (mysql2/promise 사용)
// │
// ├── /models                        # DB 접근 (SQL 실행) 로직 모음
// │   ├── userModel.js               # users 테이블 관련 (회원가입, 로그인, 유저 조회)
// │   ├── postModel.js               # post 테이블 관련 (글 작성, 수정, 삭제, 조회)
// │   ├── commentModel.js            # comments 테이블 관련 (댓글/대댓글 저장, 불러오기)
// │   ├── voteModel.js               # votes 테이블 관련 (투표 등록, 변경, 취소, 합계 조회)
// │   ├── hallOfFameModel.js         # hall_of_fame 테이블 관련 (인기글 관리)
// │
// ├── /routes                        #  라우팅 (요청 URL을 기능별로 분리)
// │   ├── userRouter.js              # 회원가입 / 로그인 / 로그아웃 라우트
// │   ├── postRouter.js              # 글 작성 / 목록 / 상세 / 검색 라우트
// │   ├── commentRouter.js           # 댓글 / 대댓글 작성, 조회 라우트
// │   ├── voteRouter.js              # 좋아요 / 싫어요 / 투표 관련 라우트
// │   ├── hallOfFameRouter.js        # 명예의 전당 페이지 관련 라우트
// │

// ├── /public                        # 정적 파일(css, js, 이미지)
// │   ├── /css
// │   │   ├── style.css              # 기본 스타일
// │   │   └── post.css               # 게시글 전용 스타일
// │   ├── /js
// │       ├── comment.js             # 댓글/대댓글 작성 및 렌더링
// │       ├── vote.js                # 좋아요/싫어요 처리
// │
// └── /middleware
// ├── authMiddleware.js          # 로그인 여부 체크 (JWT or 세션)