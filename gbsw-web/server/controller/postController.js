const postModel = require('../models/postModel');
exports.createPost = async (req, res) => {
    try {
      const userId = req.userId;
      if (!userId) {
        return res.status(401).json({ success: false, message: "로그인 필요" });
      }
  
      const { title, content, tag } = req.body;
      const filePath = req.file ? `/uploads/${req.file.filename}` : null;
  
      await postModel.createPost(userId, title, content, filePath, tag);
      res.json({ success: true, message: "게시글 작성 완료" });
  
    } catch (err) {
      console.error("createPost 에러:", err);
      res.status(500).json({ success: false, message: "서버 오류" });
    }
  };

exports.detail = async (req, res, next) => {
    try {
        const post = await postModel.getPostById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
        }
        return res.status(200).json(post);
    } catch (err) {
        next(err);
    }
};

exports.list = async (req, res) => {
    const keyword = req.query.keyword || '';
    const posts = await postModel.getPosts(keyword);
    res.json({ success: true, posts });
};

exports.like = async (req, res) => {
    await postModel.likePost(req.params.id);
    res.json({ success: true, message: '좋아요 처리 완료' });
};

exports.updatePost = async (req, res, next) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: '모든 내용을 입력하세요.' });
        }

        const affected = await postModel.updatePost(req.params.id, title, content);

        if (affected === 0) {
            return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
        }

        return res.status(200).json({ message: '게시글 수정 완료' });

    } catch (err) {
        next(err);
    }
};

// 게시글 삭제
exports.deletePost = async (req, res, next) => {
    try {
        const affected = await postModel.deletePost(req.params.id);

        if (affected === 0) {
            return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
        }

        return res.status(200).json({ message: '게시글 삭제 완료' });

    } catch (err) {
        next(err);
    }
};



exports.getPopularPosts = async (req, res) => {
  try {
    const posts = await postModel.getPopularPosts();
    res.json({ success: true, posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "인기 게시글 로드 실패" });
  }
};

exports.getRecommendedPosts = async (req, res) => {
  try {
    const posts = await postModel.getRecommendedPosts();
    res.json({ success: true, posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "추천 게시글 로드 실패" });
  }
};