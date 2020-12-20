export default () => ({
  server: {
    port: 3000,
  },
  database: {
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'e2e_db',
    synchronize: true
  }
});