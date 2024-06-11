import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SysPostEntity } from './entities/post.entity';
@Injectable()
export class PostService {
  constructor(
    @InjectRepository(SysPostEntity)
    private readonly sysPostEntityRepository: Repository<SysPostEntity>,
  ) {}
}
