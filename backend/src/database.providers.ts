import { DataSource } from 'typeorm';

export const databaseProviders = [
    {
        provide: 'DATABASE_CONNECTION',
        useFactory: async (): Promise<DataSource> => {
            const dataSource = new DataSource({
                type: 'mysql',
                host: process.env.HOST,
                port: parseInt(process.env.PORT),
                username: process.env.DB_USERNAME,
                password: process.env.DB_PASSWORD,
                database: process.env.DATABASE,
                entities: [__dirname + '/../**/*.entity.js'],
                synchronize: true,
            });
            return dataSource.initialize();
        },
    },
];
