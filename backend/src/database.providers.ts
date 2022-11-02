import { DataSource } from 'typeorm';

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async (): Promise<DataSource> => {
            const dataSource = new DataSource({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: 'root',
                database: 'agenda',
                entities: [__dirname + '/../**/*.entity.js'],
                synchronize: true,
            });
            return dataSource.initialize();
        },
    },
];
