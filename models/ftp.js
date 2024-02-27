// const fs = require('fs');

// class FTPModel {
//   async uploadFile(filePath, fileData) {
//     return new Promise((resolve, reject) => {
//       const fileStream = fs.createWriteStream(filePath);

//       fileData.on('data', (chunk) => {
//         fileStream.write(chunk); // Menulis setiap bagian (chunk) dari data file ke dalam stream
//       });

//       fileData.on('end', () => {
//         fileStream.end(); // Mengakhiri penulisan ke stream setelah semua data file ditulis
//       });

//       fileStream.on('finish', () => {
//         resolve();
//       });

//       fileStream.on('error', (err) => {
//         reject(err);
//       });
//     });
//   }
// }

// module.exports = new FTPModel();  
 

// models/File.js

const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: String,
  originalName: String,
  mimeType: String,
  size: Number,
  uploadDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('File', fileSchema);
