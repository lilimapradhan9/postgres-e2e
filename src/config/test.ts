export default () => ({
  server: {
    port: 3000,
  },
  database: {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'tod',
    password: 'tod',
    database: 'tod',
    synchronize: false,
    logging: console.log,
  },
});