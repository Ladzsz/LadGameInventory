const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL //PRODUCTION VERSION for future reference use single url strings
});

module.exports = pool;
