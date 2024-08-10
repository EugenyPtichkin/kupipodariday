import { Injectable } from '@nestjs/common';
import { User } from './../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { HashService } from './../hash/hash.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private hashService: HashService,
  ) {}

  auth(user: User) {
    const payload = { sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async validatePassword(username: string, password: string) {
    const user = await this.usersService.findByUserName(username);

    //if (user && user.password === password) {
    if (user && this.hashService.compare(password, user.password)) {
      // eslint-disable-next-line
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
