import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(user: CreateUserDto, response: Response) {
    user.password = await bcrypt.hash(user.password, 10);
    return await this.usersService.create(user);
  }

  async signIn(email: string, password: string, response: Response) {
    const user = await this.usersService.findOne({ email: email }, true);
    if (!user) {
      throw new UnauthorizedException();
    }

    const isAuthenticated = await bcrypt.compare(password, user.password);
    if (!isAuthenticated) {
      throw new UnauthorizedException();
    }

    const tokenPayload: TokenPayload = {
      sub: user.id,
      isMaster: user.isMaster,
    };
    const accessToken = await this.jwtService.signAsync(tokenPayload);

    response.cookie('Authentication', accessToken, {
      httpOnly: true,
    });

    return user;
  }
}
