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

  @Mutation('updateUser')
  async update(@Args('updateUserInput') args: any): Promise<User> {
    const updatedUser = await this.userRepository.createQueryBuilder()
        .update(User)
        .set({...args})
        .where('id = :id', { id: args.id })
        .execute();

    // await pubSub.publish('userCreated', { updateCreated: updatedUser });
    return {...args};
  }

  @Mutation('removeUser')
  async remove(@Args('userId') userId: string | number): Promise<any> {
    return await this.userRepository.delete(userId);
  }

  @Subscription('userCreated')
  userCreated() {
    return pubSub.asyncIterator('userCreated');
  }

}
