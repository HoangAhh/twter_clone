import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HashTagController } from '../hastags/hashtag.controller';
import { HashTag, HashTagSchema } from '../hastags/hashtag.schema';
import { HashTagService } from '../hastags/hashtag.service';
import { PostController } from './post.controller';
import { Post, PostSchema } from './post.schema';
import { PostService } from './post.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Post.name,
        schema: PostSchema,
      },
      {
        name: HashTag.name,
        schema: HashTagSchema,
      },
    ]),
  ],
  controllers: [PostController, HashTagController],
  // providers: [HashTagService],
  providers: [PostService],
})
export class PostModule {}
