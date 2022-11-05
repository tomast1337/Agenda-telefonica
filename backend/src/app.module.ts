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
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './modules/User.module';
import { UserProvider } from './providers/User.provider';
import { AuthModule } from './modules/JWT.module';
import { UserController } from './controllers/User.controller';
@Module({
    imports: [
        ConfigModule.forRoot({
            //envFilePath: 'dev.env',
            envFilePath: `${process.env.NODE_ENV}.env`,
        }),
        DatabaseModule,
        ContatoModule,
        AgendaModule,
        UserModule,
        FileUploadModule,
        AuthModule,
        JwtModule.register({ secret: process.env.JWT_SECRET }),
    ],
    controllers: [ContatoController, AgendaController, UserController],
    providers: [
        ...ContatoProvider,
        ...AgendaProvider,
        ...UserProvider,
        ContatoService,
        AgendaService,
        FileUploadService,
        AuthModule,
    ],
})
export class AppModule {}
