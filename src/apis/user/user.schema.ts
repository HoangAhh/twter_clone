import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop()
  example1: string;

  @Prop()
  example2: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
