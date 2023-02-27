import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  Logger,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { get } from 'lodash';
// import { async } from 'rxjs';

import {
  responseError,
  responseSuccess,
} from '../../core/base/base.controller';
import { postDto } from './dtos/post.dto';
import { PostService } from './post.service';

@ApiTags('post')
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}
  private readonly logger = new Logger(PostController.name);

  @Post('Create')
  async create(@Body() data: postDto) {
    try {
      const result = await this.postService.createPost(data);
      return responseSuccess(result);
      //
    } catch (error) {
      console.log(error.message);
      this.logger.error(error.stack);
      return responseError(error.message || error);
    }
  }

  @ApiOperation({ summary: 'Get a post by id' })
  @Get(':id')
  async getById(@Param('id') id: string) {
    try {
      const result = await this.postService.getById(id);
      return responseSuccess(result);
    } catch (error) {
      console.log(error.message);
      this.logger.error(error.stack);
      return responseError(error.message || error);
    }
  }

  @ApiOperation({ summary: 'Update a post' })
  @Put(':id')
  async updateById(@Param('id') id: string, @Body() data: postDto) {
    try {
      const result = await this.postService.updateById(id, data);
      return responseSuccess(result);
    } catch (error) {
      console.log(error.message);
      this.logger.error(error.stack);
      return responseError(error.message || error);
    }
  }

  @ApiOperation({ summary: 'Delete a post' })
  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    try {
      const result = await this.postService.deleteById(id);
      return responseSuccess(result);
    } catch (error) {
      console.log(error.message);
      this.logger.error(error.stack);
      return responseError(error.message || error);
    }
  }
}
