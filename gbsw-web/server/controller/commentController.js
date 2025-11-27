const commentModel = require("../models/commentModel");


exports.addComment = async (req, res) => {
    const { content } = req.body;
    const { postId } = req.params;
    const userId = req.session.user?.id;

    if (!content)
        return res.status(400).json({ success: false, message: "댓글 내용을 입력해주세요" });

    const commentId = await commentModel.createComment(userId, postId, content);

    res.status(201).json({
        success: true,
        commentId,
        message: "댓글 작성 완료",
    });
};

exports.deleteComment = async (req, res) => {
    const { commentId } = req.params;
    const userId = req.session.userId;

    await commentModel.deleteComment(commentId, userId);
    res.json({ success: true, message: "댓글 삭제 완료", commentId });
};




// 댓글 수 가져오기
exports.getCommentCount = async (req, res,next) => {
    try {
        const { postId } = req.params;
        const count = await commentModel.getCommentCountByPost(postId);
        res.json({ success: true, postId, count });
    } catch (err) {
        next(err)
    }
};

