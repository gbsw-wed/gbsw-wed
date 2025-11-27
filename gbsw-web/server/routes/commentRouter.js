const express = require('express');
const router = express.Router();

const authM = require('../middleware/authMiddleware')
const commentCtr = require('../controller/commentController');



router.post('/:postId', authM ,commentCtr.addComment);

router.delete('/:commentId', authM, commentCtr.deleteComment)

router.get('/count/:postId', commentCtr.getCommentCount);


module.exports = router;


