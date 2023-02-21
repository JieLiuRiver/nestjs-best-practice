import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [AuthService, UserService]
})
export class AuthModule {}
