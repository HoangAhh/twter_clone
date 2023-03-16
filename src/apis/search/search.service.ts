import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HashTag, HashTagDocument } from '../hastags/hashtag.schema';
import { Post, PostDocument } from '../post/post.schema';
import { User, UserDocument } from '../user/user.schema';

@Injectable()
export class SearchService {
  constructor(
    @InjectModel(HashTag.name)
    private readonly hashtagModel: Model<HashTagDocument>,
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
  async searchHashtags(query: string): Promise<HashTag[]> {
    return this.hashtagModel
      .find({ hashtag: new RegExp(`^${query}`, 'i') })
      .exec();
  }

  async searchPosts(query: string): Promise<Post[]> {
    return this.postModel
      .find({
        $regex: [
          { topic: new RegExp(`^${query}`, 'i') },
          { status: new RegExp(`^${query}`, 'i') },
        ],
      })
      .populate('hashtags')
      .populate('status')
      .exec();
  }

  async searchUsers(query: string): Promise<User[]> {
    return this.userModel.find({ name: new RegExp(`^${query}`, 'i') }).exec();
  }
}
