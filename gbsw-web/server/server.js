const express = require("express");
const session = require("express-session");
const cors = require("cors");
const path = require('path')
const fs = require('fs')
require("dotenv").config();

const userRoutes = require("./routes/userRouter");
const postRoutes = require("./routes/postRouter");
const commentRoutes = require("./routes/commentRouter");

const PORT = process.env.PORT || 3000;
const app = express();


app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(cors({
  origin: "http://localhost:5173", //프론트 주소
  credentials: true
}));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);


// 라우터 등록
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ message: "페이지를 찾을 수 없습니다." });
});

// 에러 처리 맞는뎅
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "서버 에러" });
});

app.listen(PORT, () => {
  console.log(`서버 실행 중: http://localhost:${PORT}`);
  console.log(`로그인하러 가기 : http://localhost:5173/`)
});
