import { Controller, Req, Res, Get, Post, Put, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { UserService } from '../services/User.service';
import { UserInfo, User } from '../entities/User.entity';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../services/Jwt.service';
@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ) {}
    @Post('register')
    async register(
        @Req() req: Request<User>,
        @Res() res: Response<UserInfo | string>,
    ): Promise<Response<UserInfo | string>> {
        const user = await this.userService.findByLogin(req.body.login);
        if (!user) {
            const user: User = new User();
            user.login = req.body.login;
            user.senha = await bcrypt.hash(req.body.senha, 10);
            const newUser = await this.userService.create(user);
            const userInfo: UserInfo = {
                uuid: newUser.uuid,
                login: newUser.login,
                agendaIds: [],
            };
            Logger.log(`Registrando usuário ${user.login}`);
            return res.send(userInfo);
        } else {
            return res.send('Nome de usuário já utilizado');
        }
    }

    @Get('login')
    async login(
        @Req() req: Request<{ user: string; senha: string }>,
        @Res() res: Response<{ token?: string; message: string }>,
    ): Promise<Response<{ token?: string; message: string }>> {
        const user = await this.userService.findByLogin(req.body.user);
        if (user) {
            const isPasswordMatching = await bcrypt.compareSync(
                req.body.senha,
                user.senha,
            );
            if (isPasswordMatching) {
                const token = await this.authService.login(user);
                Logger.log(`Logando usuário ${user.login}`);
                return res.json({
                    token,
                    message: 'Login realizado com sucesso!',
                });
            } else {
                return res.status(401).json({ message: 'Senha incorreta' });
            }
        } else {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }
    }
    @Put('changePassword')
    async changePassword(
        @Req() req: Request<{ user: string; senha: string }>,
        @Res() res: Response<{ message: string }>,
    ): Promise<Response<{ message: string }>> {
        const user = await this.userService.findByLogin(req.body.user);
        if (user) {
            const isPasswordMatching = await bcrypt.compareSync(
                req.body.senha,
                user.senha,
            );
            if (isPasswordMatching) {
                user.senha = await bcrypt.hash(req.body.senha, 10);
                await this.userService.update(user);
                Logger.log(`Alterando senha do usuário ${user.login}`);
                return res.json({ message: 'Senha alterada com sucesso!' });
            } else {
                return res.status(401).json({ message: 'Senha incorreta' });
            }
        } else {
            return res.status(401).json({ message: 'Usuário não encontrado' });
        }
    }
}
