import { Module } from '@nestjs/common';
import { UserModule } from 'src/apis/user/user.module';
import { AuthModule } from 'src/apis/auth/auth.module';
import { PostModule } from './post/post.module';
@Module({
  imports: [AuthModule, UserModule, PostModule],
  controllers: [],
  exports: [],
})
export class ApisModule {}
