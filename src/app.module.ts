import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoModule } from './photo/photo.module';
import * as ormconfig from './ormconfig';
import {GraphQLModule} from '@nestjs/graphql';
import {CatsModule} from './cats/cats.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot( ormconfig ),
    CatsModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      installSubscriptionHandlers: true,
    }),
    PhotoModule,
    TodoModule,
  ],
})
export class AppModule {}
