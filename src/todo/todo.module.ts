import { Module } from '@nestjs/common';
import { TodoResolvers } from './todo.resolvers';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Todo} from './todo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  providers: [TodoResolvers],
})
export class TodoModule {}
