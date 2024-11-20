import pino from 'pino';

import env from './envalid';

let transport;
let accessTransport;

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

    accessTransport = pino.transport({
      targets: [
        {
          target: 'pino/file',
          options: { destination: `${process.cwd()}/access.log` },
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

    accessTransport = pino.transport({
      targets: [
        {
          target: 'pino/file',
          options: { destination: `${process.cwd()}/access.log` },
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

export const accessLogger = pino(
  {
    level: 'info',
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  accessTransport,
);

export const logger = pino(
  {
    level: process.env.NODE_ENV === 'test' ? 'silent' : 'info',
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  transport,
);