import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { User, UserDocument } from 'src/apis/user/user.schema';
import { UserDto } from 'src/apis/user/dtos/user.dto';
import { UserFilterDto } from 'src/apis/user/dtos/user-filter.dto';
import { removeKeyUndefined, totalPagination } from '../../core/utils/utils';
import { PaginationOptions } from 'src/core/decorators/pagination/pagination.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>, // private userService: UserService ;
  ) {}

  async getAll(filter: UserFilterDto, pagination: PaginationOptions) {
    const { limit, page, skip } = pagination;
    const query: any = {};

    if (filter.email) {
      query.email = { $regex: filter.email, $options: 'i' };
    }

    const countDocument = this.userModel.countDocuments(query);
    const getUser = this.userModel.find(query).skip(skip).limit(limit);

    const [amount, user] = await Promise.all([countDocument, getUser]);

    return {
      totalPage: totalPagination(amount, limit),
      currentPage: page,
      data: user,
    };
  }

  async getById(id: string) {
    const user = await this.userModel.findOne({ _id: id }).lean();
    if (!user) throw new Error(`User with id is ${id} does not exist`);
    return user;
  }

  async updateById(id: string, data: UserDto) {
    const user = await this.userModel.findOne({ _id: id }).lean();
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
    const user = await this.userModel.findOne({ _id: id }).lean();
    if (!user) throw new Error(`User with id is ${id} does not exist`);
    return this.userModel.findByIdAndDelete(id);
  }
}
