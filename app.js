var urlMap = [
    {path: "/", action:__dirname + "/static/index.html"},
    {path: "/delete", action: require("./modules/actions").delete},
    {path: "/upload", action: require("./modules/actions").upload},
    {path: "/get_pictures", action: require("./modules/actions").getPictures},
    {path: "/invert", action: require("./modules/actions").invert},
    {path: "/greyscale", action: require("./modules/actions").greyscale},
    {path: "/sepia", action: require("./modules/actions").sepia},
];

var service = require("./lib/service").http(urlMap);
var port = 8080;
service(port);