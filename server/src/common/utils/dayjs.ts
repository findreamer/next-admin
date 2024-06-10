import dayjs from 'dayjs';
import isLeapYear from 'dayjs/plugin/isLeapYear'; // 导入插件
import timezone from 'dayjs/plugin/timezone'; // 导入插件
import utc from 'dayjs/plugin/utc'; // 导入插件
import 'dayjs/locale/zh-cn'; // 导入本地化语言

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isLeapYear); // 使用插件
dayjs.locale('zh-cn'); // 使用本地化语言
dayjs.tz.setDefault('Asia/Beijing');

export { dayjs };
