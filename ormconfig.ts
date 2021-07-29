export default {
    type: 'postgres',
    host: process.env.APP_HOST,
    url: process.env.APP_URL,
    port: 5432,
    username: process.env.APP_DATABASE,
    password: process.env.APP_PASSWOR,
    database: process.env.APP_DATABASE,
    keepConnectionAlive: true,
    logging: false,
    synchronize: true,
    migrations: ['src/shared/typeorm/migrations/*.ts'],
    entities: ['src/modules/**/typeorm/entities/*.ts'],
    cli: {
        migrationsDir: './src/shared/typeorm/migrations',
        entitiesDir: 'src/modules/**/typeorm/entities',
    },
};
