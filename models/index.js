const dbConfig = require('../config/database.js')
const mongoose = require('mongoose')

module.exports = {
    mongoose,
    url: dbConfig.url,
    user: require('./user.js')(mongoose),
    siswa: require('./siswa.js')(mongoose)
}