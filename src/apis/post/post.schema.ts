import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { time } from 'console';
import { Document } from 'mongoose';
import { HashTag } from '../hastags/hashtag.schema';
// import { type } from 'os';

export type PostDocument = Post & Document;
@Schema({ timestamps: true, versionKey: false })
export class Post {
  @Prop({ type: String, required: true })
  topic: string;

  @Prop({ type: String, required: true })
  userName: string;

  @Prop({ type: String })
  image: string;

  @Prop({ type: Number, required: true })
  userId: Number;

  @Prop({ type: [{ type: String, ref: 'Hashtag' }] })
  hashtags: HashTag[];

  @Prop({ enum: ['draft', 'published'], default: 'draft' })
  status: string;

  @Prop({ type: String })
  comment: string;

  @Prop({ type: Number })
  tweet: number;

  @Prop({ type: String })
  describe: string;

  @Prop({ type: Number })
  like: number;

  @Prop({ type: Number })
  view: number;
}

export const PostSchema = SchemaFactory.createForClass(Post);
