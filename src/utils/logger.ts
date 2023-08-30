import winston from 'winston';

const transports = {
    console: new winston.transports.Stream({
      stream: process.stdout,
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss' }),
        winston.format.json(),
      ),
    }),
};
  

const logger = winston.createLogger({
    level: 'debug',
    transports: [transports.console],
    defaultMeta: {
      appName: process.env.APP_NAME,
      version: process.env.VERSION || 'DEV',
    },
});

transports.console.format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss' }),
    winston.format.colorize({ all: true }),
    winston.format.simple(),
);

export default logger;