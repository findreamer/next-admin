import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { SysPostEntity } from './entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SysPostEntity])],
  controllers: [PostController],
  providers: [PostService],
  exports: [],
})
export class PostModule {}
