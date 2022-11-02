import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database.module';
import { ContatoProvider } from '../providers/Contato.provider';
import { ContatoService } from '../services/Contato.service';

@Module({
    imports: [DatabaseModule],
    providers: [...ContatoProvider, ContatoService],
    exports: [ContatoService],
})
export class ContatoModule {}
