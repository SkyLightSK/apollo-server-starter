import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import {UseGuards} from '@nestjs/common';
import {GqlAuthGuard} from '../../auth/gqlauth.guard';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Permission} from './permission.entity';

// const pubSub = new PubSub();

@Resolver('Permission')
@UseGuards(GqlAuthGuard)
export class PermissionResolvers {

  constructor(
      @InjectRepository(Permission) private readonly permissionRepository: Repository<Permission>,
  ) { }

  @Query()
  async getPermissions() {
    return await this.permissionRepository.find();
  }

  // @Subscription('permissionCreated')
  // permissionCreated() {
  //   return pubSub.asyncIterator('permissionCreated');
  // }
}
