import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entities/User.entity';

@Injectable()
export class AuthService {
    readonly JWT_SECRET;
    constructor(private readonly jwtService: JwtService) {
        this.JWT_SECRET = process.env.JWT_SECRET;
    }
    async login(user: User): Promise<string> {
        const payload = { uuid: user.uuid, login: user.login };
        return this.jwtService.sign(payload, {
            expiresIn: '1h',
            secret: this.JWT_SECRET,
        });
    }

    async verify(token: string): Promise<any> {
        return this.jwtService.verify(token, {
            secret: this.JWT_SECRET,
        });
    }
}
