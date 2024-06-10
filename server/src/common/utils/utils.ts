import { dayjs } from '.';
import { v4 as uuidv4 } from 'uuid';
import { uniq } from 'lodash-es';

export function GetNowDate() {
  return dayjs().format('YYYY-MM-DD HH:mm:ss');
}

/**
 * 生成唯一id
 * UUID
 * @returns
 */
export function GenerateUUID(): string {
  const uuid = uuidv4();
  return uuid.replaceAll('-', '');
}

/**
 * 数组去重
 * @param list
 * @returns
 */
export function Uniq(list: Array<number | string>) {
  return uniq(list);
}
