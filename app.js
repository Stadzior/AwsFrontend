var urlMap = [
    {path: "/", action:__dirname + "/static/index.html"},
];

var service = require("./lib/service").http(urlMap);
var port = 8080;
service(port);