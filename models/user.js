module.exports = mongoose => {
    const schema = mongoose.Schema(
        {
            username: String,
            password: String,
        },{
            timestamp: true,
        }
    );
  

    return mongoose.model("user", schema);
}