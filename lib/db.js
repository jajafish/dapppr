var username = "johnnyJones";
var password = "pingpong1";
var addresss = "@ds063449.mongolab.com:63449/dapppr";
connect();

function connect() {
    var url = 'mongodb://' +username+ ":" + password + addresss;
}
