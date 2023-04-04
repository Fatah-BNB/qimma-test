const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
cloudinary.config({
    cloud_name: 'dbwf4x5ni',
    api_key: '161138694634421',
    api_secret: 'hRPiTBnd_0qeUFVwo9o9AgneU8M',
});
// Configure multer and Cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'users/avatar',
        allowed_formats: ['jpg', 'jpeg', 'png'],
    },
});
const upload = multer({ storage: storage });

module.exports = upload