const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/image'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const imageFilter = function (req, file, cb) {

    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Tệp không phải là hình ảnh!'), false);
    }

};

const upload = multer({
    storage: storage
    , fileFilter: imageFilter,
    limits: { fileSize: 2 * 1024 * 1024 }
});

module.exports = upload;
