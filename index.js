const express = require('express')
const app = express()
const port = 3000
const db = require("./models")//langsung mencari dimana file indexnya
const cors = require('cors')
const bodyParser = require('body-parser');
const ftp = require('ftp');
const ftpRoutes = require('./routes/ftp');
const axios = require('axios')


// const corsOption = {
//     origin: "*"
// }

//register cors middleware
app.use(cors())

app.use(express.json())

//koneksi database

const mongooseConfig = {
    useNewUrlParser : true,
    useUnifiedTopology : true,
}


db.mongoose.connect(db.url, mongooseConfig)
.then(() => console.log('database connected'))
.catch(err => {
    console.log(`gagal koneksi database ${err.message}`)
        process.exit()
    })

//panggil routing
require('./routes/user.js')(app);
require('./routes/siswa.js')(app);
app.use(bodyParser.raw({ type: 'application/octet-stream' }));
app.use('/ftp', ftpRoutes);

app.listen(port, () => {
    console.log(`server berjalan di http://localhost:${port}`)
})