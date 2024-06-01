import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import * as yml from 'js-yaml';

const configFileNameMap = {
  development: 'dev',
  test: 'test',
  production: 'prod',
};

const env = process.env.NODE_ENV;

console.log('env ==> ', env);

export default () => {
  const envFilePath = join(__dirname, `./${configFileNameMap[env]}.yml`);
  if (existsSync(envFilePath)) {
    return yml.load(readFileSync(envFilePath, 'utf-8')) as Record<string, any>;
  }
  console.error(`配置文件[${envFilePath}]不存在，程序准备退出...`);
  process.exit(0);
};
