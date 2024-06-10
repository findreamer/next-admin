import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import iconv from 'iconv-lite';

@Injectable()
export class AxiosService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * 获取ip信息
   * @param ip
   * @returns
   */
  async getIpAddress(ip: string) {
    const IP_URL = 'https://whois.pconline.com.cn/ipJson.jsp';
    try {
      const response = await this.httpService.axiosRef(
        `${IP_URL}?ip=${ip}&json=true`,
        {
          responseType: 'arraybuffer',
          transformResponse: [
            function (data) {
              const str = iconv.decode(data, 'gbk');
              return JSON.parse(str);
            },
          ],
        },
      );
    } catch (error) {
      return '未知';
    }
  }
}
