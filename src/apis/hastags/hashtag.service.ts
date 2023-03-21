import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
// import { Hash } from 'crypto';
import { Model } from 'mongoose';
import { removeKeyUndefined } from 'src/core/utils/utils';
// import { postDto } from '../post/dtos/post.dto';
import { Post, PostDocument } from '../post/post.schema';
// import { PostService } from '../post/post.service';
import { hashTagDto } from './dto/hashtag.dto';
import { HashTag, HashTagDocument } from './hashtag.schema';

@Injectable()
export class HashTagService {
  constructor(
    @InjectModel(HashTag.name)
    private readonly HashTagModel: Model<HashTagDocument>,
    @InjectModel(Post.name)
    private readonly postModel: Model<PostDocument>, // private readonly PostService: PostService,
  ) {}

  async getHashtags() {
    const result = await this.postModel.aggregate([
      { $unwind: '$hashtags' },
      { $group: { _id: '$hashtags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    return result.map((r) => ({ name: r._id, count: r.count }));
  }
  async extractHashtags(postId: string) {
    const post = await this.postModel.findById(postId).exec();
    if (!post) {
      throw new Error('Post not found');
    }

    const regex = /#[\w-]+/g;
    const hashtags = post.status.match(regex);
    if (!hashtags) {
      return;
    }

    for (const hashtag of hashtags) {
      const existingHashtag = await this.HashTagModel.findOne({
        hashtag: hashtag.toLowerCase(),
      });
      if (existingHashtag) {
        // existingHashtag..push(post);
        await existingHashtag.save();
      } else {
        const newHashtag = new this.HashTagModel({
          hashtag: hashtag.toLowerCase(),
          posts: [post],
        });
        await newHashtag.save();
      }
    }
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
