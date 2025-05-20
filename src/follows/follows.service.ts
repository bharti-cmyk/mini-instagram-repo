import { BadRequestException, Injectable } from '@nestjs/common';
import { Follows } from './model/follow.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class FollowsService {
  // This service will handle the business logic related to follows
  // For example, follow a user, unfollow a user, get followers, etc.
 constructor(
  @InjectModel(Follows)
    private readonly followsModel: typeof Follows,
  ) {}

  async followUser(followerId: number, followedId: number): Promise<Follows | null> {
    if(followerId === followedId) {
      throw new Error('You cannot follow yourself');
    }
    
    const existingFollow = await this.followsModel.findOne({
      where: {
        followerId,
        followedId,
      },
    });
    if (existingFollow) {
      throw new BadRequestException('You are already following this user');
    }

    const follow = await this.followsModel.create({
      followerId,
      followedId,
    });
    return follow;
  }

  async unfollowUser(followerId: number, followedId: number) {
    const follow = await this.followsModel.findOne({
      where: {
        followerId,
        followedId,
      },
    });
    if (!follow) {
      throw new BadRequestException('You are not following this user');
    }

    await follow.destroy();
    return {message: 'Unfollowed successfully'};
  }

  // getFollowers(userId: number) {
  //   return this.follows.filter((follow) => follow.followedId === userId);
  // }
}
