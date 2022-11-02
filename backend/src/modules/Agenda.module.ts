import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database.module';
import { AgendaProvider } from '../providers/Agenda.provider';
import { AgendaService } from '../services/Agenda.service';

@Module({
    imports: [DatabaseModule],
    providers: [...AgendaProvider, AgendaService],
    exports: [AgendaService],
})
export class AgendaModule {}
