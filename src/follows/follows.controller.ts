import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { FollowsService } from './follows.service';

@Controller('follows')
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @Post()
  async followUser(@Body() body: { followerId: number, followedId: number}) {
    const { followerId, followedId } = body;
    return await this.followsService.followUser(followerId, followedId);
  }


  @Delete(':followerId/:followedId')
  async unfollowUser(@Param('followerId') followerId: number, @Param('followedId') followedId: number) {
    return await this.followsService.unfollowUser(followerId, followedId);
  }
}
