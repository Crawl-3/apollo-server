import { createLogger, format, transports } from "winston";

const logsPath: string =
    process.env.NODE_ENV === "production " ? "logs/production" : "logs/development";

export const Logger = createLogger({
    level: "info",
    format: format.json(),
    transports: [
        new transports.File({ filename: `${logsPath}/error.log`, level: "error" }),
        new transports.File({ filename: `${logsPath}/warn.log`, level: "warn" }),
        new transports.File({ filename: `${logsPath}/combined.log` }),
    ],
});

if (process.env.NODE_ENV !== "production") {
    Logger.add(
        new transports.Console({
            format: format.simple(),
        })
    );
}
