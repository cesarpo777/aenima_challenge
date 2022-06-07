const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../uploads/img'),
    filename: (req, file, cb, filename) => {
        cb(null, uuidv4() + path.extname(file.originalname));
    }
})

//multer({storage}).single('image'))
const upload = multer({storage})


module.exports = {
    upload
}