import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { RedisService } from '@app/module/redis/redis.service';
import { CacheEnum } from '@app/common/enum';

@Injectable()
export class AuthService extends PassportStrategy(Strategy) {
  /**
   * 这里的构造函数向父类传递了授权是必要的参数，在实例化时，父类会得知授权，客户端的请求头必须包含 Authorization ，
   * 而且这个请求头的内容前缀必须 Bearer 前缀，在解码授权 token 时，使用 secretOrKry： ‘secretKey’ 解密
   * @param config
   * @param redisService
   */
  constructor(
    private readonly config: ConfigService,
    private readonly redisService: RedisService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('jwt.secretkey'),
    });
  }

  /**
   * validate 方法在解密授权令牌成功后，判断授权令牌是否过期
   * 将解密后的 payload 作为参数传递给 validate 方法，这个方法需要做具体的授权逻辑，比如这里我使用了通过用户名查找用户是否存在。
   * 当用户不存在时，说明令牌有误，可能是被伪造了，此时需抛出 UnauthorizedException 未授权异常。
   * 当用户存在时，会将 user 对象添加到 req 中，在之后的 req 对象中，可以使用 req.user 获取当前登录用户。
   * @param payload 解密后
   * @returns
   */
  async validate(payload: { uuid: string; userId: string; iat: Date }) {
    const user = await this.redisService.get(
      `${CacheEnum.LOGIN_TOKEN_KEY}${payload.uuid}`,
    );

    // 如果有用户信息，则代表 token 没有过期，否则则 token 已失效
    if (!user) throw new UnauthorizedException('登陆已过期，请重新登陆');
    return user;
  }
}
