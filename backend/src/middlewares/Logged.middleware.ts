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
            try {
                this.authService
                    .verify(token)
                    .then((user) => {
                        req.body.loggedUser = user;
                        next();
                    })
                    .catch((err) => {
                        Logger.error(err);
                        res.status(401).json({ message: 'Token inválido' });
                    });
            } catch (error) {
                res.status(401).json({ message: 'Token inválido' });
            }
        } else {
            res.status(401).json({ message: 'Usuário não autenticado' });
        }
    }
}
