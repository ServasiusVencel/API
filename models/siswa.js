module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            nama_lengkap: String,
            jenis_kelamin: String,
            alamat: String,
            umur: Number,
        },{
            timestamp: true,
        }
    );
  

    return mongoose.model("siswa", schema);
}