import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { plainToInstance } from 'class-transformer';
import { removeKeyUndefined, totalPagination } from '../../core/utils/utils';
import { PostDocument, Post } from './post.schema';
import { postDto } from './dtos/post.dto';
import { HashTagService } from '../hastags/hashtag.service';
// import { has } from 'lodash';
// import { CmsAuth } from 'src/core/auth/decorators/auth/cms-auth.decorators';
import { PostFilterDto } from './dtos/post.filter.dto';
import { PaginationOptions } from 'src/core/decorators/pagination/pagination.model';
import { HashTag } from '../hastags/hashtag.schema';
import { HasTagModule } from '../hastags/hashtag.module';
// import { PostController } from './post.controller';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name)
    private readonly postModel: Model<PostDocument>,
    @InjectModel(HashTag.name)
    private readonly hashtagService: HashTagService, // private readonly hashtagModel: HasTagModule,
  ) {}

  async getAll(pagination: PaginationOptions, filter: PostFilterDto) {
    // console.log('aâ');

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

  // async createPost(data: postDto) {
  //   const hashTag = await this.hashtagService.createHastag(data.hashtag);

  //   const newPost = new this.postModel(data);

  //   const posts = newPost.save();

  //   return posts;

  //   // lấy riêng phần hashtag ra khỏi posts

  //   // const posts = newPost.save();

  //   // return posts;

  async createPost(data: postDto): Promise<Post> {
    const post = new this.postModel(data);
    await post.save();
    // await this.hashtagService.create(data);
    return post.toObject({ getters: true });
  }
  // }

  // async findByHashtag(hashtag: string): Promise<Post[]> {
  //   return this.postModel.find({ hashtag: { $in: [hashtag] } }).exec();
  // }

  // async createHashtag(data: Post): Promise<Post> {
  //   // Phân tích nội dung bài post để lấy các hashtag
  //   const hashtags = data..match(/#\w+/g);
  //   if (hashtags) {
  //     // Duyệt qua danh sách hashtag và cập nhật hoặc thêm mới vào cơ sở dữ liệu
  //     for (const hashtag of hashtags) {
  //       const name = hashtag.slice(1); // bỏ dấu # ở đầu hashtag
  //       let hashtagDoc = await this.hashtagModel.findOne({ name });
  //       if (!hashtagDoc) {
  //         hashtagDoc = new this.hashtagModel({ name, count: 1 });
  //       } else {
  //         hashtagDoc.count++;
  //       }
  //       await hashtagDoc.save();
  //     }
  //     // Lưu danh sách các hashtag vào bài post
  //     data.hashtags = hashtags;
  //   }
  //   // Lưu bài post vào cơ sở dữ liệu
  //   const createdPost = new this.postModel(data);
  //   return createdPost.save();
  // }

  async updateById(id: string, data: postDto) {
    const post = await this.postModel.findOne({ _id: id }).lean();
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
