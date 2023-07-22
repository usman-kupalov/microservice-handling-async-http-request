import pino from 'pino';
import fs from 'fs';

const logFile = fs.createWriteStream('./log-file.log', { flags: 'a' });

const logger = pino({
  level: 'info',
  timestamp: pino.stdTimeFunctions.isoTime
}, logFile);

export { logger };
