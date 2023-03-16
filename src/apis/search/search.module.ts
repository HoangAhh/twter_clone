import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HashTagController } from '../hastags/hashtag.controller';
import { HashTag, HashTagSchema } from '../hastags/hashtag.schema';
import { HashTagService } from '../hastags/hashtag.service';
import { PostController } from '../post/post.controller';
import { Post, PostSchema } from '../post/post.schema';
import { PostService } from '../post/post.service';
import { UserController } from '../user/user.controller';
import { User, UserSchema } from '../user/user.schema';
import { UserService } from '../user/user.service';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

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
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [SearchController],
  providers: [SearchService, PostService, HashTagService, UserService],
})
export class SearchModule {}
