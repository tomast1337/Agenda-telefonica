import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/services/Jwt.service';

@Module({
    imports: [],
    controllers: [],
    providers: [AuthService, JwtService],
    exports: [AuthService],
})
export class AuthModule {}
