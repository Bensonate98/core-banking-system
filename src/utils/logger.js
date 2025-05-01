import { createLogger, format, transports } from "winston";
import { nodeEnvironment } from "../config/config.js";

const logger = createLogger({
  level: "info",
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    new transports.File({ filename: "logs/app.log" })
  ]
});

if (nodeEnvironment !== 'production') {
  logger.add(new transports.Console());
}

export default logger;
