// routes/post.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const postCtr = require('../controller/postController');
const authM = require('../middleware/authMiddleware');

// 파일 업로드 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// 올바른 라우트 매핑 (이전 실수 수정!)
router.get('/popular-posts', postCtr.getPopularPosts);         // 인기 게시글
router.get('/recommended-posts', postCtr.getRecommendedPosts); // 추천 게시글

router.get('/:id', postCtr.detail);
router.get('/:id/like', authM, postCtr.like);
router.get('/', postCtr.list);
router.post('/write', authM, upload.single('file'), postCtr.createPost);
router.put('/:id', authM, postCtr.updatePost);
router.delete('/:id', authM, postCtr.deletePost);

module.exports = router;