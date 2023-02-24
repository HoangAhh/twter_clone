import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { time } from 'console';
import { Document } from 'mongoose';
// import { type } from 'os';

export type PostDocument = Post & Document;
@Schema({ timestamps: true, versionKey: false })
export class Post {
  @Prop({ type: String })
  status: string;

  @Prop({ type: String })
  content: string;

  @Prop({ type: String })
  comment: string;

  @Prop({ type: String })
  description: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
