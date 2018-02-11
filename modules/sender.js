module.exports = {
    sendMessage: function (type, data) {
        var utils = require("./utils");
        var logger = require('./logger')
        logger.log("message sent with type=\""+type+"\"");
        data.forEach(function (value) {
            var params = {
                DelaySeconds: 10,
                MessageAttributes: {
                    "Type": {
                        DataType: "Number",
                        StringValue: type
                    }
                },
                MessageBody: JSON.stringify(value),
                QueueUrl: utils.QueueUrl
            };
            var aws = require('aws-sdk');
            aws.config.loadFromPath('./config.json');
            var sqs = new aws.SQS({apiVersion: utils.API_VERSION});
    
            sqs.sendMessage(params, function (err, data) {
                if (err)
                    logger.log(err);
            });   
        });
    },
}