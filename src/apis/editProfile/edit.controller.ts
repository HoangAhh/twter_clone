import { Controller, Logger } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EditProfileService } from './edit.service';

@ApiTags('Edit Profile')
@Controller('editprofile')
export class EditProfileController {
  constructor(private readonly editProfileService: EditProfileService) {}
  private readonly logger = new Logger(EditProfileController.name);
}
