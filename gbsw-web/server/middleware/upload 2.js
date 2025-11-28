const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 업로드 폴더 경로 설정 (프로필)
const uploadDir = path.join(__dirname, '..', 'uploads', 'profile');

// 폴더 없으면 자동 생성
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, uniqueSuffix + ext);
    }
});

// 이미지 파일만 허용
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    cb(null, extname && mimetype);
};

module.exports = multer({ storage, fileFilter, limits: { fileSize: 5*1024*1024 } });
