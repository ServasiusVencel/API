
// const ftpModel = require('../models/ftp');

// class FTPController {
//   async uploadFile(req, res) {
//     try {
//       const filePath = `uploads/${req.headers['ftp']}`;
//       await ftpModel.uploadFile(filePath, req);

//       res.status(200).json({ status: true, code: 200, message: "File uploaded successfully" });
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       res.status(500).json({ status: false, code: 500, message: "Internal Server Error" });
//     }
//   }
// }

//   module.exports = new FTPController();

  

// const FtpModel = require('../models/ftp');

// class FtpController {
//     async uploadFile(req, res) {
//         const { localFilePath, remoteFilePath, ftpConfig } = req.body;

//         const ftpModel = new FtpModel();
//         try {
//             await ftpModel.connect(ftpConfig);
//             await ftpModel.upload(localFilePath, remoteFilePath);
//             ftpModel.disconnect();
//             res.status(200).send('File uploaded successfully');
//         } catch (error) {
//             res.status(500).send('Error uploading file: ' + error.message);
//         }
//     }
// }

// module.exports = new FtpController();

// controllers/fileController.js

const File = require('../models/ftp');

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No files were uploaded.');
    }

    const { filename, originalname, mimetype, size } = req.file;

    const file = new File({
      filename,
      originalName: originalname,
      mimeType: mimetype,
      size
    });

    await file.save();

    res.send('File uploaded successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};
