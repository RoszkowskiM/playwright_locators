import pino from "pino";
import path from "path";
import fs from "fs";

const logsDir = path.join(__dirname, "../logs");

//creating "logs" folder if it doesn't exist
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

function formatDate(date: Date): string {
  return date.toISOString().replace(/:/g, "-").replace(/\./g, "-");
}

//transport - zapis logów do pliku
const transport = {
  target: "./transport.mjs",
  options: {
    destination: path.join(logsDir, `logger-${formatDate(new Date())}.log`), // Log file path
  },
};

// https://getpino.io/#/docs/api?id=formatters-object
const formatters = {
  bindings(bindings: any) {
    // Example of custom bindings
    return {};
    // return { pid: bindings.pid, hostname: bindings.hostname };
  },
  level: (label: string) => {
    return { level: label.toUpperCase() };
  },
};

function initLogger(): pino.Logger {
  return pino({
    transport,
    formatters,
    timestamp: pino.stdTimeFunctions.isoTime,
    level: "trace",
  });
}

function removeOldLogsOlderThan(days: number, hours: number = 0): void {
  const files = fs.readdirSync(logsDir);
  const now = new Date();

  //bieżąca data cofnięta o zadaną liczbę dni i godzin
  const threshold = new Date(
    now.getTime() - days * 24 * 60 * 60 * 1000 - hours * 60 * 60 * 1000,
  );

  let removedFilesCount = 0;

  files.forEach((file) => {
    const filePath = path.join(logsDir, file);
    // https://www.geeksforgeeks.org/node-js-fs-statsync-method/
    // https://nodejs.org/api/fs.html#fsfstatsyncfd-options
    const stats = fs.statSync(filePath);
    if (stats.mtime < threshold && file.endsWith(".log")) {
      // Remove the file if it is older than the threshold and has a .log extension
      fs.unlinkSync(filePath);
      console.log(`Removed old log file: ${file}`);
      removedFilesCount++;
    }
  });
  console.log(`Total removed log files: ${removedFilesCount}`);
}
removeOldLogsOlderThan(0, 1); // Remove logs older than 1 hour

let loggerInstance: pino.Logger;

const getLogger = () => {
  if (!loggerInstance) {
    loggerInstance = initLogger();
  }
  return loggerInstance;
};

// const logger = initLogger();

export { getLogger };
