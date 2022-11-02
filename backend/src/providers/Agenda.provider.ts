import { DataSource } from 'typeorm';
import { Agenda } from '../entities/Agenda.entity';

export const AgendaProvider = [
    {
        provide: 'AGENDA_REPOSITORY',
        useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(Agenda),
        inject: ['DATABASE_CONNECTION'],
    },
];
