const winston = require('winston');
const CloudWatchTransport = require('winston-aws-cloudwatch');

const NODE_ENV = process.env.NODE_ENV || 'development';

// eslint-disable-next-line new-cap
const logger = new winston.createLogger({
  transports: [
    new (winston.transports.Console)({
      timestamp: true,
      colorize: true,
    })
  ]
});

if (NODE_ENV !== 'development') {
  logger.add(new CloudWatchTransport({
    logGroupName: 'sdc-homes-node',
    logStreamName: 'test',
    createLogGroup: false,
    createLogStream: true,
    awsConfig: {
      accessKeyId: process.env.CLOUDWATCH_ACCESS_KEY_ID,
      secretAccessKey: process.env.CLOUDWATCH_SECRET_ACCESS_KEY,
      region: process.env.CLOUDWATCH_REGION
    },
    formatLog: item => `${item.level}: ${item.message} ${JSON.stringify(item.meta)}`
  }));
}

logger.level = process.env.LOG_LEVEL || 'silly';

logger.stream = {
  write: (message) => {
    logger.info(message);
  }
};

module.exports = logger;
