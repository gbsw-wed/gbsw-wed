// middleware/authMiddleware.js
const auth = (req, res, next) => {
    if (!req.session || !req.session.user) {
        return res.status(401).json({
            success: false,
            message: "로그인이 필요합니다.",
            redirectTo: "/login",
        });
    }

    // 여기 중요: 세션에 user_id (언더바)로 저장되어 있음!!
    const userId = req.session.user.user_id;

    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "유효하지 않은 사용자 세션",
        });
    }

    // 이제 모든 컨트롤러에서 req.userId 쓰면 됨
    req.userId = userId;
    next();
};

module.exports = auth;
