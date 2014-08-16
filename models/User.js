module.exports = function (mongoose) {

    var Schema = mongoose.Schema;
    var UserSchema = new Schema ({
        name: String,
        userID: String,
        avatar_url: String,
        rawArtwork: [],
        products: []
    });
    mongoose.model("User", UserSchema);

};