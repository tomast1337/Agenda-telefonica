import { Module } from '@nestjs/common';
import { AgendaProvider } from 'src/providers/Agenda.provider';
import { UserProvider } from 'src/providers/User.provider';
import { UserService } from 'src/services/User.service';
import { DatabaseModule } from '../database.module';

@Module({
    imports: [DatabaseModule],
    providers: [...UserProvider, UserService, ...AgendaProvider],
    exports: [UserService],
})
export class UserModule {}
