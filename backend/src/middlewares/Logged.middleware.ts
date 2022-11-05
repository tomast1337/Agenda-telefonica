import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from 'src/services/Jwt.service';
import { Logger } from '@nestjs/common';

@Injectable()
export class LoggedMiddleware implements NestMiddleware {
    constructor(private readonly authService: AuthService) {}
    use(req: Request<any>, res: Response<any>, next: NextFunction) {
        // Token is sent in the request header
        const token = req.headers.authorization;
        if (token) {
            // If token is valid, the user is logged
            const user = this.authService.verify(token);
            if (user) {
                Logger.log(`Usuário ${user} está logado`);
                req.body.loggedUser = user;
                next();
            } else {
                Logger.log(`Usuário não logado`);
                res.status(401).json({ message: 'Token inválido' });
            }
        } else {
            res.status(401).json({ message: 'Usuário não autenticado' });
        }
    }
}
