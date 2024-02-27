const db = require("../models")
const siswa = db.siswa


exports.create = (req, res) => {
    siswa.create(req.body)
        .then(() => res.status(201).send({ status: true, code: 201, message: "Data berhasil disimpan" }))
        .catch(err => res.status(500).send({ status: false, code: 500, message: err.message }));
}

exports.findAll = (req, res) => {
    siswa.find()
        .then(data => res.send({ status: true, code: 200, data: data }))
        .catch(err => res.status(500).send({ status: false, code: 500, message: err.message }));
}

exports.show = (req, res) => {
    const id = req.params.id

    siswa.findById(id)
    .then(data => res.send({ status: true, code: 200, data: data }))
    .catch(err => res.status(500).send({ status: false, code: 500, message: err.message }));
}

exports.update = (req, res) => {
    
    const id = req.params.id;

    siswa.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({ status: false, code: 404, message: "Tidak bisa mengubah data" });
            } else {
                res.send({ status: true, code: 200, message: "Data berhasil diupdate" });
            }
        })
        .catch(err => res.status(500).send({ status: false, code: 500, message: err.message }));
}

exports.delete = (req, res) => {
    const id = req.params.id

    siswa.findByIdAndDelete({_id: id})
    .then(data => {
        if(!data){
            res.status(404).send({ status: false, code: 404,message: "tidak bisa menghapus data"})
        }
        res.send({status: true, code:200,message: "data berhasil di hapus!"})
    })
    .catch(err => res.status(500).send({message: err.message}))
}