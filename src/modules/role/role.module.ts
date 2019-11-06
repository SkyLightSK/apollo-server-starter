import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthModule} from '../../auth/auth.module';
import {Role} from './role.entity';
import {RoleResolvers} from './role.resolvers';

@Module({
    imports:    [TypeOrmModule.forFeature([Role]), AuthModule],
    providers:  [RoleResolvers],
})
export class RoleModule {}
