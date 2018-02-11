var urlMap = [
    {path: "/", action:__dirname + "/static/index.html"},
    {path: "/delete", action: require("./modules/actions").delete},
    {path: "/upload", action: require("./modules/actions").upload},
];

var service = require("./lib/service").http(urlMap);
var port = 8080;
service(port);