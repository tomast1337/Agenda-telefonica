import { User } from 'src/entities/User.entity';
import { DataSource } from 'typeorm';

export const UserProvider = [
    {
        provide: 'USER_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
        inject: ['DATABASE_CONNECTION'],
    },
];
