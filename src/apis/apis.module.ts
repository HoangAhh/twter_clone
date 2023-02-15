import { Module } from '@nestjs/common';
import { UserModule } from 'src/apis/user/user.module';
import { AuthModule } from 'src/apis/auth/auth.module';
@Module({ imports: [AuthModule, UserModule], controllers: [], exports: [] })
export class ApisModule {}
