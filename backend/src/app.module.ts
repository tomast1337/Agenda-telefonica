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
import { ConfigModule } from '@nestjs/config';
import { FileUploadModule } from './modules/FileUpload.module';
import { FileUploadService } from './services/FileUpload.service';
@Module({
    imports: [
        ConfigModule.forRoot({
            //envFilePath: 'dev.env',
            envFilePath: `${process.env.NODE_ENV}.env`,
        }),
        DatabaseModule,
        ContatoModule,
        AgendaModule,
        FileUploadModule,
    ],
    controllers: [ContatoController, AgendaController],
    providers: [
        ...ContatoProvider,
        ...AgendaProvider,
        ContatoService,
        AgendaService,
        FileUploadService,
    ],
})
export class AppModule {}
