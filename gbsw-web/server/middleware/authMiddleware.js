
const authM = (req, res, next) => {
  if (req.session && req.session.user) {
    return next(); // 로그인 되어 있으면 통과
  } else {
    return res.status(401).json({
      success: false,
      message: "로그인이 필요합니다.",
      redirectTo: "/login"   // 프론트에서 알아서 처리하게 알려줌
    });
  }
};

module.exports = authM;