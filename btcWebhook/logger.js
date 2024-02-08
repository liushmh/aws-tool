const winston = require('winston');

const logger = winston.createLogger({
  level: 'info', // Log only if info level or higher
  format: winston.format.json(), // Output format
  transports: [
    //
    // - Write all logs with level `info` and below to `combined.log`
    // - Write all logs with level `error` and below to `error.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// If we're not in production, log to the console as well
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

module.exports = logger;
