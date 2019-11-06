import {Request, UseGuards} from '@nestjs/common';
import {Args, Mutation, Query, Resolver, Subscription} from '@nestjs/graphql';
import {GqlAuthGuard} from '../../auth/gqlauth.guard';
import {User} from './user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {PubSub} from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver('User')
@UseGuards(GqlAuthGuard)
export class UserResolvers {

  constructor(
      @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) { }

  @Query()
  async getUsers() {
    return await this.userRepository.find();
  }

  @Mutation('createUser')
  async create(@Args('createUserInput') args: any): Promise<User> {
    const createdUser = await this.userRepository.save({...args});
    await pubSub.publish('userCreated', { userCreated: createdUser });
    return createdUser;
  }

  @Subscription('userCreated')
  userCreated() {
    return pubSub.asyncIterator('userCreated');
  }

}
