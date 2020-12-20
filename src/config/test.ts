export default () => ({
  server: {
    port: 3000,
  },
  database: {
    host: 'test_postgres',
    port: 5432,
    username: 'test_user',
    password: 'test_password',
    database: 'e2e_db',
    synchronize: true
  }
});