import { Module, NestModule } from '@nestjs/common';
import { LoggedMiddleware } from '../middlewares/Logged.middleware';
import { DatabaseModule } from '../database.module';
import { ContatoProvider } from '../providers/Contato.provider';
import { ContatoService } from '../services/Contato.service';
import { AuthModule } from './JWT.module';

@Module({
    imports: [DatabaseModule, AuthModule],
    providers: [...ContatoProvider, ContatoService],
    exports: [ContatoService],
})
export class ContatoModule implements NestModule {
    configure(consumer) {
        consumer.apply(LoggedMiddleware).forRoutes('contato');
    }
}
