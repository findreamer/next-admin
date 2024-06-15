import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SysPostEntity } from './entities/post.entity';
import { CreatePostDto, ListPostDto } from './dto';
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

  async findAll(query: ListPostDto) {
    const entity = this.sysPostEntityRepository.createQueryBuilder('entity');
    entity.where('entity.delFlag = :delFlag', { delFlag: '0' });

    if (query.postName) {
      entity.andWhere(`entity.postName LIKE "%${query.postName}%"`);
    }

    if (query.postCode) {
      entity.andWhere(`entity.postCode LIKE "%${query.postCode}%"`);
    }

    if (query.status) {
      entity.andWhere(`entity.status = :status`, { status: query.status });
    }

    entity.skip(query.pageSize * (query.pageNum - 1)).take(query.pageSize);
    const [list, total] = await entity.getManyAndCount();
    return ResultData.success({
      list,
      total,
      pageSize: query.pageSize,
      pageNum: query.pageNum,
    });
  }

  async findeOne(id: number) {
    const res = await this.sysPostEntityRepository.findOne({
      where: { postId: id, delFlag: '0' },
      select: [
        'createBy',
        'createTime',
        'postCode',
        'postId',
        'postName',
        'remark',
        'updateBy',
        'updateTime',
      ],
    });

    return ResultData.success(res);
  }
}
