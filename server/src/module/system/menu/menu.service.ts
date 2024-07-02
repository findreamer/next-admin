import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SysMenuEntity } from './entities/menu.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateMenuDto, ListMenuDto } from './dto';
import { ListToTree, ResultData } from '@app/common/utils';
import { SysRoleWithMenuEntity } from '../role/entities/role-width-menu.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(SysMenuEntity)
    private readonly sysMenuEntityRep: Repository<SysMenuEntity>,
    @InjectRepository(SysRoleWithMenuEntity)
    private readonly sysRoleWithMenuEntityRep: Repository<SysRoleWithMenuEntity>,
  ) {}

  async create(createMenuDto: CreateMenuDto) {
    const res = await this.sysMenuEntityRep.save(createMenuDto);
    return ResultData.success(res);
  }

  findMany(where: FindManyOptions<SysMenuEntity>) {
    return this.sysMenuEntityRep.find(where);
  }

  async findAll(query: ListMenuDto) {
    const entity = this.sysMenuEntityRep.createQueryBuilder('entity');
    entity.where(`entity.delFlag = :delFlag`, { delFlag: '0' });

    if (query.menuName) {
      entity.andWhere(`entity.menuName LIKE :menuName`, {
        menuName: `%${query.menuName}%`,
      });
    }

    if (query.status) {
      entity.andWhere(`entity.status = :status`, { status: query.status });
    }
    const res = await entity.getMany();
    return ResultData.success(res);
  }

  async treeSelect() {
    const res = await this.sysMenuEntityRep.find({
      where: {
        delFlag: '0',
      },
    });
    const tree = ListToTree(
      res,
      (m) => m.menuId,
      (m) => m.menuName,
    );
    return ResultData.success(tree);
  }

  async roleMenuTreeselect(roleId: number) {
    const list = await this.sysMenuEntityRep.find({
      where: {
        delFlag: '0',
      },
    });
    const tree = ListToTree(
      list,
      (m) => m.menuId,
      (m) => m.menuName,
    );

    const menuIds = await this.sysRoleWithMenuEntityRep.find({
      where: {
        roleId,
      },
      select: ['menuId'],
    });
    const checkedKeys = menuIds.map((item) => item.menuId);
    return ResultData.success({
      tree,
      checkedKeys,
    });
  }

  async findOne(id: number) {
    const res = await this.sysMenuEntityRep.findOne({
      where: {
        menuId: id,
      },
    });
    return ResultData.success(res);
  }
}
