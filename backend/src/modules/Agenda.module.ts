import { Module, NestModule } from '@nestjs/common';
import { LoggedMiddleware } from '../middlewares/Logged.middleware';
import { ContatoProvider } from '../providers/Contato.provider';
import { DatabaseModule } from '../database.module';
import { AgendaProvider } from '../providers/Agenda.provider';
import { AgendaService } from '../services/Agenda.service';
import { AuthModule } from './JWT.module';

@Module({
    imports: [DatabaseModule, AuthModule],
    providers: [...AgendaProvider, AgendaService, ...ContatoProvider],
    exports: [AgendaService],
})
export class AgendaModule implements NestModule {
    configure(consumer) {
        consumer.apply(LoggedMiddleware).forRoutes('agenda');
    }
}
