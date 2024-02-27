// const express = require('express');
// const router = express.Router();
// const ftpController = require('../controllers/ftp');

// router.post('/upload', ftpController.uploadFile);

// module.exports = router;


// routes/fileRoutes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const ftpController = require('../controllers/ftp');

// Set up multer storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({ storage: storage });

// POST /upload route
router.post('/upload', upload.single('file'), ftpController.uploadFile);

module.exports = router;    
