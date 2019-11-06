import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {AuthModule} from '../../auth/auth.module';
import {Permission} from './permission.entity';
import {PermissionResolvers} from './permission.resolvers';

@Module({
    imports:    [TypeOrmModule.forFeature([Permission]), AuthModule],
    providers:  [PermissionResolvers],
})
export class PermissionModule {}
