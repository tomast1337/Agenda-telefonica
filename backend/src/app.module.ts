import { Module } from '@nestjs/common';
import { AgendaController } from './controllers/Agenda.controller';
import { ContatoController } from './controllers/Contato.controller';
import { AgendaModule } from './modules/Agenda.module';
import { ContatoModule } from './modules/Contato.module';
import { DatabaseModule } from './database.module';
import { AgendaProvider } from './providers/Agenda.provider';
import { ContatoProvider } from './providers/Contato.provider';
import { AgendaService } from './services/Agenda.service';
import { ContatoService } from './services/Contato.service';

@Module({
    imports: [DatabaseModule, ContatoModule, AgendaModule],
    controllers: [ContatoController, AgendaController],
    providers: [
        ...ContatoProvider,
        ...AgendaProvider,
        ContatoService,
        AgendaService,
    ],
})
export class AppModule {}
