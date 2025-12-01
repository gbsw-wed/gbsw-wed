const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs')

exports.register = async (req, res, next) => {
  try {
    const { username, password, checkPassword, stuNum } = req.body;
    if (!username || !password || !checkPassword || !stuNum)
      return res.status(400).json({ message: '값을 모두 입력하세요' });

    const existing = await userModel.findByUsername(username);
    if (existing) return res.status(409).json({ message: '이미 등록된 학생입니다' });

    if (password !== checkPassword)
      return res.status(400).json({ message: '비밀번호가 일치하지 않습니다' });

    const hashed = await bcrypt.hash(password, 10);
    await userModel.createUser(username, hashed, Number(stuNum));

    return res.status(201).json({ message: '회원가입 완료' });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findByUsername(username);
    if (!user) return res.status(401).json({ message: '존재하지 않는 사용자입니다' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: '비밀번호가 틀렸습니다' });

    req.session.user = {
      user_id: user.user_id,
      username: user.username,      
      stuNum: user.stuNum
  };

    res.json({
      success: true,
      message: "로그인 성공",
      user: req.session.user
    });
  } catch (err) {
    next(err);
  }
};

// userController.js
exports.logout = (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) console.log("세션 삭제 실패:", err);
    });
  }

  res.clearCookie("connect.sid", {
    path: "/",
    httpOnly: true,
    secure: false,      // 로컬이라 false
    sameSite: "lax"
  });

  res.status(200).json({ message: "로그아웃 성공" });
};


exports.check = (req, res) => {
  const user = req.session ? req.session.user : null;
  res.json({
    loggedIn: !!user,
    user: user || null
  });
};

exports.updateUsername = async (req, res, next) => {
  try {
    const user = req.session.user;
    if (!user) return res.status(401).json({ message: "로그인 필요" });

    const { username } = req.body;
    if (!username?.trim()) return res.status(400).json({ message: "이름을 입력하세요" });

    const result = await userModel.updateUsernameByStuNum(user.stuNum, username);
    if (result === 0) return res.status(400).json({ message: "변경 실패" });

    req.session.user.username = username;
    res.json({ message: "이름 변경 완료" });
  } catch (err) {
    next(err);
  }
};

exports.updatePassword = async (req, res, next) => {
  try {
    const user = req.session.user;
    if (!user) return res.status(401).json({ message: "로그인 필요" });

    const { password } = req.body;
    if (!password?.trim()) return res.status(400).json({ message: "비밀번호를 입력하세요" });

    const hashed = await bcrypt.hash(password, 10);
    const result = await userModel.updatePasswordByStuNum(user.stuNum, hashed);
    if (result === 0) return res.status(400).json({ message: "변경 실패" });

    req.session.destroy();
    res.json({ message: "비밀번호 변경 완료" });
  } catch (err) {
    next(err);
  }
};

// controllers/userController.js

exports.updateProfileImage = async (req, res) => {
  try {
    const userId = req.session.user?.user_id;
    if (!userId) {
      return res.status(401).json({ message: "로그인 필요" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "파일이 업로드되지 않았습니다." });
    }

    const fileName = req.file.filename;

    const affected = await userModel.updateProfileImage(userId, fileName);

    if (!affected) {
      return res.status(500).json({ message: "프로필 업데이트 실패" });
    }

    return res.json({
      message: "프로필 이미지가 변경되었습니다.",
      filename: fileName,   // 🔥 프론트에서 필요한 값
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "서버 오류" });
  }
};



exports.deleteAccount = async (req, res, next) => {
  try {
    const userId = req.session.user.user_id;

    if (!userId) return res.status(401).json({ message: "로그인 필요" });

    await userModel.softDeleteUser(userId.user_id);

    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.json({ message: "계정이 삭제되었습니다." });
    });
  } catch (err) {
    next(err);
  }
};