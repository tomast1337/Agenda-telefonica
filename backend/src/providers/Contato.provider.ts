import { DataSource } from 'typeorm';
import { Contato } from '../entities/Contato.entity';

export const ContatoProvider = [
    {
        provide: 'CONTATO_REPOSITORY',
        useFactory: (dataSource: DataSource) =>
            dataSource.getRepository(Contato),
        inject: ['DATABASE_CONNECTION'],
    },
];
