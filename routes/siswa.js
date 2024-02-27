module.exports = app => {
    const siswa = require('../controllers/siswa.js')
    const router = require('express').Router();
    const  authenticateToken  = require('../middleware/index.js')

    router.get('/', authenticateToken, siswa.findAll);
    router.get('/:id',authenticateToken, siswa.show);
    router.post('/',authenticateToken, siswa.create);
    router.put('/:id',authenticateToken, siswa.update);
    router.delete('/:id',authenticateToken, siswa.delete);

    app.use('/siswa', router);
}