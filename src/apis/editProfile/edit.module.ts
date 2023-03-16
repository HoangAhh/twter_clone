import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HashTag } from '../hastags/hashtag.schema';
import { EditProfileController } from './edit.controller';
import { EditProfile, EditProfileSchema } from './edit.schema';
import { EditProfileService } from './edit.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: EditProfile.name,
        schema: EditProfileSchema,
      },
    ]),
  ],
  controllers: [EditProfileController],
  providers: [EditProfileService],
})
export class EditProfileModule {}
