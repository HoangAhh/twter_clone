import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { PaginationOptions } from 'src/core/decorators/pagination/pagination.model';
import { removeKeyUndefined, totalPagination } from 'src/core/utils/utils';
import { EditDto } from './dto/edit.dto';
import { EditFilterDto } from './dto/edit.filter.dto';
import { EditProfile, EditProfileDocument } from './edit.schema';

@Injectable()
export class EditProfileService {
  constructor(
    @InjectModel(EditProfile.name)
    private readonly editProfileModel: Model<EditProfileDocument>, // private readonly PostService: PostService,
  ) {}

  async getAll(pagination: PaginationOptions, filter: EditFilterDto) {}
  async create(data: EditDto): Promise<EditProfile> {
    const post = new this.editProfileModel(data);
    await post.save();
    // await this.hashtagService.create(data);
    return post.toObject({ getters: true });
  }
  async getById(id: string) {
    const editProfile = await this.editProfileModel.findOne({ _id: id }).lean();
    if (!editProfile)
      throw new Error(`editProfile with id is ${id} does not exist`);
    return editProfile;
  }
  async updateById(id: string, data: EditDto) {
    const editProfile = await this.editProfileModel.findOne({ _id: id }).lean();
    if (!editProfile)
      throw new Error(`editProfile with id is ${id} does not exist`);

    const postInstance = plainToInstance(EditProfile, data);

    removeKeyUndefined(postInstance);

    return this.editProfileModel.findByIdAndUpdate(
      { ...editProfile, ...postInstance, updatedAt: new Date() },
      { new: true },
    );
  }

  async deleteById(id: string) {
    const editProfile = await this.editProfileModel.findOne({ _id: id }).lean();
    if (!editProfile)
      throw new Error(`editProfile with id is ${id} does not exist`);
    return this.editProfileModel.findByIdAndDelete(id);
  }
}
