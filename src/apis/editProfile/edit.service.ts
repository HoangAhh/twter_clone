import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EditProfile, EditProfileDocument } from './edit.schema';

@Injectable()
export class EditProfileService {
  constructor(
    @InjectModel(EditProfile.name)
    private readonly editProfileModel: Model<EditProfileDocument>,
  ) // private readonly PostService: PostService,
  {}
}
