// routes/post.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const postCtr = require('../controller/postController');   
const auth = require('../middleware/authMiddleware');
// 파일 업로드 설정
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

// 올바른 라우트 매핑 (이전 실수 수정!)
// 이렇게 고쳐!
// 올바른 라우트 매핑
router.get('/popular-posts', postCtr.getPopularPosts);
router.get('/recommended-posts', postCtr.getRecommendedPosts);
router.get('/:id', postCtr.detail);
router.get('/', postCtr.list);
router.get('/:id/like', auth, postCtr.like);
router.post('/write', auth, upload.single('file'), postCtr.createPost);
router.put('/:id', auth, postCtr.updatePost);
router.delete('/:id', auth, postCtr.deletePost);


module.exports = router;