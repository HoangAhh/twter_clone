import { Module } from '@nestjs/common';
// import { EditProfileModule } from 'src/apis/user/user.module';
import { AuthModule } from 'src/apis/auth/auth.module';
import { PostModule } from './post/post.module';
import { CommentModule } from './comments/comment.module';
import { UpLoadModule } from './upLoad/upLoad.module';
// import { SearchModule } from './search/search.module';
import { HasTagModule } from './hastags/hashtag.module';
import { UserModule } from './user/user.module';
import { EditProfileModule } from './editProfile/edit.module';
import { SearchModule } from './search/search.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PostModule,
    CommentModule,
    UpLoadModule,
    HasTagModule,
    EditProfileModule,
    SearchModule,
  ],
  controllers: [],
  exports: [],
})
export class ApisModule {}
