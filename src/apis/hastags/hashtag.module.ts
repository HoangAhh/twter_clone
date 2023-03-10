import { Module, Post } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HashTagController } from './hashtag.controller';
import { HashTagService } from './hashtag.service';
import { HashTag, HashTagSchema } from './hashtag.schema';
import { postDto } from '../post/dtos/post.dto';
import { PostController } from '../post/post.controller';
import { PostSchema } from '../post/post.schema';
import { PostService } from '../post/post.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: HashTag.name,
        schema: HashTagSchema,
      },
      {
        name: Post.name,
        schema: PostSchema,
      },
    ]),
  ],
  controllers: [HashTagController, PostController],
  providers: [HashTagService, PostService],
})
export class HasTagModule {}
