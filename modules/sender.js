module.exports = {
    sendMessage: function (type, data) {
        var utils = require("./utils");

        data.forEach(function (value) {
            var params = {
                DelaySeconds: 10,
                MessageAttributes: {
                    "MessageType": {
                        DataType: "Number",
                        StringValue: type
                    }
                },
                MessageBody: JSON.stringify(value),
                QueueUrl: utils.QueueUrl
            };
            var logger = require('./logger')
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