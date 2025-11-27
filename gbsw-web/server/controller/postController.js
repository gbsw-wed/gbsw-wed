const postModel = require('../models/postModel');





// 게시글 작성
exports.createPost = async (req, res, next) => {
    console.log("req.body:", req.body);
    console.log("req.file:", req.file);
    try {
        const { title, tag, content } = req.body;

        const userId = req.session?.user?.id || 1; // 테스트용 userId(default 1)
        const filePath = req.file ? req.file.filename : null;

        if (!title || !content) {
            return res.status(400).json({
                success: false,
                message: '제목과 내용을 입력해주세요.'
            });
        }

        const postId = await postModel.createPost(userId, title, content, filePath, tag);

        res.status(201).json({
            success: true,
            message: '게시글 작성 완료',
            postId
        });

    } catch (err) {
        console.error(err);
        next(err);
    }
};

// 게시글 상세
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

// 게시글 리스트
exports.list = async (req, res) => {
    const keyword = req.query.keyword || '';
    const posts = await postModel.getPosts(keyword);
    res.json({ success: true, posts });
};

// 좋아요
exports.like = async (req, res) => {
    await postModel.likePost(req.params.id);
    res.json({ success: true, message: '좋아요 처리 완료' });
};

// 게시글 수정
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



// 인기 검색어 
exports.getPopularKeywords = async (req, res) => {
    try {
      const keywords = await postModel.getPopularKeywords();
      res.json({ success: true, keywords });
    } catch (err) {
      console.error("인기 키워드 조회 에러:", err);
      res.status(500).json({ success: false, message: "인기 키워드 로드 실패" });
    }
  };
  
  // 추천 검색어 
  exports.getRecommendedKeywords = async (req, res) => {
    try {
      const keywords = await postModel.getRecommendedKeywords();
      res.json({ success: true, keywords });
    } catch (err) {
      console.error("추천 키워드 조회 에러:", err);
      res.status(500).json({ success: false, message: "추천 키워드 로드 실패" });
    }
  };