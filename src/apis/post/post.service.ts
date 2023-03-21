import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { removeKeyUndefined, totalPagination } from '../../core/utils/utils';
import { PostDocument, Post } from './post.schema';
import { postDto } from './dtos/post.dto';
import { HashTagService } from '../hastags/hashtag.service';

import { PostFilterDto } from './dtos/post.filter.dto';
import { PaginationOptions } from 'src/core/decorators/pagination/pagination.model';
import { HashTag } from '../hastags/hashtag.schema';
import { HasTagModule } from '../hastags/hashtag.module';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name)
    private readonly postModel: Model<PostDocument>,
    @InjectModel(HashTag.name)
    private readonly hashtagModel: HasTagModule,
  ) {}

  async getAll(pagination: PaginationOptions, filter: PostFilterDto) {
    const { limit, page, skip } = pagination;
    const query: any = {};

    if (filter.q) {
      query.topic = { $regex: filter.q, $options: 'i' };
      // query._id = { $regex: filter.q, $options: 'i' };
    }

    const countDocument = this.postModel.countDocuments(query);
    const getPost = this.postModel.find(query).skip(skip).limit(limit);

    const [amount, posts] = await Promise.all([countDocument, getPost]);

    return {
      totalPage: totalPagination(amount, limit),
      currentPage: page,
      data: posts,
    };
  }

  async getById(id: string) {
    const posts = await this.postModel.findOne({ _id: id }).lean();
    if (!posts) throw new Error(`Post with id is ${id} does not exist`);
    return posts;
  }
  async createPost(content: postDto): Promise<Post> {
    const hashtags = this.extractHashtags(content.status);
    const post = new this.postModel({ content, hashtags });

    for (const tag of hashtags) {
      const existingHashtag = await this.hashtagModel.findById(
        { name: tag },
        { $inc: { count: 1 } },
      );

      if (!existingHashtag) {
        const newHashtag = new this.hashtagModel.findById({
          name: tag,
          count: 1,
        });
        await newHashtag.save();
      }
    }

    return post.save();
  }

  private extractHashtags(status: string): string[] {
    const regex = /#\w+/g;
    return status.match(regex) || [];
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find().populate('hashtags').exec();
  }

  async updateById(id: string, data: postDto) {
    const post = await this.postModel.findById({ _id: id }).lean();
    if (!post) throw new Error(`Post with id is ${id} does not exist`);

    const postInstance = plainToInstance(Post, data);

    removeKeyUndefined(postInstance);

    return this.postModel.findByIdAndUpdate(
      { ...post, ...postInstance, updatedAt: new Date() },
      { new: true },
    );
  }

  async deleteById(id: string) {
    const post = await this.postModel.findOne({ _id: id }).lean();
    if (!post) throw new Error(`post with id is ${id} does not exist`);
    return this.postModel.findByIdAndDelete(id);
  }
}
