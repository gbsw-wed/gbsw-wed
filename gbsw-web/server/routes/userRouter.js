const express = require('express');
const router = express.Router();
const userCtr = require('../controller/userController');
const upload = require('../middleware/upload');

function auth(req, res, next) {
  if (req.session.user) return next();
  return res.status(401).json({ message: '로그인 필요' });
}

router.post('/signup', userCtr.register);
router.post('/login', userCtr.login);
router.get('/logout', auth, userCtr.logout);
router.get('/me', userCtr.check);

router.put('/changeUsername', auth, userCtr.updateUsername);
router.put('/changePassword', auth, userCtr.updatePassword);
router.post('/updateProfileImage', auth, upload.single('profile_img'), userCtr.updateProfileImage);
router.delete('/deleteAccount', auth, userCtr.deleteAccount);

module.exports = router;
