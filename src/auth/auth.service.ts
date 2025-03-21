import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { TokenPayload } from '../constants/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  async signUp(user: CreateUserDto) {
    user.password = await bcrypt.hash(user.password, 10);
    return await this.usersService.create(user);
  }

  async signIn(email: string, password: string) {
    const user = await this.usersService.findOne({ email: email }, true);
    if (!user) {
      this.logger.error('Unauthorized');
      throw new UnauthorizedException();
    }

    const isAuthenticated = await bcrypt.compare(password, user.password);
    if (!isAuthenticated) {
      this.logger.error('Unauthorized');
      throw new UnauthorizedException();
    }

    const tokenPayload: TokenPayload = {
      sub: user.id,
      isMaster: user.isMaster,
      companyId: user.companyId,
    };
    return {
      accessToken: await this.jwtService.signAsync(tokenPayload),
    };
  }
}
