import winston from 'winston'

const { combine, timestamp, json, printf } = winston.format
const timestampFormat = 'MMM-DD-YYYY HH:mm:ss'

export const apiLogger = winston.createLogger({
  format: combine(
    timestamp({ format: timestampFormat }),
    json(),
    printf(({ timestamp, level, message, ...data }) => {
      const response = {
        level,
        timestamp,
        message,
        data,
      };

      return JSON.stringify(response)
    })
  ),
  transports: [
    new winston.transports.Console(),
    new (winston.transports.File)({ filename: './ApiLogger.log' })
  ],
})