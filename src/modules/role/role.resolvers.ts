import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import {Role} from './role.entity';
import {UseGuards} from '@nestjs/common';
import {GqlAuthGuard} from '../../auth/gqlauth.guard';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

// const pubSub = new PubSub();

@Resolver('Role')
@UseGuards(GqlAuthGuard)
export class RoleResolvers {

  constructor(
      @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) { }

  @Query()
  async getRoles() {
    return await this.roleRepository.find();
  }

  // @Subscription('roleCreated')
  // roleCreated() {
  //   return pubSub.asyncIterator('roleCreated');
  // }
}
