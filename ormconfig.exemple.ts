module.exports = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    migrations: ['dist/shared/typeorm/migrations/*.js'],
    entities: ['dist/modules/**/typeorm/entities/*.js'],
    cli: {
        migrationsDir: './dist/shared/typeorm/migrations',
    },
};
