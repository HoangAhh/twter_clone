import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
// import { Hash } from 'crypto';
import { Model } from 'mongoose';
import { removeKeyUndefined } from 'src/core/utils/utils';
import { postDto } from '../post/dtos/post.dto';
import { hashTagDto } from './dto/hashtag.dto';
import { HashTag, HashTagDocument } from './hashtag.schema';

@Injectable()
export class HashTagService {
  constructor(
    @InjectModel(HashTag.name)
    private readonly HashTagModel: Model<HashTagDocument>,
  ) {}

  async createHastag(data: hashTagDto) {
    const newHashTag = new this.HashTagModel(data);

    const HashTag = newHashTag.save();

    return HashTag;
  }

  async updateById(id: string, data: hashTagDto) {
    const hashtag = await this.HashTagModel.findById(id).lean();
    if (!hashtag) throw new Error(`HashTag with id is ${id} does not exist`);

    const postInstance = plainToInstance(HashTag, data);

    removeKeyUndefined(postInstance);

    return this.HashTagModel.findByIdAndUpdate(
      { ...hashtag, ...postInstance, updatedAt: new Date() },
      { new: true },
    );
  }

  async deleteById(id: string) {
    const hashtag = await this.HashTagModel.findById(id).lean();
    if (!hashtag) throw new Error(`HashTag with id is ${id} does not exist`);
    return this.HashTagModel.findByIdAndDelete(id);
  }
}
