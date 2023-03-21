import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { removeKeyUndefined } from '../../core/utils/utils';
import { PostDocument, Post } from './post.schema';
import { postDto } from './dtos/post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name)
    private readonly postModel: Model<PostDocument>,
  ) {}

  async getById(id: string) {
    const post = await this.postModel.findById(id).lean();
    if (!post) throw new Error(`Post with id is ${id} does not exist`);
    return post;
  }

  async createPost(data: postDto) {
    const { contents, comment, quantityLikes, postTime } = data;

    const createPost = new this.postModel(data);

    const post = createPost.save();

    return post;
  }

  async updateById(id: string, data: postDto) {
    const post = await this.postModel.findById(id).lean();
    if (!post) throw new Error(`Post with id is ${id} does not exist`);

    const postInstance = plainToInstance(Post, data);

    removeKeyUndefined(postInstance);

    return this.postModel.findByIdAndUpdate(
      { ...post, ...postInstance, updatedAt: new Date() },
      { new: true },
    );
  }

  async deleteById(id: string) {
    const post = await this.postModel.findById(id).lean();
    if (!post) throw new Error(`post with id is ${id} does not exist`);
    return this.postModel.findByIdAndDelete(id);
  }
}
