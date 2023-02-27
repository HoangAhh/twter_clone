import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { time } from 'console';
import { Document } from 'mongoose';
// import { type } from 'os';

export type PostDocument = Post & Document;
@Schema({ timestamps: true, versionKey: false })
export class Post {
  @Prop({ type: String, required: true })
  contents: string;

  @Prop({ type: String, required: true })
  comment: string;

  @Prop({ type: Number })
  quantityLikes: number;
}

export const PostSchema = SchemaFactory.createForClass(Post);
