import { SetMetadata } from '@nestjs/common';
export const ALLOW_ANON = 'allowAnon';

/**
 * 允许部分接口不校验 token
 */

export const AllowAnon = () => SetMetadata(ALLOW_ANON, true);
