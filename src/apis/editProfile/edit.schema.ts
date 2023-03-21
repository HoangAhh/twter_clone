import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type EditProfileDocument = EditProfile & Document;

@Schema({ timestamps: true, versionKey: false })
export class EditProfile {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  bio: string;

  @Prop({ type: String })
  location: string;

  @Prop({ type: String })
  website: string;

  @Prop({ type: Date, required: true })
  birthday: Date;
}
export const EditProfileSchema = SchemaFactory.createForClass(EditProfile);
