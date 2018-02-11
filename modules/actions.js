module.exports = {
    upload (request, callback) {
        var logger = require('./logger');
        var path = require('path');
        var formidable = require('formidable');
        var utils = require("./utils");
        var form = new formidable.IncomingForm();
        var fileName;
        form.multiples = true;
        form.uploadDir = path.join(__dirname, utils.UPLOAD_DIR);
        form.on('file', function (field, file) {
            var fs = require('fs');
            fileName = utils.generateNewGuid();
            fs.rename(file.path, path.join(form.uploadDir, fileName));
        });
        form.on('end', function () {
            var jimp = require("jimp");
            jimp.read(path.join(__dirname, utils.UPLOAD_DIR, fileName), function (err, image) {
                if (err) {
                    logger.log(err);
                }
                image.getBuffer(image.getMIME(), (err, buffer) => {  
                    var aws = require('aws-sdk');                
                    aws.config.loadFromPath('./config.json');
                    var storage = new aws.S3({ params: { Bucket: utils.BucketName } });
                    var data = { Key: fileName, Body: buffer };
                    storage.putObject(data, function (err, data) {
                        if (err)
                            logger.log(err);
                        fs.unlink(__dirname + utils.UPLOAD_DIR + "/" + fileName);
                    });
    
                });
            });
        });
        form.parse(request);   
    },

    delete (request, callback) {
        var logger = require('./logger');
        var aws = require('aws-sdk');  
        aws.config.loadFromPath('./config.json');
        var storage = new aws.S3({ params: { Bucket: utils.BucketName } });
        var utils = require('./utils');

        request.body['photos'].forEach(function(value) {
            var params = {  Bucket: utils.BucketName, Key: value };
            storage.deleteObject(params, function(err, data) {
                if (err)
                    logger.log(err);
            });
        });    
    }
}