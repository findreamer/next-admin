import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SysPostEntity } from './entities/post.entity';
import { CreatePostDto } from './dto';
import { ResultData } from '@app/common/utils';
@Injectable()
export class PostService {
  constructor(
    @InjectRepository(SysPostEntity)
    private readonly sysPostEntityRepository: Repository<SysPostEntity>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const res = await this.sysPostEntityRepository.save(createPostDto);
    return ResultData.success(res);
  }
}
