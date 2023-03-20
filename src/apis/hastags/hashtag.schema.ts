import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type HashTagDocument = HashTag & Document;

@Schema()
export class HashTag {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ default: 0 })
  count: number;
}

export const HashTagSchema = SchemaFactory.createForClass(HashTag);
