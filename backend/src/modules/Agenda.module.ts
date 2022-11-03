import { Module } from '@nestjs/common';
import { ContatoProvider } from 'src/providers/Contato.provider';
import { DatabaseModule } from '../database.module';
import { AgendaProvider } from '../providers/Agenda.provider';
import { AgendaService } from '../services/Agenda.service';

@Module({
    imports: [DatabaseModule],
    providers: [...AgendaProvider, AgendaService, ...ContatoProvider],
    exports: [AgendaService],
})
export class AgendaModule {}
