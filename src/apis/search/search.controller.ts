import { Controller, Get, Logger, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HashTag } from '../hastags/hashtag.schema';
import { HashTagService } from '../hastags/hashtag.service';
import { Post } from '../post/post.schema';
import { PostService } from '../post/post.service';
import { User } from '../user/user.schema';
import { UserService } from '../user/user.service';
import { SearchService } from './search.service';

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}
  //   private readonly logger = new Logger(PostController.name);

  @Get('/hashtags')
  async searchHashtags(@Query('q') query: string): Promise<HashTag[]> {
    return this.searchService.searchHashtags(query);
  }

  @Get('/posts')
  async searchPosts(@Query('q') query: string): Promise<Post[]> {
    return this.searchService.searchPosts(query);
  }

  @Get('/users')
  async searchUsers(@Query('q') query: string): Promise<User[]> {
    return this.searchService.searchUsers(query);
  }
}
