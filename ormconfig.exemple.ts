module.exports = {
    type: ,
    host: process.env.DB_HOST,
    port: ,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    migrations: ['src/shared/typeorm/migrations/*.ts'],
    entities: ['src/modules/**/typeorm/entities/*.ts'],
    cli: {
        migrationsDir: './src/shared/typeorm/migrations',
    },
};
