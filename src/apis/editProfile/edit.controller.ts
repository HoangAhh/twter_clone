import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CmsAuth } from 'src/core/auth/decorators/auth/cms-auth.decorators';
import { responseError, responseSuccess } from 'src/core/base/base.controller';
import { Pagination } from 'src/core/decorators/pagination/pagination.decorator';
import { PaginationOptions } from 'src/core/decorators/pagination/pagination.model';
import { EditDto } from './dto/edit.dto';
import { EditFilterDto } from './dto/edit.filter.dto';
import { EditProfileService } from './edit.service';

@ApiTags('Edit Profile')
@Controller('editprofile')
export class EditProfileController {
  constructor(private readonly editProfileService: EditProfileService) {}
  private readonly logger = new Logger(EditProfileController.name);

  @ApiOperation({ summary: 'Get all Edit Profile' })
  @Get()
  async getAll() {}

  @Post('Create')
  @CmsAuth()
  async create(@Body() data: EditDto) {
    try {
      const result = await this.editProfileService.create(data);
      return responseSuccess(result);
      //
    } catch (error) {
      console.log(error.message);
      this.logger.error(error.stack);
      return responseError(error.message || error);
    }
  }
  @ApiOperation({ summary: 'Get a editProfile by id' })
  @Get(':id')
  @CmsAuth()
  async getById(@Param('id') id: string) {
    try {
      const result = await this.editProfileService.getById(id);
      return responseSuccess(result);
    } catch (error) {
      console.log(error.message);
      this.logger.error(error.stack);
      return responseError(error.message || error);
    }
  }

  @ApiOperation({ summary: 'Update a editProfile' })
  @Put(':id')
  @CmsAuth()
  async UpdateById(@Param('id') id: string, @Body() data: EditDto) {
    try {
      const result = await this.editProfileService.updateById(id, data);
      return responseSuccess(result);
    } catch (error) {
      console.log(error.message);
      this.logger.error(error.stack);
      return responseError(error.message || error);
    }
  }
  @ApiOperation({ summary: 'Delete a editProfile' })
  @Delete(':id')
  @CmsAuth()
  async deleteById(@Param('id') id: string) {
    try {
      const result = await this.editProfileService.deleteById(id);
      return responseSuccess(result);
    } catch (error) {
      console.log(error.message);
      this.logger.error(error.stack);
      return responseError(error.message || error);
    }
  }
}
