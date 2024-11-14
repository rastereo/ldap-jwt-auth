import { existsSync, readFileSync, writeFileSync } from 'fs';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { join } from 'path';

import { EnvConfig } from '../types';

dotenv.config();

const envPath = join(process.cwd(), '.env');

const randomKey: string = crypto.randomBytes(32).toString('hex');

let envConfig: EnvConfig = {};

if (existsSync(envPath)) {
  envConfig = dotenv.parse(readFileSync(envPath));
}

envConfig.JWT_SECRET = randomKey;

const envContent = Object
  .keys(envConfig)
  .map((key) => {
    return `${key}='${envConfig[key]}'`;
  })
  .join('\n');

writeFileSync('.env', envContent);

console.log('New random secret key generated and saved in .env file');
