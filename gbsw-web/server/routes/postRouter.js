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



router.get('/popular-keywords', postCtr.getPopularKeywords);
router.get('/recommended-keywords', postCtr.getRecommendedKeywords);


router.get('/:id', postCtr.detail);                 
router.get('/:id/like', authM, postCtr.like);


router.get('/', postCtr.list);
router.post('/write', authM, upload.single('file'), postCtr.createPost);
router.put('/:id', authM, postCtr.updatePost);
router.delete('/:id', authM, postCtr.deletePost);

module.exports = router;