import { dayjs } from '.';
import { v4 as uuidv4 } from 'uuid';
import * as Lodash from 'lodash';

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
  return Lodash.uniq(list);
}

/**
 * 数组转树结构
 * @param arr
 * @param getId
 * @param getLabel
 * @returns
 */
export function ListToTree(arr: Array<any>, getId, getLabel) {
  /** 以 id 作 key 的对象，临时存储数据 */
  const kData = {};
  /** 最终数据 arr */
  const lData = [];

  arr.forEach((m) => {
    m = {
      id: getId(m),
      label: getLabel(m),
      parentId: +m.parentId,
    };

    kData[m.id] = {
      ...m,
    };

    if (m.parentId == 0) {
      lData.push(kData[m.id]);
    } else {
      kData[m.parentId] = kData[m.parentId] || {};
      kData[m.parentId].children = kData[m.parentId].children || [];
      kData[m.parentId].children.push(kData[m.id]);
    }
  });

  return lData;
}
