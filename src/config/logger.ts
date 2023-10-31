/* 
Author : Umesh Pawar
Date Created: 30-10-23 
Ticket №: http://jira.sysnik.com/browse/SIM-2
Reviewed by : 
Date Reviewed : 
Objectives : write a logger which can be used to log message on console as well as in file.
*/

import winston from "winston";
import { Config } from ".";
import chalk from "chalk";
import stripAnsi from "strip-ansi";

// Custom format to colorize log messages based on their level
const coloredFormat = winston.format.printf(({ level, message = "" }) => {
    switch (level) {
        // Colorizes error messages in red
        case "error":
            return chalk.red.bold(
                stripAnsi(
                    `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}|[${level.toUpperCase()}]|${message}`,
                ),
            );
        // Colorizes warning messages in yellow
        case "warn":
            return chalk.yellow.bold(
                stripAnsi(
                    `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}|[${level.toUpperCase()}]|${message}`,
                ),
            );
        // Colorizes debug messages in blue
        case "debug":
            return chalk.blue.bold(
                stripAnsi(
                    `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}|[${level.toUpperCase()}]|${message}`,
                ),
            );
        // Colorizes info messages in green
        case "info":
            return chalk.green.bold(
                stripAnsi(
                    `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}|[${level.toUpperCase()}]|${message}`,
                ),
            );
        // Default message for unsupported log levels
        default:
            return stripAnsi(
                `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}|[${level.toUpperCase()}]|${message}`,
            );
    }
});

// Create a logger with provided configuration
const logger = winston.createLogger({
    level: Config.LOG_LEVEL,
    transports: [
        // Writes all logs to 'combined.log' file
        new winston.transports.File({
            dirname: "logs",
            filename: "combined.log",
            level: Config.LOG_LEVEL,
            format: winston.format.combine(
                winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
                winston.format.printf(({ level, message = "" }) => {
                    return stripAnsi(
                        `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}|[${level.toUpperCase()}]|${message}`,
                    );
                }),
            ),
            silent: Config.NODE_ENV === "test",
        }),

        // Writes error logs to 'error.log' file
        new winston.transports.File({
            dirname: "logs",
            filename: "error.log",
            level: "error",
            format: winston.format.combine(
                winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
                winston.format.printf(({ level, message = "" }) => {
                    return stripAnsi(
                        `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}|[${level.toUpperCase()}]|${message}`,
                    );
                }),
            ),
            maxsize: Number(Config.LOG_FILE_SIZE),
            silent: Config.NODE_ENV === "test",
        }),

        // Outputs log messages to console with colors
        new winston.transports.Console({
            level: Config.LOG_LEVEL,
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
                coloredFormat,
            ),
            silent: Config.NODE_ENV === "test",
        }),
    ],
});

// Export the logger for use in other files
export default logger;
