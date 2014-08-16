module.exports = function (mongoose) {

    var Schema = mongoose.Schema;
    var UserSchema = new Schema ({
        name: String,
        userID: String,
        rawArtwork: [],
        products: []
    });
    mongoose.model("User", UserSchema);

};