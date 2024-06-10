import { dayjs } from '.';

export function GetNowDate() {
  return dayjs().format('YYYY-MM-DD HH:mm:ss');
}
