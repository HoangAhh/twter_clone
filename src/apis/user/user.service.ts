import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { User, UserDocument } from 'src/apis/user/user.schema';
import { UserDto } from 'src/apis/user/dtos/user.dto';
import { UserFilterDto } from 'src/apis/user/dtos/user-filter.dto';
import { removeKeyUndefined } from '../../core/utils/utils';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async getAll(filter: UserFilterDto) {}

  async getById(id: string) {
    const user = await this.userModel.findById(id).lean();
    if (!user) throw new Error(`User with id is ${id} does not exist`);
    return user;
  }

  async create(data: UserDto) {
    const userInstance = plainToInstance(User, data);
    const newUser = new this.userModel(userInstance);
    return newUser.save();
  }

  async updateById(id: string, data: UserDto) {
    const user = await this.userModel.findById(id).lean();
    if (!user) throw new Error(`User with id is ${id} does not exist`);

    const userInstance = plainToInstance(User, data);

    removeKeyUndefined(userInstance);

    return this.userModel.findByIdAndUpdate(
      id,
      { ...user, ...userInstance, updatedAt: new Date() },
      { new: true },
    );
  }

  async deleteById(id: string) {
    const user = await this.userModel.findById(id).lean();
    if (!user) throw new Error(`User with id is ${id} does not exist`);
    return this.userModel.findByIdAndDelete(id);
  }
}
