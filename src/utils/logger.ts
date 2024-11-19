import pino from 'pino';

import env from './envalid';

let transport;

if (process.env.NODE_ENV !== 'test') {
  if (env.LOGS_TO_CONSOLE && env.WRITE_LOGS) {
    transport = pino.transport({
      targets: [
        {
          target: 'pino/file',
          options: { destination: `${process.cwd()}/server.log` },
        },
        {
          target: 'pino-pretty',
          options: { translateTime: 'SYS:standard' },
        },
      ],
    });
  } else if (env.WRITE_LOGS) {
    transport = pino.transport({
      targets: [
        {
          target: 'pino/file',
          options: { destination: `${process.cwd()}/server.log` },
        },
      ],
    });
  } else if (env.LOGS_TO_CONSOLE) {
    transport = pino.transport({
      targets: [
        {
          target: 'pino-pretty',
          options: { translateTime: 'SYS:standard' },
        },
      ],
    });
  }
}

const logger = pino(
  {
    level: process.env.NODE_ENV === 'test' ? 'silent' : 'info',
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  transport,
);

export default logger;
